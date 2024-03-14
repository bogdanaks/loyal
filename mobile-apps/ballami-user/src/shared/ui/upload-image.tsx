import React from "react"
import { StyleSheet, View } from "react-native"

import { PhotoIcon } from "shared/assets/icons/photo-icon"
import { theme } from "shared/config/theme"

export const UploadImage = () => {
  return (
    <View style={styles.block}>
      <PhotoIcon />
    </View>
  )
}

const styles = StyleSheet.create({
  block: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.border,
  },
})
