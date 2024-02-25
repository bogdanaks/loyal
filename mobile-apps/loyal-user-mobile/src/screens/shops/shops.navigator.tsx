import { createStackNavigator } from "@react-navigation/stack"
import { ShopsScreen } from "./shops.screen"
import { ShopsDetail } from "./shops-detail"

export type ShopsStackParamList = {
  ShopsList: undefined
  ShopsDetail: { id: string; title: string }
}

const Stack = createStackNavigator<ShopsStackParamList>()

export const ShopsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ShopsList">
      <Stack.Screen
        name="ShopsList"
        component={ShopsScreen}
        options={{ headerShown: true, headerTitle: "Магазины" }}
      />
      <Stack.Screen name="ShopsDetail" component={ShopsDetail} options={{ headerShown: true }} />
    </Stack.Navigator>
  )
}
