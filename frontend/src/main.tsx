import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AppWrapper } from "processes/app-wrapper.tsx"
import React from "react"
import ReactDOM from "react-dom/client"

import "shared/styles/global.css"

import App from "./App.tsx"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppWrapper>
        <App />
      </AppWrapper>
    </QueryClientProvider>
  </React.StrictMode>
)
