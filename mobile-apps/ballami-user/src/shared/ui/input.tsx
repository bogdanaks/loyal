import { ComponentProps } from "react"
import { StyleSheet, TextInput, View } from "react-native"
import * as Progress from "react-native-progress"

import { theme } from "shared/config/theme"

interface Props extends ComponentProps<typeof TextInput> {
  isLoading?: boolean
  disabled?: boolean
  postfix?: React.ReactNode
}

export const Input = ({ style, isLoading, disabled = false, postfix, ...props }: Props) => {
  return (
    <View style={[styles.container, disabled && styles.disabled, style]}>
      <TextInput
        style={styles.input}
        editable={!disabled}
        selectTextOnFocus={!disabled}
        {...props}
      />
      {postfix && postfix}
      {isLoading && (
        <Progress.Circle size={20} color={theme.primary} indeterminate style={styles.loader} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexBasis: "auto",
    borderColor: theme.input,
    width: "auto",
    height: 40,
    borderWidth: 1,
    borderRadius: theme.radius,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    position: "relative",
  },
  input: {
    flex: 1,
    width: "100%",
    height: "100%",
    paddingHorizontal: 10,
    textAlignVertical: "center",
  },
  disabled: {
    opacity: 0.5,
    backgroundColor: theme.muted,
  },
  loader: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 10,
  },
})
