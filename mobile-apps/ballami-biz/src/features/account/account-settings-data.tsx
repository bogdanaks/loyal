import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"
import * as z from "zod"

import { updateAccount } from "entities/account/api"
import { useAccountStore } from "entities/account/model/store"

import { phoneMask } from "shared/config/masks"
import { showError, showSuccess } from "shared/libs/toast-utils"
import { Button } from "shared/ui/button"
import { InputField, InputImaskField } from "shared/ui/form-fields"

const formSchema = z.object({
  name: z
    .string({ required_error: "Обязательное поле." })
    .min(3, { message: "Минимум 3 символа." })
    .max(25, { message: "Максимум 25 символов." }),
  phone: z.string({ required_error: "Обязательное поле." }).min(10, { message: "Неверный формат" }),
  email: z.string({ required_error: "Обязательное поле." }).email({ message: "Неверный формат." }),
})
type FormFields = z.infer<typeof formSchema>

export const AccountSettingsData = () => {
  const account = useAccountStore((state) => state.account)
  const setAccount = useAccountStore((state) => state.setAccount)

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: account?.email ?? "",
      name: account?.name ?? "",
      phone: account?.phone ?? "",
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: updateAccount,
  })

  const onSubmit = (data: FormFields) => {
    if (!account) {
      return
    }

    mutate(data, {
      onSuccess: () => {
        showSuccess()
        setAccount({ ...account, name: data.name, phone: data.phone, email: data.email })
      },
      onError: () => {
        showError()
      },
    })
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
        name="name"
        render={({ field, fieldState: { error } }) => (
          <InputField
            label="Ваше имя"
            value={field.value}
            keyboardType="default"
            onChangeText={field.onChange}
            error={error?.message}
          />
        )}
      />
      <Controller
        control={form.control}
        name="phone"
        render={({ field, fieldState: { error } }) => (
          <InputImaskField
            opts={phoneMask}
            label="Номер телефона"
            placeholder="+7 (000) 000-00-00"
            value={field.value}
            inputMode="tel"
            keyboardType="phone-pad"
            onChangeText={(_, um) => {
              field.onChange(um)
            }}
            error={error?.message}
          />
        )}
      />
      <Controller
        control={form.control}
        name="email"
        render={({ field, fieldState: { error } }) => (
          <InputField
            label="Почта"
            value={field.value}
            keyboardType="email-address"
            placeholder="example@mail.ru"
            onChangeText={field.onChange}
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
