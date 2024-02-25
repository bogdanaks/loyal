import { StackScreenProps } from "@react-navigation/stack"
import { FlatList, Pressable, StyleSheet } from "react-native"
import { ShopCard } from "widgets/shops"
import { ScreenContainer } from "widgets/ui/screen-container"
import { ShopsStackParamList } from "./shops.navigator"

interface ShopData {
  id: string
  title: string
}

const shops: ShopData[] = [
  {
    id: "1",
    title: "Shop 1",
  },
  {
    id: "2",
    title: "Shop 2",
  },
  {
    id: "3",
    title: "Shop 3",
  },
]

export const ShopsScreen = ({ navigation }: StackScreenProps<ShopsStackParamList>) => {
  const handlePressShop = (shop: ShopData) => {
    navigation.navigate("ShopsDetail", { id: shop.id, title: shop.title })
  }

  return (
    <ScreenContainer style={styles.container}>
      <FlatList
        data={shops}
        renderItem={({ item }) => (
          <Pressable onPress={() => handlePressShop(item)}>
            <ShopCard id={item.id} />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
})
