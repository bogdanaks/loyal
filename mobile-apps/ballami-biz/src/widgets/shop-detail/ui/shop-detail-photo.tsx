import { Image } from "expo-image"
import { StyleSheet, Text, View, useWindowDimensions } from "react-native"

import { config } from "shared/config"
import { theme } from "shared/config/theme"

interface Props {
  shopClient: ShopClient
}

export const ShopDetailPhoto = ({ shopClient }: Props) => {
  const { width } = useWindowDimensions()

  return (
    <View
      style={[
        styles.photoContainer,
        {
          width: width / 2.5,
          height: width / 2.5,
          borderRadius: width,
          top: -(width / 5),
        },
      ]}
    >
      <View
        style={[
          styles.photoBlock,
          {
            borderRadius: width,
            zIndex: 2,
          },
        ]}
      >
        <Image
          style={{ width: "100%", height: "100%", borderRadius: width, resizeMode: "cover" }}
          source={`${config.apiDomain}/static/shops/${shopClient.shop.id}/${shopClient.shop.photo}`}
          contentFit="cover"
          cachePolicy="disk"
        />
      </View>
      <Text
        style={{
          marginTop: 24,
          color: theme.mutedForeground,
          fontSize: 13,
          fontWeight: "400",
        }}
      >
        [{shopClient.shop.type.title}]
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  photoContainer: {
    position: "absolute",
    padding: 8,
    borderWidth: 1,
    borderColor: "#CFCFCF",
    alignItems: "center",
  },
  photoBlock: {
    width: "100%",
    height: "100%",
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
})
