import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { Controller, useForm } from "react-hook-form"
import { Alert, KeyboardAvoidingView, Platform, Text, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"
import * as z from "zod"

import { updateClientBonusPlus } from "entities/shop/api"

import { theme } from "shared/config/theme"
import { showError } from "shared/libs/toast-utils"
import { Button } from "shared/ui/button"
import { InputImaskField } from "shared/ui/form-fields"

import { useScanStore } from "widgets/scan/model/store"

import { ScanPaymentResult } from "./scan-payment-result"

interface Props {
  shop: Shop
  userAsClient: UserAsClient
}
const formSchema = z.object({
  check_amount: z.number({ required_error: "Обязательное поле." }).min(1, { message: "Минимум 1" }),
})
type FormFields = z.infer<typeof formSchema>

export const ScanPaymentDiscount = ({ shop, userAsClient }: Props) => {
  const queryClient = useQueryClient()
  const successPaymentData = useScanStore((state) => state.successPaymentData)
  const setSuccessPaymentData = useScanStore((state) => state.setSuccessPaymentData)

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })
  const watchCheckAmount = form.watch("check_amount")

  const { mutate } = useMutation({
    mutationFn: updateClientBonusPlus,
    retry: false,
  })

  const calculatePoints = useMemo(() => {
    const regBonus = !userAsClient?.client ? shop.loyal_program.reg_bonus : 0
    if (!watchCheckAmount) {
      return regBonus
    }

    return Math.round(regBonus + (shop.loyal_program.percent_bonus / 100) * watchCheckAmount)
  }, [watchCheckAmount, shop, userAsClient])

  const showConfirmPayment = () => {
    Alert.alert(
      "Подтвердите действие",
      `Сумма чека: ${watchCheckAmount} руб.\nКлиенту скидка: ${calculatePoints} руб.`,
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
      point_amount: calculatePoints,
    })
  }

  const onSubmit = (data: FormFields) => {
    mutate(
      {
        check_amount: data.check_amount,
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

  if (successPaymentData) {
    return <ScanPaymentResult successData={successPaymentData} />
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <Controller
        control={form.control}
        name="check_amount"
        render={({ field, fieldState: { error } }) => (
          <InputImaskField
            label="Сумма чека"
            placeholder="100"
            value={field.value?.toString() ?? undefined}
            keyboardType="number-pad"
            onChangeText={(_, um) => {
              field.onChange(um.length ? Number(um) : undefined)
            }}
            error={error?.message}
            opts={{
              mask: Number,
              normalizeZeros: true,
              autofix: true,
            }}
          />
        )}
      />
      <View style={{ marginTop: 16 }}>
        <Text>
          Итого: <Text style={{ fontWeight: "500", fontSize: 24 }}>{calculatePoints}</Text>р. скидка
        </Text>
        <Text style={{ color: theme.mutedForeground }}>1% от чека</Text>
      </View>
      <Button
        onPress={showConfirmPayment}
        style={{
          marginTop: "auto",
          backgroundColor: theme.primary,
        }}
      >
        Расчитать
      </Button>
    </KeyboardAwareScrollView>
  )
}
