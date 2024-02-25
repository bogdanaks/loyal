import React, { PropsWithChildren } from "react"
import { SafeAreaView, StyleProp, StyleSheet, ViewStyle } from "react-native"

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
    width: "auto",
    padding: 20,
  },
})
