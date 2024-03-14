import { useQuery } from "@tanstack/react-query"
import { Redirect, Stack } from "expo-router"
import { useEffect } from "react"

import { useAuthStore } from "entities/auth/model/store"

import { getMe } from "entities/user/api"
import { useUserStore } from "entities/user/model/store"

import { showError } from "shared/libs/toast-utils"

import { Loader } from "widgets/ui/loader"

export default function AppLayout() {
  const isAuth = useAuthStore((state) => state.isAuth)
  const setIsAuth = useAuthStore((state) => state.setIsAuth)
  const setUser = useUserStore((state) => state.setUser)

  const { error, isLoading, data } = useQuery({
    queryKey: ["user-me"],
    queryFn: getMe,
    retry: false,
    enabled: isAuth,
  })

  useEffect(() => {
    if (data) {
      setUser(data.data)
    }
  }, [data])

  useEffect(() => {
    if (isAuth && data) {
      setIsAuth(true)
    }
  }, [isAuth, data])

  useEffect(() => {
    if (error) {
      console.log("error", error)
      showError(`Ошибка приложения! Обратитесь в поддержку. ${JSON.stringify(error)}`)
    }
  }, [error])

  if (isLoading) {
    return <Loader />
  }

  if (!isAuth) {
    return <Redirect href="/sign-in" />
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="shop-detail" options={{ headerShown: true }} />
    </Stack>
  )
}
