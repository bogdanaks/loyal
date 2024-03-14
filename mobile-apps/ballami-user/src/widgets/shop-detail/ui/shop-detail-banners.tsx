import { ImageGallery } from "@georstat/react-native-image-gallery"
import { Image } from "expo-image"
import { useMemo, useState } from "react"
import { Pressable, ScrollView, useWindowDimensions } from "react-native"

import { config } from "shared/config"
import { theme } from "shared/config/theme"

interface Props {
  shopClient: ShopClient
}

export const ShopDetailBanners = ({ shopClient }: Props) => {
  const { width } = useWindowDimensions()
  const [isOpen, setIsOpen] = useState(false)
  const [initialIndex, setInitialIndex] = useState(0)

  const images = useMemo(() => {
    return Object.entries(shopClient.shop.banners).map(([index, src]) => ({
      id: index,
      url: `${config.apiDomain}/static/shops/${shopClient.shop.id}/${src}`,
    }))
  }, [shopClient])

  const handleBannerPress = (index: number) => {
    setInitialIndex(index)
    setIsOpen(true)
  }

  return (
    <ScrollView
      horizontal
      style={{
        flexGrow: 0,
        marginTop: 24,
      }}
      contentContainerStyle={{
        gap: 8,
      }}
    >
      <ImageGallery
        close={() => setIsOpen(false)}
        isOpen={isOpen}
        images={images}
        initialIndex={initialIndex}
        thumbColor={theme.primary}
      />
      {Object.entries(shopClient.shop.banners).map(([index, src], indexNum) => (
        <Pressable
          key={index}
          onPress={() => handleBannerPress(indexNum)}
          style={{
            height: width / 2 / 1.78,
            width: width / 2,
            borderRadius: 12,
          }}
        >
          <Image
            source={`${config.apiDomain}/static/shops/${shopClient.shop.id}/${src}`}
            contentFit="cover"
            cachePolicy="disk"
            style={{ width: "100%", height: "100%", borderRadius: 12, resizeMode: "cover" }}
          />
        </Pressable>
      ))}
    </ScrollView>
  )
}
