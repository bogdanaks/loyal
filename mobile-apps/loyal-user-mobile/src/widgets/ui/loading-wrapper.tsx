import { View } from "react-native"
import * as Progress from "react-native-progress"

import { useMyTheme } from "shared/hooks/use-my-theme"

interface Props {
  isLoading: boolean
  children?: React.ReactNode
}

export const LoadingWrapper = ({ children, isLoading }: Props) => {
  const { colors } = useMyTheme()

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Progress.Circle size={50} color={colors.primary} indeterminate />
      </View>
    )
  }

  return children
}
