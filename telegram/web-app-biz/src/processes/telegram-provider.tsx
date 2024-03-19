import { PropsWithChildren, useEffect } from "react";

export const TelegramProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    Telegram.WebApp.expand();
    Telegram.WebApp.enableClosingConfirmation();
  }, []);
  return <>{children}</>;
};
