import { PropsWithChildren } from "react"

import { Sidebar } from "./sidebar"

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-row grow relative">
      <Sidebar />
      <div className="p-4 w-full max-h-[100vh] flex flex-col overflow-hidden">{children}</div>
    </div>
  )
}
