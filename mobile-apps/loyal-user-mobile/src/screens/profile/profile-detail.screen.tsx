import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { StatusBar } from "expo-status-bar"
import IMask from "imask"
import { useEffect } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { StyleSheet, Text, View } from "react-native"
import Toast from "react-native-toast-message"
import * as z from "zod"

import { updateUser } from "entities/user/api"
import { useUserStore } from "entities/user/model/store"

import { Button, InputField } from "shared/ui"

import { ScreenContainer } from "widgets/ui/screen-container"

const birthdayMask = IMask.createMask({
  mask: Date,
})

const formSchema = z.object({
  first_name: z
    .string({ required_error: "Обязательное поле." })
    .min(3, { message: "Минимум 3 символа." })
    .max(20, { message: "Максимум 20 символов." }),
  last_name: z
    .string({ required_error: "Обязательное поле." })
    .min(3, { message: "Минимум 3 символа." })
    .max(20, { message: "Максимум 20 символов." })
    .nullable(),
  birthday: z
    .string({ required_error: "Обязательное поле." })
    .min(10, { message: "Заполните дату рождения." })
    .max(10, { message: "Заполните дату рождения." }),
})

type FormFields = z.infer<typeof formSchema>

export const ProfileDetailScreen = () => {
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)

  const { mutate, isPending } = useMutation({
    mutationFn: updateUser,
  })

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      birthday: user?.birthday,
    },
  })

  useEffect(() => {
    if (user) {
      birthdayMask.resolve(user.birthday)
      form.setValue("birthday", birthdayMask.unmaskedValue)
    }
  }, [user])

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    mutate(data, {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Успешно сохранено!",
        })

        if (user) {
          setUser({
            ...user,
            first_name: data.first_name,
            last_name: data.last_name,
            birthday: data.birthday,
          })
        }
      },
      onError: () => {},
    })
  }

  return (
    <ScreenContainer style={{ paddingVertical: 16 }}>
      <StatusBar style="dark" animated={true} backgroundColor="#fff" />
      <View style={styles.form}>
        <View>
          <Controller
            control={form.control}
            name="first_name"
            rules={{ required: { message: "Обязательное поле", value: true } }}
            render={({ field, fieldState: { error } }) => (
              <InputField
                onChangeText={field.onChange}
                value={field.value}
                error={error?.message}
                label="Имя"
              />
            )}
          />
        </View>
        <View>
          <Controller
            control={form.control}
            name="last_name"
            rules={{ required: { message: "Обязательное поле", value: true } }}
            render={({ field, fieldState: { error } }) => (
              <InputField
                onChangeText={field.onChange}
                value={field.value ?? undefined}
                error={error?.message}
                label="Фамилия"
              />
            )}
          />
        </View>
        <View>
          <Controller
            control={form.control}
            name="birthday"
            rules={{ required: { message: "Обязательное поле", value: true } }}
            render={({ field, fieldState: { error } }) => (
              <InputField
                onChangeText={(value) => {
                  birthdayMask.resolve(String(value))
                  field.onChange(birthdayMask.unmaskedValue)
                }}
                value={birthdayMask.value.length ? birthdayMask.value : field.value}
                error={error?.message}
                label="Дата рождения"
              />
            )}
          />
        </View>
      </View>
      <Button onPress={form.handleSubmit(onSubmit)} style={{ marginTop: 16 }} isLoading={isPending}>
        <Text style={{ color: "white" }}>Сохранить</Text>
      </Button>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  form: {
    gap: 16,
  },
  error: {
    fontSize: 12,
    color: "red",
    marginTop: 2,
  },
})
