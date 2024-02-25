import { ComponentProps } from "react"
import { StyleSheet, TextInput } from "react-native"

export const Input = ({ style, ...props }: ComponentProps<typeof TextInput>) => {
  return <TextInput style={[styles.input, style]} {...props} />
}

const styles = StyleSheet.create({
  input: {
    width: "auto",
    height: "auto",
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: "white",
  },
})
