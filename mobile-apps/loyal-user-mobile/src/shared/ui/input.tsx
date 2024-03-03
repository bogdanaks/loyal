import { ComponentProps } from "react"
import { StyleSheet, TextInput, View } from "react-native"
import * as Progress from "react-native-progress"

import { useMyTheme } from "shared/hooks/use-my-theme"

interface Props extends ComponentProps<typeof TextInput> {
  isLoading?: boolean
  disabled?: boolean
}

export const Input = ({ style, isLoading, disabled = false, ...props }: Props) => {
  const { colors } = useMyTheme()
  return (
    <View
      style={[styles.container, { borderColor: colors.input }, disabled && styles.disabled, style]}
    >
      <TextInput
        style={styles.input}
        editable={!disabled}
        selectTextOnFocus={!disabled}
        {...props}
      />
      {isLoading && (
        <Progress.Circle
          size={20}
          color={colors.primary}
          indeterminate
          style={{ paddingRight: 10 }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "auto",
    height: "auto",
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    position: "relative",
  },
  input: {
    width: "100%",
    height: "100%",
    padding: 10,
  },
  disabled: {
    opacity: 0.5,
  },
})
