import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import { Text, View } from "react-native"
import * as z from "zod"

import { sendFeedback } from "entities/help/api"

import { theme } from "shared/config/theme"
import { showError, showSuccess } from "shared/libs/toast-utils"
import { Button } from "shared/ui/button"
import { InputField } from "shared/ui/form-fields"

const formSchema = z.object({
  text: z
    .string({ required_error: "Обязательное поле." })
    .min(3, { message: "Минимум 3 символа." })
    .max(150, { message: "Максимум 150 символов." }),
})
type FormFields = z.infer<typeof formSchema>

export const SendFeedback = () => {
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: sendFeedback,
  })

  const onSubmit = ({ text }: FormFields) => {
    mutate(text, {
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
    <View style={{ flex: 1 }}>
      <Text style={{ marginBottom: 10 }}>
        Если вы столкнулись с проблемой или у вас есть предложения по улучшению сервиса, напишите
        нам!
      </Text>
      <Controller
        control={form.control}
        name="text"
        rules={{ required: { message: "Обязательное поле", value: true } }}
        render={({ field, fieldState: { error } }) => (
          <InputField
            style={{ width: "100%", minHeight: 100 }}
            value={field.value}
            keyboardType="default"
            multiline={true}
            onChangeText={field.onChange}
            error={error?.message}
          />
        )}
      />
      <Button
        onPress={() => form.handleSubmit(onSubmit)()}
        isLoading={isPending}
        style={{ marginTop: "auto" }}
      >
        <Text style={{ color: theme.background }}>Отправить</Text>
      </Button>
    </View>
  )
}
