import { ComponentProps } from "react"
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import * as Progress from "react-native-progress"

import { theme } from "shared/config/theme"

interface Props
  extends ComponentProps<
    React.ForwardRefExoticComponent<PressableProps & React.RefAttributes<View>>
  > {
  children: React.ReactNode
  variant?: "primary" | "outline"
  style?: StyleProp<ViewStyle>
  styleText?: StyleProp<TextStyle>
  isLoading?: boolean
}

export const Button = ({
  children,
  style,
  styleText,
  isLoading,
  variant = "primary",
  ...props
}: Props) => {
  return (
    <Pressable
      style={[styles.container, props.disabled && styles.disabled, styles[`btn${variant}`], style]}
      {...props}
    >
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        {typeof children === "string" ? (
          <Text style={[styles[`text${variant}`], styleText]}>{children}</Text>
        ) : (
          children
        )}
      </View>
      {isLoading && (
        <Progress.Circle
          size={20}
          color={theme.input}
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
    borderRadius: theme.radius,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  disabled: {
    opacity: 0.6,
  },
  btnprimary: {
    backgroundColor: "rgb(37, 99, 235)",
  },
  btnoutline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: theme.input,
  },
  textprimary: {
    color: theme.background,
  },
  textoutline: {
    color: theme.accentForeground,
  },
})
