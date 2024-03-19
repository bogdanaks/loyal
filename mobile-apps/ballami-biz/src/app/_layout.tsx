import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Stack } from "expo-router"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { KeyboardProvider } from "react-native-keyboard-controller"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Toast from "react-native-toast-message"

const queryClient = new QueryClient()

export default function RootLayout() {
  const { top } = useSafeAreaInsets()

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <QueryClientProvider client={queryClient}>
          <BottomSheetModalProvider>
            <Stack>
              <Stack.Screen name="(app)" options={{ headerShown: false }} />
            </Stack>
            <Toast topOffset={top} />
          </BottomSheetModalProvider>
        </QueryClientProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  )
}
