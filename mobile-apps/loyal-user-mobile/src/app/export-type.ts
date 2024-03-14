import { NavigationProp } from "@react-navigation/native"

export type AppStackScreenList = {
  App: undefined
  Login: undefined
  PrivacyPolicy: undefined
  ShopsDetail: { shop: ShopClient }
  ShopsList: undefined
  MyProfile: undefined
  ProfileDetail: undefined
  Feedback: undefined
  AboutApp: undefined
  AboutAppScreen: undefined
  UserAgreement: undefined
  Settings: undefined
}
export type StackNavigation = NavigationProp<AppStackScreenList>
