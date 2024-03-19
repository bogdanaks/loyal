import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { TelegramProdvider } from "processes/telegram-prodvider.tsx";
import ReactDOM from "react-dom/client";

import "shared/styles/global.css";

import App from "./App.tsx";

dayjs.extend(customParseFormat);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <TelegramProdvider>
      <App />
    </TelegramProdvider>
  </QueryClientProvider>
);
