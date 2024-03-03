import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import "react-native-gesture-handler"
import Toast from "react-native-toast-message"

import AppIndex from "./src/index"

dayjs.extend(customParseFormat)

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppIndex />
      <Toast />
    </QueryClientProvider>
  )
}
