import { createStackNavigator } from "@react-navigation/stack"
import { PrivacyPolicyScreen } from "screens/privacy-policy.screen"

import { UserAgreementScreen } from "../user-agreement.screen"
import { AboutAppScreen } from "./about-app.screen"

export type AboutStackParamList = {
  AboutAppScreen: undefined
  PrivacyPolicy: undefined
  UserAgreement: undefined
}

const Stack = createStackNavigator<AboutStackParamList>()

export const AboutAppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="AboutAppScreen">
      <Stack.Screen
        name="AboutAppScreen"
        component={AboutAppScreen}
        options={{ headerShown: true, headerTitle: "О приложении" }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{ headerShown: true, headerTitle: "Политика конфиденциальности" }}
      />
      <Stack.Screen
        name="UserAgreement"
        component={UserAgreementScreen}
        options={{ headerShown: true, headerTitle: "Пользовательское соглашение" }}
      />
    </Stack.Navigator>
  )
}
