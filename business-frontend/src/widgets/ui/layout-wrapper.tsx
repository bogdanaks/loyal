import { Outlet } from "react-router-dom"

import { Sidebar } from "./sidebar"

export const LayoutWrapper = () => {
  return (
    <div className="flex flex-row grow relative">
      <Sidebar />
      <div className="p-4 w-full max-h-[100vh] flex flex-col overflow-hidden max-sm:p-0 max-sm:max-h-[calc(100vh-3.5rem)]">
        <Outlet />
      </div>
    </div>
  )
}
