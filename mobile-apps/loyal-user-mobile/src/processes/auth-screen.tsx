import { createStackNavigator } from "@react-navigation/stack"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import Toast from "react-native-toast-message"
import { AppScreen } from "screens/app.screen"
import { LoginScreen } from "screens/login.screen"
import { PrivacyPolicyScreen } from "screens/privacy-policy.screen"

import { AppStackScreenList } from "app/export-type"

import { useAuthStore } from "entities/auth/model/store"

import { getMe } from "entities/user/api"
import { useUserStore } from "entities/user/model/store"

import { LoadingWrapper } from "widgets/ui/loading-wrapper"

const Stack = createStackNavigator<AppStackScreenList>()

export const AuthScreen = () => {
  const isAuth = useAuthStore((state) => state.isAuth)
  const setUser = useUserStore((state) => state.setUser)

  const { error, isLoading, data } = useQuery({
    queryKey: ["user-me"],
    queryFn: getMe,
    retry: false,
    enabled: isAuth,
  })

  useEffect(() => {
    if (isAuth && data) {
      setUser(data.data)
    }
  }, [isAuth, data])

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: "Ошибка приложения! Обратитесь в поддержку.",
      })
    }
  }, [error])

  if (isLoading) {
    return <LoadingWrapper isLoading={isLoading} />
  }

  return (
    <Stack.Navigator>
      {isAuth ? (
        <Stack.Screen name="App" component={AppScreen} options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicyScreen}
            options={{
              headerShown: true,
              headerTitle: "Политика конфиденциальности",
              headerBackTitle: "Назад",
            }}
          />
        </>
      )}
    </Stack.Navigator>
  )
}
