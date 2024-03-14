import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { KeyboardAvoidingView, Platform, Pressable, Text, View } from "react-native"
import * as z from "zod"

import { checkLoginCode, getLoginCode, login } from "entities/auth/api"
import { useAuthStore } from "entities/auth/model/store"

import { otpMask, phoneMask } from "shared/config/masks"
import { saveAuthToken } from "shared/config/storage"
import { theme } from "shared/config/theme"
import { InputImaskField } from "shared/ui/form-fields"
import { MaskedText } from "shared/ui/masked-text"

interface Props {
  phone: string
  onChangePhone: () => void
  onRegister: () => void
}

interface FormState {
  otp: string
}

const formSchema = z.object({
  phone: z.string({ required_error: "Обязательное поле." }).min(10, { message: "Неверный формат" }),
})

let timer: NodeJS.Timeout | null = null

export const LoginFormWriteCode = ({ phone, onChangePhone, onRegister }: Props) => {
  const [seconds, setSeconds] = useState(59)
  const setIsAuth = useAuthStore((state) => state.setIsAuth)

  const form = useForm<FormState>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  })

  const { mutate: mutateCheck } = useMutation({
    mutationFn: checkLoginCode,
  })
  const { mutate: mutateGetCode, isPending: isPendingGetCode } = useMutation({
    mutationFn: getLoginCode,
  })
  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: login,
  })

  const runTimer = () => {
    timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(timer!)
          return prevSeconds
        }

        return prevSeconds - 1
      })
    }, 1000)
  }

  const handleGetCodeAgain = () => {
    mutateGetCode(phone, {
      onSuccess: () => {
        setSeconds(59)
        runTimer()
      },
    })
  }

  const handleChangePhone = () => {
    form.reset()
    onChangePhone()
  }

  const onSubmit = ({ otp }: FormState) => {
    mutateCheck(
      { otp, phone },
      {
        onError: () => {
          form.setError("otp", { message: "Неверный код" })
        },
        onSuccess: () => {
          mutateLogin(
            { phone },
            {
              onSuccess: async ({ data }) => {
                await saveAuthToken(data.token)
                setIsAuth(true)
                router.replace("/profile")
              },
              onError: () => {
                onRegister()
              },
            }
          )
        },
      }
    )
  }

  useEffect(() => {
    runTimer()

    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [phone])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 16 }}
    >
      <Text style={{ fontSize: 40, fontWeight: "600" }}>Введите код</Text>
      <Text style={{ textAlign: "center", marginTop: 16, color: theme.mutedForeground }}>
        Мы отправили код в смс на номер
      </Text>
      <MaskedText mask={phoneMask} style={{ fontWeight: "500", marginTop: 8 }}>
        {phone}
      </MaskedText>
      <Controller
        control={form.control}
        name="otp"
        rules={{ required: { message: "Обязательное поле", value: true } }}
        render={({ field, fieldState: { error } }) => (
          <InputImaskField
            opts={otpMask}
            style={{ marginTop: 30, width: "100%", height: 50 }}
            placeholder="0000"
            value={field.value}
            keyboardType="number-pad"
            autoFocus
            onChangeText={(_, value) => {
              field.onChange(value)

              if (value.length === 4) {
                onSubmit(form.getValues())
              }
            }}
            error={error?.message}
            isLoading={isPendingGetCode || isPendingLogin}
            disabled={isPendingGetCode}
          />
        )}
      />
      {seconds > 0 && (
        <View style={{ marginTop: 20, flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Text style={{ color: theme.mutedForeground }}>Отправить код повторно через</Text>
          <Text style={{ color: theme.primary }}>
            00:{seconds < 10 && "0"}
            {seconds}
          </Text>
        </View>
      )}
      {seconds === 0 && (
        <Pressable
          onPress={handleGetCodeAgain}
          style={{ marginTop: 20, width: "100%", alignItems: "center" }}
        >
          <Text style={{ color: theme.primary }}>Отправить код повторно</Text>
        </Pressable>
      )}
      <Pressable
        style={{ marginTop: 16, width: "100%", alignItems: "center" }}
        onPress={handleChangePhone}
      >
        <Text style={{ color: theme.primary }}>Изменить номер</Text>
      </Pressable>
    </KeyboardAvoidingView>
  )
}
