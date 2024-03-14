import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"
import * as z from "zod"

import { updatePassword } from "entities/account/api"

import { showError, showSuccess } from "shared/libs/toast-utils"
import { Button } from "shared/ui/button"
import { InputField } from "shared/ui/form-fields"

const formSchema = z
  .object({
    old_password: z
      .string({ required_error: "Обязательное поле." })
      .min(6, { message: "Минимум 6 символов." })
      .max(100, { message: "Максимум 100 символов." }),
    new_password: z
      .string({ required_error: "Обязательное поле." })
      .min(6, { message: "Минимум 6 символов." })
      .max(100, { message: "Максимум 100 символов." }),
    new_password_repeate: z
      .string({ required_error: "Обязательное поле." })
      .min(6, { message: "Минимум 6 символов." })
      .max(100, { message: "Максимум 100 символов." }),
  })
  .refine((data) => data.new_password === data.new_password_repeate, {
    message: "Пароль не совпадает",
    path: ["new_password_repeate"],
  })
type FormFields = z.infer<typeof formSchema>

export const AccountSettingsSafety = () => {
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      new_password_repeate: "",
    },
  })

  const { mutate, isPending } = useMutation<
    BaseResponse<string>,
    ResponseError,
    UpdatePasswordData,
    unknown
  >({
    mutationFn: updatePassword,
  })

  const onSubmit = (data: FormFields) => {
    mutate(data, {
      onSuccess: () => {
        form.reset()
        showSuccess("Успешно отправлено!")
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
        name="old_password"
        render={({ field, fieldState: { error } }) => (
          <InputField
            label="Старый пароль"
            value={field.value}
            keyboardType="default"
            onChangeText={field.onChange}
            error={error?.message}
            secureTextEntry
          />
        )}
      />
      <Controller
        control={form.control}
        name="new_password"
        render={({ field, fieldState: { error } }) => (
          <InputField
            label="Новый пароль"
            value={field.value}
            keyboardType="default"
            onChangeText={field.onChange}
            error={error?.message}
            secureTextEntry
          />
        )}
      />
      <Controller
        control={form.control}
        name="new_password_repeate"
        render={({ field, fieldState: { error } }) => (
          <InputField
            label="Повторите новый пароль"
            value={field.value}
            keyboardType="default"
            onChangeText={field.onChange}
            error={error?.message}
            secureTextEntry
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
