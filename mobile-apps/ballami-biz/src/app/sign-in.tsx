import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { router } from "expo-router"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { KeyboardAvoidingView, Platform, Text, View } from "react-native"
import { z } from "zod"

import { accountLogin } from "entities/auth/api"
import { useAuthStore } from "entities/auth/model/store"

import { saveAuthToken } from "shared/config/storage"
import { theme } from "shared/config/theme"
import { showError } from "shared/libs/toast-utils"
import { Button } from "shared/ui/button"
import { InputField } from "shared/ui/form-fields"

const formSchema = z.object({
  email: z
    .string({ required_error: "Обязательное поле." })
    .email({ message: "Некорректный email." }),
  password: z
    .string({ required_error: "Обязательное поле." })
    .min(6, { message: "Минимум 6 символов." })
    .max(100, { message: "Максимум 100 символов." }),
})
type FormFields = z.infer<typeof formSchema>

export default function SignIn() {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
  })
  const { mutate, isPending } = useMutation<
    BaseResponse<string>,
    ResponseError,
    LoginData,
    unknown
  >({
    mutationFn: accountLogin,
  })
  const setIsAuth = useAuthStore((state) => state.setIsAuth)

  const onSubmit = (data: FormFields) => {
    mutate(data, {
      onSuccess: async ({ data }) => {
        await saveAuthToken(data)
        setIsAuth(true)
        router.replace("/account")
      },
      onError: (error) => {
        if (error?.payload?.message === "Incorrect data") {
          setSubmitError("Неверный email или пароль")
          return
        }
        showError()
      },
    })
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, justifyContent: "center", paddingHorizontal: 16 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={{ fontSize: 32, fontWeight: "600" }}>Войти в аккаунт</Text>
      <View style={{ flexDirection: "column", gap: 14, marginTop: 24 }}>
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState: { error } }) => (
            <InputField
              label="Почта"
              placeholder="example@mail.com"
              value={field.value}
              keyboardType="email-address"
              onChangeText={field.onChange}
              error={error?.message}
            />
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState: { error } }) => (
            <InputField
              label="Пароль"
              placeholder="••••••"
              secureTextEntry
              value={field.value}
              keyboardType="default"
              onChangeText={field.onChange}
              error={error?.message}
            />
          )}
        />
        {submitError && <Text style={{ color: theme.destructive }}>{submitError}</Text>}
        <Button onPress={() => form.handleSubmit(onSubmit)()} disabled={isPending}>
          Войти
        </Button>
      </View>
    </KeyboardAvoidingView>
  )
}
