import { StackScreenProps } from "@react-navigation/stack"
import { Text } from "react-native"
import { ScreenContainer } from "widgets/ui/screen-container"
import { ShopsStackParamList } from "./shops.navigator"
import { useEffect } from "react"
import { ShopCard } from "widgets/shops"

export const ShopsDetail = ({ route, navigation }: StackScreenProps<ShopsStackParamList>) => {
  useEffect(() => {
    navigation.setOptions({ headerTitle: `Магазин ${route.params?.title}` })
  }, [route])

  return (
    <ScreenContainer>
      <ShopCard id={route.params?.id} />
    </ScreenContainer>
  )
}
