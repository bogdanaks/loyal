import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "date-time-format-timezone"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import { Slot } from "expo-router"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { KeyboardProvider } from "react-native-keyboard-controller"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Toast from "react-native-toast-message"

import { theme } from "shared/config/theme"

dayjs.extend(customParseFormat)
dayjs.extend(timezone)
dayjs.extend(utc)

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.primary,
    background: theme.background,
    text: theme.slate600,
  },
}

const queryClient = new QueryClient()

export default function RootLayout() {
  const { top } = useSafeAreaInsets()

  return (
    <ThemeProvider value={MyTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardProvider>
          <QueryClientProvider client={queryClient}>
            <BottomSheetModalProvider>
              <Slot />
              <Toast topOffset={top} />
            </BottomSheetModalProvider>
          </QueryClientProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  )
}
