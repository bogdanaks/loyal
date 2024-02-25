import { ComponentProps } from "react"
import { Pressable, StyleSheet, View, PressableProps, StyleProp, ViewStyle } from "react-native"

interface Props
  extends ComponentProps<
    React.ForwardRefExoticComponent<PressableProps & React.RefAttributes<View>>
  > {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}

export const Button = ({ children, style, ...props }: Props) => {
  return (
    <Pressable style={[styles.container, style]} {...props}>
      <View>{children}</View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    padding: 10,
    width: "auto",
    borderRadius: 10,
    backgroundColor: "green",
  },
})
