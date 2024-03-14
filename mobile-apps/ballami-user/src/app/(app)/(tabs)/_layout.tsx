import { Tabs } from "expo-router"

import { QrIcon } from "shared/assets/icons/qr-icon"
import { ShopBagIcon } from "shared/assets/icons/shop-bag-icon"
import { UserIcon } from "shared/assets/icons/user-icon"
import { theme } from "shared/config/theme"

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: theme.primary }}>
      <Tabs.Screen
        name="shops"
        options={{
          title: "Мои заведения",
          headerShown: false,
          tabBarActiveTintColor: theme.slate600,
          tabBarIcon: ({ focused }) => (
            <ShopBagIcon width={24} height={24} opacity={focused ? "1" : "0.5"} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "QR",
          headerShown: false,
          tabBarActiveTintColor: theme.slate600,
          tabBarIcon: ({ focused }) => (
            <QrIcon width={24} height={24} opacity={focused ? "1" : "0.5"} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Профиль",
          headerShown: false,
          tabBarActiveTintColor: theme.slate600,
          tabBarIcon: ({ focused }) => (
            <UserIcon width={24} height={24} opacity={focused ? "1" : "0.5"} />
          ),
        }}
      />
    </Tabs>
  )
}
