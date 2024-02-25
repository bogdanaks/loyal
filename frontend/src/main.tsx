import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AppWrapper } from "processes/app-wrapper.tsx"
import { TelegramProvider } from "processes/telegram-provider.tsx"
import React from "react"
import ReactDOM from "react-dom/client"

import "shared/styles/global.css"

import App from "./App.tsx"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TelegramProvider>
        <AppWrapper>
          <App />
        </AppWrapper>
      </TelegramProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
