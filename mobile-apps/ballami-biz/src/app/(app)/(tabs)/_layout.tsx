import { Tabs } from "expo-router"

import { CaseIcon } from "shared/assets/icons/case-icon"
import { QrIcon } from "shared/assets/icons/qr-icon"
import { UsersIcon } from "shared/assets/icons/users-icon"
import { theme } from "shared/config/theme"

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: theme.primary }}>
      <Tabs.Screen
        name="clients"
        options={{
          title: "Клиенты",
          headerShown: false,
          tabBarActiveTintColor: theme.slate600,
          tabBarIcon: ({ focused }) => (
            <UsersIcon width={24} height={24} opacity={focused ? "1" : "0.5"} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "QR Сканнер",
          headerShown: false,
          tabBarActiveTintColor: theme.slate600,
          tabBarIcon: ({ focused }) => (
            <QrIcon width={24} height={24} opacity={focused ? "1" : "0.5"} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Аккаунт",
          headerShown: false,
          tabBarActiveTintColor: theme.slate600,
          tabBarIcon: ({ focused }) => (
            <CaseIcon width={24} height={24} opacity={focused ? "1" : "0.5"} />
          ),
        }}
      />
    </Tabs>
  )
}
