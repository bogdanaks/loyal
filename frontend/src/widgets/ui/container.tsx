import { ChevronLeft } from "lucide-react"
import React from "react"
import { useNavigate } from "react-router-dom"

import { cn } from "shared/libs/utils"

interface Props {
  title: string
  children: React.ReactNode
  className?: string
  withBack?: boolean
}

export const Container = ({ children, title, className, withBack = false }: Props) => {
  const navigate = useNavigate()

  return (
    <>
      <div className="min-h-12 flex items-center w-full px-4 text-3xl font-bold max-sm:bg-background max-sm:text-base max-sm:font-normal max-sm:justify-center">
        {withBack && (
          <ChevronLeft
            size={34}
            className="text-black cursor-pointer absolute left-2 sm:hidden"
            onClick={() => navigate(-1)}
          />
        )}
        <h1 className="flex items-center">{title}</h1>
      </div>
      <div className="p-4 flex h-fit overflow-hidden max-sm:p-0 max-sm:bg-muted max-sm:h-full">
        <div
          className={cn(
            "bg-background p-5 rounded-3xl flex h-full w-full max-sm:rounded-none max-sm:p-0 max-sm:px-4",
            className
          )}
        >
          {children}
        </div>
      </div>
    </>
  )
}
