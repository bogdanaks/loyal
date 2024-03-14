import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Big from "big.js"
import IMask from "imask"
import { useMemo } from "react"
import { Controller, useForm } from "react-hook-form"
import { Alert, Text, View } from "react-native"
import * as z from "zod"

import { updateClientBonusMinus } from "entities/shop/api"

import { theme } from "shared/config/theme"
import { showError } from "shared/libs/toast-utils"
import { Button } from "shared/ui/button"
import { InputImaskField } from "shared/ui/form-fields"

import { useScanStore } from "widgets/scan/model/store"

const sumMask = IMask.createMask({
  mask: Number,
  normalizeZeros: true,
  autofix: false,
})

const calculateMaxPoints = (
  point_amount: number,
  check_amount: number,
  max_off_check_percent: number
) => {
  const maxValueByPoint = Math.min(point_amount, check_amount)
  const maxValueFromCheck = Big(check_amount).mul(Big(max_off_check_percent).div(100))
  return Math.round(Math.min(Math.max(maxValueByPoint, 0), maxValueFromCheck.toNumber()))
}

const formSchema = z
  .object({
    check_amount: z
      .number({ required_error: "Обязательное поле." })
      .min(1, { message: "Минимум 1" }),
    point_amount: z
      .number({ required_error: "Обязательное поле." })
      .min(1, { message: "Минимум 1" }),
  })
  .refine((data) => (data.point_amount ? Big(data.point_amount).lte(data.check_amount) : true), {
    message: "Количество баллов не может превышать сумму чека.",
    path: ["point_amount"],
  })

type FormFields = z.infer<typeof formSchema>

interface Props {
  userAsClient: UserAsClient
  shop: Shop
}

export const ScanPaymentMinus = ({ shop, userAsClient }: Props) => {
  const queryClient = useQueryClient()

  const setSuccessPaymentData = useScanStore((state) => state.setSuccessPaymentData)
  const balance = useScanStore((state) => state.balance)
  const setBalance = useScanStore((state) => state.setBalance)
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })
  const watchCheckAmount = form.watch("check_amount")
  const watchPointAmount = form.watch("point_amount")

  const { mutate } = useMutation({
    mutationFn: updateClientBonusMinus,
    retry: false,
  })

  const calculatePoints = useMemo(() => {
    const loyalRegBonus = shop?.loyal_program?.reg_bonus ?? 0
    const regBonus = !userAsClient?.client ? loyalRegBonus : 0
    if (!watchCheckAmount) {
      return regBonus
    }

    const loyalPercentBonus = shop?.loyal_program?.percent_bonus ?? 0

    return Math.round(regBonus + (loyalPercentBonus / 100) * watchCheckAmount)
  }, [watchCheckAmount, shop, userAsClient])

  const showConfirmPayment = () => {
    const isOk = checkMaxOfPoints()
    if (!isOk) {
      return
    }

    Alert.alert(
      "Подтвердите действие",
      `Сумма чека: ${watchCheckAmount} руб.\nКлиенту начислится: ${calculatePoints} балл\nУ клиента спишется: ${watchPointAmount} балл`,
      [
        {
          text: "Отменить",
          style: "cancel",
        },
        {
          text: "Подтвердить",
          onPress: () => form.handleSubmit(onSubmit)(),
        },
      ]
    )
  }

  const checkMaxOfPoints = () => {
    const max = calculateMaxPoints(
      watchPointAmount ?? 0,
      watchCheckAmount ?? 0,
      shop.loyal_program.max_off_check_percent
    )

    if (Big(watchPointAmount ?? 0).gt(max)) {
      form.setError("point_amount", {
        message: `Максимально возможное использование баллов превышает ${shop.loyal_program.max_off_check_percent}% от суммы чека.`,
        type: "max",
      })
      return false
    }
    return true
  }

  const handleSuccessPayment = async (data: FormFields) => {
    await queryClient.invalidateQueries({
      queryKey: ["client", userAsClient.client?.id.toString()],
      refetchType: "all",
    })
    await queryClient.invalidateQueries({
      queryKey: ["client-purchases", userAsClient.client?.id.toString()],
      refetchType: "all",
    })
    await queryClient.invalidateQueries({
      queryKey: ["clients"],
      refetchType: "all",
    })

    setSuccessPaymentData({
      is_new: userAsClient?.client === null,
      is_accrual: true,
      bonus_points: calculatePoints,
      user_id: userAsClient.id,
      client_id: userAsClient.client?.id ?? 0,
      check_amount: data.check_amount,
      point_amount: data.point_amount,
    })

    const newBalance = Big(balance)
      .minus(data.point_amount ?? 0)
      .plus(calculatePoints)
      .toNumber()
    setBalance(newBalance)
  }

  const handleSetMax = () => {
    if (!watchCheckAmount) {
      form.setError("point_amount", { message: "Введите сумму чека.", type: "max" })
      return
    }

    const calcMax = calculateMaxPoints(
      balance,
      watchCheckAmount,
      shop.loyal_program.max_off_check_percent
    )

    form.setValue("point_amount", calcMax)
  }

  const onSubmit = (data: FormFields) => {
    if (!userAsClient.client) {
      return
    }

    mutate(
      {
        check_amount: data.check_amount,
        point_amount: data.point_amount,
        user_id: userAsClient.id,
      },
      {
        onSuccess: () => {
          handleSuccessPayment(data)
        },
        onError: () => {
          showError()
        },
      }
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 16 }}>
        <Controller
          control={form.control}
          name="check_amount"
          render={({ field, fieldState: { error } }) => (
            <InputImaskField
              opts={sumMask}
              label="Сумма чека"
              placeholder="100"
              value={field.value?.toString() ?? undefined}
              keyboardType="number-pad"
              onChangeText={(_, unmasked) => {
                form.clearErrors("point_amount")
                field.onChange(unmasked.length ? Number(unmasked) : undefined)
              }}
              error={error?.message}
            />
          )}
        />
      </View>
      <View style={{ marginTop: 16 }}>
        <Controller
          control={form.control}
          name="point_amount"
          render={({ field, fieldState: { error } }) => (
            <InputImaskField
              opts={sumMask}
              label="Количество баллов"
              placeholder="100"
              value={watchPointAmount?.toString() ?? undefined}
              keyboardType="number-pad"
              onChangeText={(_, um) => {
                field.onChange(um.length ? Number(um) : undefined)
              }}
              error={error?.message}
              postfix={
                <Button
                  style={{ width: 64, height: 34, marginRight: 4, padding: 0 }}
                  onPress={handleSetMax}
                >
                  MAX
                </Button>
              }
            />
          )}
        />
      </View>
      <View style={{ marginTop: 4 }}>
        <Text style={{ color: theme.mutedForeground }}>
          Макс. возможное: {shop.loyal_program.max_off_check_percent}% от суммы чека
        </Text>
      </View>
      <Button
        onPress={showConfirmPayment}
        style={{
          marginTop: "auto",
          backgroundColor: theme.destructive,
        }}
      >
        Списать
      </Button>
    </View>
  )
}
