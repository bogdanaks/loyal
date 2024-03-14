import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useMemo } from "react"
import { Controller, useForm } from "react-hook-form"
import { Text, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"
import * as z from "zod"

import { getLoyalTypes, getMyLoyalProgram, updateLoyal } from "entities/loyal/api"

import { numberMask } from "shared/config/masks"
import { theme } from "shared/config/theme"
import { showError, showSuccess } from "shared/libs/toast-utils"
import { Button } from "shared/ui/button"
import { InputImaskField } from "shared/ui/form-fields"
import { Segment } from "shared/ui/segment"

const formSchema = z.object({
  type_id: z.number(),
  percent_bonus: z.string(),
  max_off_check_percent: z.string().optional(),
  reg_bonus: z.string(),
})
type FormFields = z.infer<typeof formSchema>

export const EditLoyal = () => {
  const queryClient = useQueryClient()
  const { data: loyalTypes, isLoading: isLoadingLoyalTypes } = useQuery({
    queryKey: ["loyal-types"],
    queryFn: getLoyalTypes,
  })
  const { data: loyalProgram, isLoading: isLoadingLoyalProgram } = useQuery({
    queryKey: ["loyal-program"],
    queryFn: getMyLoyalProgram,
  })
  const { mutate, isPending } = useMutation({
    mutationFn: updateLoyal,
  })

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })
  const watchType = form.watch("type_id")

  useEffect(() => {
    if (loyalProgram && loyalProgram.data) {
      form.reset({
        type_id: loyalProgram.data.loyal_type_id,
        percent_bonus: loyalProgram.data.percent_bonus.toString(),
        reg_bonus: loyalProgram.data.reg_bonus.toString(),
        max_off_check_percent: loyalProgram.data.max_off_check_percent.toString(),
      })
    }
  }, [loyalProgram])

  const onSubmit = (data: FormFields) => {
    mutate(
      {
        ...data,
        percent_bonus: Number(data.percent_bonus),
        max_off_check_percent: data.max_off_check_percent
          ? Number(data.max_off_check_percent)
          : undefined,
        reg_bonus: Number(data.reg_bonus),
      },
      {
        onSuccess: () => {
          showSuccess()
          queryClient.invalidateQueries({ queryKey: ["my-shop"] })
        },
        onError: () => {
          showError()
        },
      }
    )
  }

  const activeType = useMemo(() => {
    if (!loyalTypes) {
      return undefined
    }

    return loyalTypes.data.find((type) => type.id === watchType)
  }, [loyalTypes, watchType])

  if (isLoadingLoyalTypes || isLoadingLoyalProgram) {
    return null
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
        flexGrow: 1,
      }}
    >
      <Controller
        control={form.control}
        name="type_id"
        render={({ field }) => (
          <View>
            <Text style={{ fontSize: 14, color: theme.mutedForeground, marginBottom: 4 }}>
              Тип программы
            </Text>
            <Segment value={field.value?.toString()} onChange={(v) => field.onChange(Number(v))}>
              {loyalTypes?.data.map((loyalType) => (
                <Segment.Item key={loyalType.id} value={loyalType.id.toString()}>
                  {loyalType.title}
                </Segment.Item>
              ))}
            </Segment>
            <View style={{ marginTop: 4 }}>
              <Text style={{ fontSize: 12, color: theme.mutedForeground }}>
                Бонусная - баллы за покупки, обмениваются в счёт покупки
              </Text>
              <Text style={{ fontSize: 12, color: theme.mutedForeground }}>
                Дисконтная - постоянный процент скидки
              </Text>
            </View>
          </View>
        )}
      />
      <Controller
        control={form.control}
        name="percent_bonus"
        render={({ field, fieldState: { error } }) => (
          <InputImaskField
            opts={numberMask}
            label="Процент скидки/баллов от суммы чека"
            value={field.value}
            keyboardType="number-pad"
            onChangeText={(_, um) => field.onChange(um)}
            error={error?.message}
          />
        )}
      />
      <Controller
        control={form.control}
        name="max_off_check_percent"
        disabled={activeType?.title !== "Бонусная"}
        render={({ field, fieldState: { error } }) => (
          <InputImaskField
            opts={numberMask}
            label="Максимальный процент возможного использования баллов от суммы чека"
            value={activeType?.title !== "Бонусная" ? "0" : field.value}
            keyboardType="number-pad"
            onChangeText={(_, um) => field.onChange(um)}
            error={error?.message}
            disabled={activeType?.title !== "Бонусная"}
          />
        )}
      />
      <Controller
        control={form.control}
        name="reg_bonus"
        render={({ field, fieldState: { error } }) => (
          <InputImaskField
            opts={numberMask}
            label="Единоразовое начисление баллов при регистрации"
            value={field.value}
            keyboardType="number-pad"
            onChangeText={(_, um) => field.onChange(um)}
            error={error?.message}
          />
        )}
      />
      <Button
        onPress={() => form.handleSubmit(onSubmit)()}
        disabled={isPending}
        style={{ marginTop: "auto" }}
      >
        Сохранить
      </Button>
    </KeyboardAwareScrollView>
  )
}
