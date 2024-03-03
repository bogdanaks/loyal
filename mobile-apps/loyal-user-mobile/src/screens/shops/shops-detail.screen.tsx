import { StackScreenProps } from "@react-navigation/stack"
import { StatusBar } from "expo-status-bar"
import { useEffect } from "react"
import { View } from "react-native"

import { AppStackScreenList } from "app/export-type"

import { useMyTheme } from "shared/hooks/use-my-theme"

import { ShopDetail } from "widgets/shops"

export const ShopsDetailScreen = ({ route, navigation }: StackScreenProps<AppStackScreenList>) => {
  const { colors } = useMyTheme()

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
      headerBackTitleVisible: false,
    })
  }, [route])

  if (!route.params) {
    return null
  }

  const { shop } = route.params

  return (
    <View
      style={{
        backgroundColor: colors.muted,
        paddingVertical: 0,
        paddingHorizontal: 0,
        flex: 1,
        height: "100%",
      }}
    >
      <StatusBar style="dark" translucent />
      <ShopDetail shopClient={shop} />
    </View>
  )
}
