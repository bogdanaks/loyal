import { Image } from "expo-image"
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native"

import { CardIcon, GiftIcon } from "shared/assets/icons"
import { config } from "shared/config"
import { useMyTheme } from "shared/hooks/use-my-theme"

interface Props {
  shopClient: ShopClient
  style?: StyleProp<ViewStyle>
}

export const ShopCard = ({ shopClient, style }: Props) => {
  const { colors } = useMyTheme()

  return (
    <View style={[styles.container, style]}>
      <Image
        style={styles.shopLogo}
        source={`${config.apiDomain}/static/shops/${shopClient.shop.id}/${shopClient.shop.photo}`}
        contentFit="cover"
        cachePolicy="disk"
      />
      <View style={{ flex: 1, height: "100%" }}>
        <Text style={styles.shopTitle}>{shopClient.shop.title}</Text>
        <Text style={[styles.shopDesc, { color: colors.mutedForeground }]} numberOfLines={2}>
          {shopClient.shop.short_description}
        </Text>
        <View style={{ flexDirection: "row", gap: 6, justifyContent: "space-between" }}>
          <View style={[styles.bonusCounterDiv, { backgroundColor: colors.muted }]}>
            <View
              style={{
                backgroundColor: "#D1DFFF",
                position: "absolute",
                left: 0,
                zIndex: 1,
                height: 24,
                width: 24,
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardIcon width={16} height={16} style={{ zIndex: 2 }} />
            </View>
            <Text style={styles.bonusCounterText}>
              от {shopClient.shop.loyal_program.percent_bonus}%
            </Text>
          </View>
          <View style={[styles.bonusCounterDiv, { backgroundColor: colors.muted }]}>
            <View
              style={{
                backgroundColor: "#D1DFFF",
                position: "absolute",
                left: 0,
                zIndex: 1,
                height: 24,
                width: 24,
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <GiftIcon width={16} height={16} style={{ zIndex: 2 }} />
            </View>
            <Text style={styles.bonusCounterText}>{shopClient?.balance ?? 0}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    width: "auto",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 14,
  },
  shopLogo: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 12,
  },
  shopTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  shopDesc: {
    flex: 1,
    fontSize: 14,
  },
  bonusCounterDiv: {
    position: "relative",
    marginTop: "auto",
    flexDirection: "row",
    alignSelf: "flex-start",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingLeft: 26,
    paddingVertical: 2,
    borderRadius: 20,
    height: 24,
  },
  bonusCounterText: {
    fontSize: 12,
    marginLeft: "auto",
    paddingLeft: 2,
    fontWeight: "500",
  },
})
