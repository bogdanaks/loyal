import { PropsWithChildren, useEffect } from "react"

export const TelegramProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    if (Telegram.WebApp.initData?.length) {
      Telegram.WebApp.expand()
      Telegram.WebApp.enableClosingConfirmation()
    }
  }, [])

  return <>{children}</>
}
