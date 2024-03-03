import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import IMask from "imask"
import { Controller, useForm } from "react-hook-form"
import { KeyboardAvoidingView, Platform, Text } from "react-native"
import * as z from "zod"

import { getLoginCode } from "entities/auth/api"

import { useMyTheme } from "shared/hooks/use-my-theme"
import { Button, InputField } from "shared/ui"

interface FormState {
  phone: string
}

const phoneMask = IMask.createMask({
  mask: "+7 (000) 000-00-00",
})

const formSchema = z.object({
  phone: z.string({ required_error: "Обязательное поле." }).min(10, { message: "Неверный формат" }),
})

interface Props {
  onSuccess: (phone: string) => void
}

export const LoginFormGetCode = ({ onSuccess }: Props) => {
  const { colors } = useMyTheme()
  const form = useForm<FormState>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
    },
  })
  const watchPhone = form.watch("phone")
  const { mutate, isPending } = useMutation({
    mutationFn: getLoginCode,
  })

  const onSubmit = (data: FormState) => {
    mutate(data.phone, {
      onError: () => {},
      onSuccess: () => {
        form.setValue("phone", "")
        phoneMask.value = ""
        onSuccess(data.phone)
      },
    })
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 16 }}
    >
      <Text style={{ fontSize: 40, fontWeight: "600" }}>Вход</Text>
      <Text style={{ textAlign: "center", marginTop: 16, color: colors.mutedForeground }}>
        Введите номер телефона для получения кода авторизации
      </Text>
      <Controller
        control={form.control}
        name="phone"
        rules={{ required: { message: "Обязательное поле", value: true } }}
        render={({ field, fieldState: { error } }) => (
          <InputField
            style={{ marginTop: 30, width: "100%", height: 50 }}
            placeholder="+7(000) 000 00 00"
            value={phoneMask.value}
            inputMode="tel"
            keyboardType="phone-pad"
            autoFocus
            onChangeText={(value) => {
              phoneMask.resolve(String(value))
              field.onChange(phoneMask.unmaskedValue)
            }}
            error={error?.message}
          />
        )}
      />
      <Button
        style={{ marginTop: 20, width: "100%", height: 50 }}
        disabled={isPending || !watchPhone.length}
        onPress={() => form.handleSubmit(onSubmit)()}
      >
        <Text style={{ color: "#fff" }}>Получить код</Text>
      </Button>
    </KeyboardAvoidingView>
  )
}
