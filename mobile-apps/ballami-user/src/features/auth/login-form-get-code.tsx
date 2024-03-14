import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import IMask from "imask"
import { Controller, useForm } from "react-hook-form"
import { KeyboardAvoidingView, Platform, Text } from "react-native"
import * as z from "zod"

import { getLoginCode } from "entities/auth/api"

import { theme } from "shared/config/theme"
import { Button } from "shared/ui/button"
import { InputImaskField } from "shared/ui/form-fields"

interface FormState {
  phone: string
}

const phoneMask = IMask.createMask({
  mask: "+{7} (000) 000-00-00",
})

const formSchema = z.object({
  phone: z.string({ required_error: "Обязательное поле." }).min(10, { message: "Неверный формат" }),
})

interface Props {
  onSuccess: (phone: string) => void
}

export const LoginFormGetCode = ({ onSuccess }: Props) => {
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
      <Text style={{ textAlign: "center", marginTop: 16, color: theme.mutedForeground }}>
        Введите номер телефона для получения кода авторизации
      </Text>
      <Controller
        control={form.control}
        name="phone"
        rules={{ required: { message: "Обязательное поле", value: true } }}
        render={({ field, fieldState: { error } }) => (
          <InputImaskField
            style={{ marginTop: 30, width: "100%", height: 50 }}
            placeholder="+7(000) 000 00 00"
            value={phoneMask.value}
            inputMode="tel"
            keyboardType="phone-pad"
            autoFocus
            onChangeText={(_, value) => {
              field.onChange(value)
            }}
            error={error?.message}
            opts={phoneMask}
          />
        )}
      />
      <Button
        style={{ marginTop: 20, width: "100%", height: 50 }}
        disabled={isPending || !watchPhone.length}
        onPress={() => form.handleSubmit(onSubmit)()}
      >
        Получить код
      </Button>
    </KeyboardAvoidingView>
  )
}
