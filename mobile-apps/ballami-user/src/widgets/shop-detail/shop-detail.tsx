import { ScrollView, StyleSheet, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { theme } from "shared/config/theme"

import { ShopDetailAddress } from "./ui/shop-detail-address"
import { ShopDetailBanners } from "./ui/shop-detail-banners"
import { ShopDetailDescription } from "./ui/shop-detail-description"
import { ShopDetailHeader } from "./ui/shop-detail-header"
import { ShopDetailPhone } from "./ui/shop-detail-phone"
import { ShopDetailPhoto } from "./ui/shop-detail-photo"
import { ShopDetailWorkingHours } from "./ui/shop-detail-working-hours"

interface Props {
  shopClient: ShopClient
}

export const ShopDetail = ({ shopClient }: Props) => {
  const { bottom } = useSafeAreaInsets()

  return (
    <ScrollView
      style={{ backgroundColor: theme.muted, flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <ShopDetailHeader shopClient={shopClient} />
      <View
        style={[
          {
            backgroundColor: theme.background,
            paddingBottom: bottom,
          },
          styles.body,
        ]}
      >
        <ShopDetailPhoto shopClient={shopClient} />
        <ShopDetailWorkingHours />
        <ShopDetailBanners shopClient={shopClient} />
        <ShopDetailDescription shopClient={shopClient} />
        <ShopDetailPhone shopClient={shopClient} />
        <ShopDetailAddress shopClient={shopClient} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    marginTop: "30%",
    height: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 16,
    paddingVertical: 16,
    position: "relative",
    alignItems: "center",
  },
})
