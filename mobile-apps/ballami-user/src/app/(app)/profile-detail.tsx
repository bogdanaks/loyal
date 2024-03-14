import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import { Stack } from "expo-router"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { StyleSheet, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"
import * as z from "zod"

import { updateUser } from "entities/user/api"
import { useUserStore } from "entities/user/model/store"

import { birthdayMask } from "shared/config/masks"
import { theme } from "shared/config/theme"
import { showSuccess } from "shared/libs/toast-utils"
import { Button } from "shared/ui/button"
import { InputField, InputImaskField } from "shared/ui/form-fields"

dayjs.extend(customParseFormat)

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

export default function ProfileDetailPage() {
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
      birthday: user?.birthday
        ? dayjs(user?.birthday, "YYYY-MM-DD").format("DD.MM.YYYY").toString()
        : "",
    },
  })

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    mutate(
      { ...data, birthday: dayjs(data.birthday, "DD.MM.YYYY").format("YYYY-MM-DD").toString() },
      {
        onSuccess: () => {
          showSuccess()
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
      }
    )
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
        flexGrow: 1,
      }}
    >
      <Stack.Screen
        options={{
          title: "Настройки профиля",
          headerTitleStyle: { color: theme.accentForeground },
          headerBackTitleVisible: false,
        }}
      />
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
              <InputImaskField
                opts={birthdayMask}
                onChangeText={(_, value) => {
                  field.onChange(value)
                }}
                value={field.value}
                error={error?.message}
                label="Дата рождения"
              />
            )}
          />
        </View>
      </View>
      <Button
        onPress={() => form.handleSubmit(onSubmit)()}
        style={{ marginTop: "auto" }}
        isLoading={isPending}
      >
        Сохранить
      </Button>
    </KeyboardAwareScrollView>
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
