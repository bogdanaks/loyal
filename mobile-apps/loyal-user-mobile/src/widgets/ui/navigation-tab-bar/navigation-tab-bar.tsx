import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { ProfileScreen } from "screens/profile/profile.screen"
import { QrScreen } from "screens/qr.screen"
import { QrIcon, ShopBagIcon, UserIcon } from "shared/assets/icons"
import { NavigationTabBarButton } from "./navigation-tab-bar-button"
import { ShopsNavigator } from "screens/shops/shops.navigator"

const Tab = createBottomTabNavigator()

export const NavigationTabBar = () => {
  return (
    <Tab.Navigator initialRouteName="Shops">
      <Tab.Screen
        name="Shops"
        component={ShopsNavigator}
        options={{
          tabBarLabel: "Мои заведения",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <NavigationTabBarButton isActive={focused}>
              <ShopBagIcon width={24} height={24} />
            </NavigationTabBarButton>
          ),
        }}
      />
      <Tab.Screen
        name="QR"
        component={QrScreen}
        options={{
          tabBarLabel: "QR",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <NavigationTabBarButton isActive={focused}>
              <QrIcon width={24} height={24} />
            </NavigationTabBarButton>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Профиль",
          tabBarIcon: ({ focused }) => (
            <NavigationTabBarButton isActive={focused}>
              <UserIcon width={24} height={24} />
            </NavigationTabBarButton>
          ),
        }}
      />
    </Tab.Navigator>
  )
}
