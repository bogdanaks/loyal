import { Pressable, StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from "react-native"

import { theme } from "shared/config/theme"

interface Props {
  value?: string
  isActive?: boolean
  onPress?: () => void
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  styleText?: StyleProp<TextStyle>
}

export const SegmentItem = ({ isActive, onPress, children, style, styleText }: Props) => {
  return (
    <Pressable
      style={[isActive ? styles.selectBtnActive : styles.selectBtn, style]}
      onPress={onPress}
    >
      <Text style={[isActive ? styles.selectActiveText : styles.selectText, styleText]}>
        {children}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  selectBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 36,
    borderRadius: theme.radius,
  },
  selectBtnActive: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 36,
    borderRadius: theme.radius,
    backgroundColor: theme.background,
  },
  selectText: {
    color: theme.mutedForeground,
  },
  selectActiveText: {
    color: theme.primary,
  },
})
