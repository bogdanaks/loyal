import { PropsWithChildren, useEffect } from "react";

export const TelegramProdvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    Telegram.WebApp.expand();
    Telegram.WebApp.enableClosingConfirmation();
  }, []);
  return <>{children}</>;
};
