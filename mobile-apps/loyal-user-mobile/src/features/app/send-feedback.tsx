import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { KeyboardAvoidingView, Platform, Text } from "react-native"
import Toast from "react-native-toast-message"
import * as z from "zod"

import { sendFeedback } from "entities/help/api"

import { Button, InputField } from "shared/ui"

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
      onError: () => {},
      onSuccess: () => {
        form.reset()
        Toast.show({
          type: "success",
          text1: "Успешно отправлено!",
        })
      },
    })
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Text style={{ marginBottom: 10, color: "#64748B" }}>
        Если вы столкнулись с проблемой или у Вас есть предложения по улучшению приложения, напишите
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
        style={{ marginTop: 20 }}
      >
        <Text style={{ color: "#fff" }}>Отправить</Text>
      </Button>
    </KeyboardAvoidingView>
  )
}
