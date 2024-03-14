import { Stack } from "expo-router"
import { SendFeedback } from "features/help"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"

import { theme } from "shared/config/theme"

export default function HelpPage() {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
        flexGrow: 1,
      }}
    >
      <Stack.Screen
        options={{
          title: "Помощь",
          headerTitleStyle: { color: theme.accentForeground },
          headerBackTitleVisible: false,
        }}
      />
      <SendFeedback />
    </KeyboardAwareScrollView>
  )
}
