import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Link } from "expo-router"
import { Controller, useForm } from "react-hook-form"
import { KeyboardAvoidingView, Platform, Pressable, Text, View } from "react-native"
import * as z from "zod"

import { register } from "entities/auth/api"
import { useAuthStore } from "entities/auth/model/store"

import { birthdayMask } from "shared/config/masks"
import { saveAuthToken } from "shared/config/storage"
import { theme } from "shared/config/theme"
import { Button } from "shared/ui/button"
import { InputField, InputImaskField } from "shared/ui/form-fields"

const formSchema = z.object({
  name: z
    .string({ required_error: "Обязательное поле." })
    .min(3, { message: "Минимум 3 символа." })
    .max(20, { message: "Максимум 20 символов." }),
  birthday: z
    .string({ required_error: "Обязательное поле." })
    .min(10, { message: "Заполните дату рождения." })
    .max(10, { message: "Заполните дату рождения." }),
})

interface Props {
  phone: string
}

type FormFields = z.infer<typeof formSchema>

export const RegisterForm = ({ phone }: Props) => {
  const setIsAuth = useAuthStore((state) => state.setIsAuth)

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      birthday: "",
    },
  })
  const watchName = form.watch("name")
  const watchBirthday = form.watch("birthday")

  const { mutate, isPending } = useMutation({
    mutationFn: register,
  })

  const onSubmit = (data: FormFields) => {
    mutate(
      { ...data, phone },
      {
        onError: () => {},
        onSuccess: async ({ data }) => {
          await saveAuthToken(data.token)
          setIsAuth(true)
        },
      }
    )
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 16 }}
    >
      <Text style={{ fontSize: 40, fontWeight: "600" }}>Регистрация</Text>
      <View style={{ marginTop: 30, width: "100%", gap: 20 }}>
        <Controller
          control={form.control}
          name="name"
          rules={{ required: { message: "Обязательное поле", value: true } }}
          render={({ field, fieldState: { error } }) => (
            <InputField
              style={{ width: "100%", height: 50 }}
              placeholder="Ваше имя"
              label="Имя"
              value={field.value}
              keyboardType="default"
              autoFocus
              onChangeText={field.onChange}
              error={error?.message}
            />
          )}
        />
        <Controller
          control={form.control}
          name="birthday"
          rules={{ required: { message: "Обязательное поле", value: true } }}
          render={({ field, fieldState: { error } }) => (
            <InputImaskField
              opts={birthdayMask}
              style={{ width: "100%", height: 50 }}
              placeholder="31.12.1998"
              label="Дата рождения"
              value={field.value}
              keyboardType="number-pad"
              onChangeText={(_, value) => {
                field.onChange(value)
              }}
              error={error?.message}
            />
          )}
        />
      </View>
      <Button
        style={{ marginTop: 20, width: "100%", height: 50 }}
        disabled={isPending || !watchName.length || !watchBirthday.length}
        onPress={() => form.handleSubmit(onSubmit)()}
      >
        Зарегистрироваться
      </Button>
      <Text
        style={{
          textAlign: "center",
          marginTop: 10,
          color: theme.mutedForeground,
        }}
      >
        Нажимая кнопку “Зарегистрироваться”, вы принимаете условия
      </Text>
      <Link href="/privacy-policy" asChild>
        <Pressable>
          <Text style={{ color: theme.primary }}>Политики конфиденциальности</Text>
        </Pressable>
      </Link>
    </KeyboardAvoidingView>
  )
}
