import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigation } from "@react-navigation/native"
import { useMutation } from "@tanstack/react-query"
import IMask from "imask"
import { Controller, useForm } from "react-hook-form"
import { KeyboardAvoidingView, Platform, Pressable, Text, View } from "react-native"
import * as z from "zod"

import { StackNavigation } from "app/export-type"

import { register } from "entities/auth/api"
import { useAuthStore } from "entities/auth/model/store"

import { useUserStore } from "entities/user/model/store"

import { useMyTheme } from "shared/hooks/use-my-theme"
import { saveAuthToken } from "shared/libs/storage"
import { Button, InputField } from "shared/ui"

const birthdayMask = IMask.createMask({
  mask: Date,
})

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
  const navigation = useNavigation<StackNavigation>()
  const { colors } = useMyTheme()
  const setIsAuth = useAuthStore((state) => state.setIsAuth)
  const setUser = useUserStore((state) => state.setUser)

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
      { ...data, phone: `7${phone}` },
      {
        onError: () => {},
        onSuccess: async ({ data }) => {
          await saveAuthToken(data.token)
          setUser(data.user)
          setIsAuth(true)
        },
      }
    )
  }

  const handlePrivacyPolicy = () => {
    navigation.navigate("PrivacyPolicy")
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
            <InputField
              style={{ width: "100%", height: 50 }}
              placeholder="31.12.1998"
              label="Дата рождения"
              value={birthdayMask.value}
              keyboardType="number-pad"
              onChangeText={(value) => {
                birthdayMask.resolve(String(value))
                field.onChange(birthdayMask.unmaskedValue)
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
        <Text style={{ color: "#fff" }}>Зарегистрироваться</Text>
      </Button>
      <Text
        style={{
          textAlign: "center",
          marginTop: 10,
          color: colors.mutedForeground,
        }}
      >
        Нажимая кнопку “Зарегистрироваться”, вы принимаете условия
      </Text>
      <Pressable onPress={handlePrivacyPolicy}>
        <Text style={{ color: colors.primary }}>Политики конфиденциальности</Text>
      </Pressable>
    </KeyboardAvoidingView>
  )
}
