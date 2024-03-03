import { useHeaderHeight } from "@react-navigation/elements"
import { StyleSheet, Text, View } from "react-native"

import { CardIcon } from "shared/assets/icons"
import { useMyTheme } from "shared/hooks/use-my-theme"

interface Props {
  shopClient: ShopClient
}

export const ShopDetailHeader = ({ shopClient }: Props) => {
  const { colors } = useMyTheme()
  const headerHeight = useHeaderHeight()

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: headerHeight,
        paddingHorizontal: 16,
      }}
    >
      <View style={{ flexDirection: "column", gap: 2 }}>
        <Text style={{ fontSize: 40 }}>{shopClient.shop.title}</Text>
        <View style={[styles.bonusCounterDiv, { backgroundColor: colors.background }]}>
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
      </View>
      <View style={{ flexDirection: "column", gap: 2, alignItems: "flex-end" }}>
        <Text style={{ fontSize: 40 }}>{shopClient?.balance ?? 0}</Text>
        <Text>баллов</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
