import { PropsWithChildren } from "react"
import { Toaster } from "sonner"

export const AppWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col min-h-[100vh]">
      {children}
      <Toaster theme="light" richColors />
    </div>
  )
}
