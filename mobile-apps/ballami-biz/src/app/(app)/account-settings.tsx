import { Stack } from "expo-router"
import { AccountSettingsData, AccountSettingsSafety } from "features/account"
import { useState } from "react"
import { KeyboardAvoidingView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"

import { theme } from "shared/config/theme"

export default function AccountSettingsPage() {
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: "data", title: "Данные" },
    { key: "safety", title: "Безопасность" },
  ])

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Stack.Screen
        options={{
          title: "Настройки аккаунта",
          headerTitleStyle: { color: theme.accentForeground },
          headerBackTitleVisible: false,
          headerBackVisible: true,
        }}
      />

      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          data: AccountSettingsData,
          safety: AccountSettingsSafety,
        })}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: theme.primary }}
            style={{ backgroundColor: "#fff", paddingVertical: 0, height: 44 }}
            inactiveColor={theme.mutedForeground}
            activeColor="#000"
            scrollEnabled
            tabStyle={{ width: "auto" }}
            renderLabel={(propsLabel) => <Text>{propsLabel.route.title}</Text>}
            labelStyle={{ fontSize: 14, fontWeight: "500" }}
          />
        )}
      />
    </View>
  )
}
