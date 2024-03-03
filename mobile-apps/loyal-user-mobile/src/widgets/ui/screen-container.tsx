import React from "react"
import { SafeAreaView, StyleProp, StyleSheet, View, ViewStyle } from "react-native"

interface Props {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}

export const ScreenContainer = ({ children, style }: Props) => {
  return <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    flexDirection: "column",
    width: "auto",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
})
