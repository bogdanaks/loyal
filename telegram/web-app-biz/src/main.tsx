import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { TelegramProvider } from "processes";
import ReactDOM from "react-dom/client";

import "shared/styles/global.css";
import { Toaster } from "shared/ui/sonner.tsx";

import App from "./App.tsx";

dayjs.extend(customParseFormat);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <TelegramProvider>
      <div className="absolute top-0">
        <Toaster position="top-center" richColors theme="light" />
      </div>
      <App />
    </TelegramProvider>
  </QueryClientProvider>
);
