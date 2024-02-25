import { Image, StyleSheet, Text, View } from "react-native"
import { CoinIcon } from "shared/assets/icons"

interface Props {
  id?: string
}

export const ShopCard = ({ id }: Props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.shopLogo}
        source={require("/Users/user/Desktop/my/loyal/mobile-apps/loyal-user-mobile/assets/favicon.png")}
      />
      <View>
        <Text style={styles.shopTitle}>{id} - Doma</Text>
        <Text style={styles.shopDesc}>
          Демократичное кафе с завтраками и продуктовой лавкой в переулке Гривцова.
        </Text>
        <View style={styles.bonusCounterDiv}>
          <CoinIcon width={14} height={14} />
          <Text style={styles.bonusCounterText}>777</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "auto",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    marginBottom: 14,
  },
  shopLogo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  shopTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  shopDesc: {
    fontSize: 14,
  },
  bonusCounterDiv: {
    marginTop: 4,
    flexDirection: "row",
    backgroundColor: "#ffc107",
    alignSelf: "flex-start",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 3,
  },
  bonusCounterText: {
    fontSize: 12,
    marginLeft: 2,
  },
})
