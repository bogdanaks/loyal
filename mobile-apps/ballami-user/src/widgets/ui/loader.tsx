import { View } from "react-native"
import * as Progress from "react-native-progress"

import { theme } from "shared/config/theme"

interface Props {
  size?: number
}

export const Loader = ({ size = 50 }: Props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Progress.Circle size={size} color={theme.primary} indeterminate />
    </View>
  )
}
