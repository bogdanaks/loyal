import { createStackNavigator } from "@react-navigation/stack"

import { AppStackScreenList } from "app/export-type"

import { ShopsDetailScreen } from "./shops-detail.screen"
import { ShopsScreen } from "./shops.screen"

const Stack = createStackNavigator<AppStackScreenList>()

export const ShopsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ShopsList">
      <Stack.Screen name="ShopsList" component={ShopsScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="ShopsDetail"
        component={ShopsDetailScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  )
}
