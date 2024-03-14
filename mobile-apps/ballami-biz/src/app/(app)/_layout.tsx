import { DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { useQuery } from "@tanstack/react-query"
import { Redirect, Stack } from "expo-router"
import { useEffect } from "react"
import { MenuProvider } from "react-native-popup-menu"

import { useAuthStore } from "entities/auth/model/store"

import { getAccount } from "entities/account/api"
import { useAccountStore } from "entities/account/model/store"
import { getMyShop } from "entities/shop/api"
import { useShopStore } from "entities/shop/model/store"

import { theme } from "shared/config/theme"
import { showError } from "shared/libs/toast-utils"

import { Loader } from "widgets/ui/loader"

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.primary,
    background: theme.background,
    text: theme.slate600,
  },
}

export default function AppLayout() {
  const isAuth = useAuthStore((state) => state.isAuth)
  const setIsAuth = useAuthStore((state) => state.setIsAuth)
  const setAccount = useAccountStore((state) => state.setAccount)
  const setShop = useShopStore((state) => state.setShop)

  const {
    error,
    isLoading,
    data: accountData,
  } = useQuery({
    queryKey: ["account"],
    queryFn: getAccount,
    retry: false,
  })

  const { data: myShop, isLoading: isLoadingMyShop } = useQuery({
    queryKey: ["my-shop"],
    queryFn: getMyShop,
    retry: 1,
  })

  useEffect(() => {
    if (accountData) {
      setAccount(accountData.data)
    }
  }, [accountData])

  useEffect(() => {
    if (myShop) {
      setShop(myShop.data)
    }
  }, [myShop])

  useEffect(() => {
    if (isAuth && myShop && accountData) {
      setIsAuth(true)
    }
  }, [isAuth, myShop, accountData])

  useEffect(() => {
    if (error) {
      console.log("error", error)
      showError("Ошибка приложения! Обратитесь в поддержку.")
    }
  }, [error])

  if (isLoading || isLoadingMyShop) {
    return <Loader />
  }

  if (!isAuth) {
    return <Redirect href="/sign-in" />
  }

  return (
    <MenuProvider>
      <ThemeProvider value={MyTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="my-business-modal" options={{ presentation: "modal" }} />
        </Stack>
      </ThemeProvider>
    </MenuProvider>
  )
}
