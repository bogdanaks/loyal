import { Children, cloneElement, isValidElement } from "react"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"

import { theme } from "shared/config/theme"

import { SegmentItem } from "./segment-item"

interface Props<T extends string> {
  children: React.ReactNode
  value: T
  onChange: (value: T) => void
  style?: StyleProp<ViewStyle>
}

export const Segment = <T extends string>({ children, value, style, onChange }: Props<T>) => {
  return (
    <View style={[styles.selectView, style]}>
      {Children.toArray(children).map((item) => {
        if (!isValidElement(item)) {
          return null
        }

        return cloneElement(item, {
          ...item.props,
          onPress: () => onChange(item.props.value),
          isActive: item.props.value === value,
        })
      })}
    </View>
  )
}

Segment.Item = SegmentItem

const styles = StyleSheet.create({
  selectView: {
    flexDirection: "row",
    gap: 4,
    borderRadius: theme.radius,
    padding: 4,
    backgroundColor: theme.accent,
  },
})
