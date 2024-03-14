import { Stack } from "expo-router"
import { EditLoyal } from "features/loyal"
import { View } from "react-native"

import { theme } from "shared/config/theme"

export default function LoyalProgeramPage() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Stack.Screen
        options={{
          title: "Программа лояльности",
          headerTitleStyle: { color: theme.accentForeground },
          headerBackTitleVisible: false,
          headerBackVisible: true,
        }}
      />
      <EditLoyal />
    </View>
  )
}
