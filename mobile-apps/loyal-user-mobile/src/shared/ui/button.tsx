import { ComponentProps } from "react"
import { Pressable, PressableProps, StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import * as Progress from "react-native-progress"

import { useMyTheme } from "shared/hooks/use-my-theme"

interface Props
  extends ComponentProps<
    React.ForwardRefExoticComponent<PressableProps & React.RefAttributes<View>>
  > {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  isLoading?: boolean
}

export const Button = ({ children, style, isLoading, ...props }: Props) => {
  const { colors } = useMyTheme()
  return (
    <Pressable style={[styles.container, props.disabled && styles.disabled, style]} {...props}>
      <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
        {children}
      </View>
      {isLoading && (
        <Progress.Circle
          size={20}
          color={colors.input}
          indeterminate
          style={{ marginLeft: "auto" }}
        />
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: "auto",
    borderRadius: 6,
    backgroundColor: "rgb(37, 99, 235)",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  disabled: {
    opacity: 0.6,
  },
})
