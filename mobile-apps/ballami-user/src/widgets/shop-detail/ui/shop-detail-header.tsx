import { useHeaderHeight } from "@react-navigation/elements"
import { StyleSheet, Text, View } from "react-native"

import { CardIcon } from "shared/assets/icons/card-icon"
import { theme } from "shared/config/theme"

interface Props {
  shopClient: ShopClient
}

export const ShopDetailHeader = ({ shopClient }: Props) => {
  const headerHeight = useHeaderHeight()
  return (
    <View
      style={[
        styles.container,
        {
          marginTop: headerHeight,
        },
      ]}
    >
      <View style={styles.containerTitle}>
        <Text style={{ fontSize: 36 }}>{shopClient.shop.title}</Text>
        <View style={[styles.bonusCounterDiv, { backgroundColor: theme.background }]}>
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
      <View style={styles.containerPoints}>
        <Text style={{ fontSize: 36 }}>{shopClient?.balance ?? 0}</Text>
        <Text>баллов</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    gap: 12,
  },
  containerTitle: {
    flex: 1,
    flexDirection: "column",
    gap: 2,
  },
  containerPoints: {
    flex: 0,
    flexDirection: "column",
    gap: 2,
    alignItems: "flex-end",
    justifyContent: "flex-start",
    height: "100%",
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
