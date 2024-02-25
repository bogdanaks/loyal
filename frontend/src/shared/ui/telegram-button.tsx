import { useEffect } from "react"

import { Button, ButtonProps } from "./button"

interface Props extends ButtonProps {
  children: React.ReactNode
  text?: string
}

export const TelegramButton = ({ children, text, ...props }: Props) => {
  useEffect(() => {
    Telegram.WebApp.MainButton.text = text ?? ""
    Telegram.WebApp.MainButton.show()
    if (props.onClick) {
      Telegram.WebApp.MainButton.onClick(props.onClick as () => void)
    }

    return () => {
      Telegram.WebApp.MainButton.hide()
      Telegram.WebApp.MainButton.offClick(props.onClick as () => void)
    }
  }, [])

  useEffect(() => {
    if (props.disabled) {
      Telegram.WebApp.MainButton.disable()
      Telegram.WebApp.MainButton.setParams({
        color: "rgb(191, 211, 254)",
        text_color: "rgb(111, 151, 236)",
      })
    } else {
      Telegram.WebApp.MainButton.enable()
      Telegram.WebApp.MainButton.setParams({
        color: "rgb(37, 99, 235)",
        text_color: "#fff",
      })
    }
  }, [props.disabled])

  if (Telegram.WebApp.initData?.length) {
    return null
  }

  return <Button {...props}>{children}</Button>
}
