import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { ProfileScreen } from "screens/profile/profile.screen"
import { QrScreen } from "screens/qr.screen"
import { ShopsScreen } from "screens/shops/shops.screen"
import { QrIcon, ShopBagIcon, UserIcon } from "shared/assets/icons"
import { TabBarButton } from "./tab-bar-button"
import { ShopsNavigator } from "screens/shops/shops.navigator"

const Tab = createBottomTabNavigator()

export const TabBar = () => {
  return (
    <Tab.Navigator initialRouteName="Shops">
      <Tab.Screen
        name="Shops"
        component={ShopsNavigator}
        options={{
          tabBarLabel: () => null,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarButton isActive={focused}>
              <ShopBagIcon width={24} height={24} />
            </TabBarButton>
          ),
        }}
      />
      <Tab.Screen
        name="QR"
        component={QrScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <TabBarButton isActive={focused}>
              <QrIcon width={24} height={24} />
            </TabBarButton>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <TabBarButton isActive={focused}>
              <UserIcon width={24} height={24} />
            </TabBarButton>
          ),
        }}
      />
    </Tab.Navigator>
  )
}
