import { useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"

import { ShopWorkingHoursSheet } from "entities/shop/ui"

import { useMyTheme } from "shared/hooks/use-my-theme"

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
  const { colors } = useMyTheme()
  const [isOpenWorkingHours, setIsOpenWorkingHours] = useState(false)

  return (
    <ScrollView
      style={{ backgroundColor: colors.muted, flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <ShopDetailHeader shopClient={shopClient} />
      <View
        style={[
          {
            backgroundColor: colors.background,
          },
          styles.body,
        ]}
      >
        <ShopDetailPhoto shopClient={shopClient} />
        <ShopDetailWorkingHours onOpenSheet={() => setIsOpenWorkingHours(true)} />
        <ShopDetailBanners shopClient={shopClient} />
        <ShopDetailDescription shopClient={shopClient} />
        <ShopDetailPhone shopClient={shopClient} />
        <ShopDetailAddress shopClient={shopClient} />
        <ShopWorkingHoursSheet
          isOpen={isOpenWorkingHours}
          onClose={() => setIsOpenWorkingHours(false)}
        />
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
