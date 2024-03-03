import React, { PropsWithChildren } from "react"
import { StyleSheet, View } from "react-native"

interface Props {
  isActive: boolean
  children: React.ReactNode
}

export const NavigationTabBarButton = ({ isActive, children }: Props) => {
  return <View style={[styles.container, isActive && styles.active]}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
    borderRadius: 5,
    opacity: 0.5,
  },
  active: {
    opacity: 1,
  },
})
