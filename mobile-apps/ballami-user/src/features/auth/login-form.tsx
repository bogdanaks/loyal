import { useState } from "react"

import { LoginFormGetCode } from "./login-form-get-code"
import { LoginFormWriteCode } from "./login-form-write-code"
import { RegisterForm } from "./register-form"

type ViewForm = "get-code" | "write-code" | "register"

export const LoginForm = () => {
  const [phone, setPhone] = useState<string>("")
  const [view, setView] = useState<ViewForm>("get-code")

  if (view === "get-code") {
    return (
      <LoginFormGetCode
        onSuccess={(phone) => {
          setPhone(phone)
          setView("write-code")
        }}
      />
    )
  }

  if (view === "write-code") {
    return (
      <LoginFormWriteCode
        phone={phone}
        onChangePhone={() => setView("get-code")}
        onRegister={() => setView("register")}
      />
    )
  }

  return <RegisterForm phone={phone} />
}
