import { ChevronLeft } from "lucide-react"
import React from "react"
import { useNavigate } from "react-router-dom"

import { cn } from "shared/libs/utils"
import { Spinner } from "shared/ui/spinner"

interface Props {
  title: string
  children: React.ReactNode
  className?: string
  withBack?: boolean
  isLoading?: boolean
}

export const Container = ({ children, title, className, withBack = false, isLoading }: Props) => {
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <div className="flex flex-col w-full h-full pt-2">
        <div className="flex flex-row items-center justify-center min-h-32">
          <Spinner />
        </div>
      </div>
    )
  }

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
            "bg-background p-5 rounded-3xl flex h-full w-full max-sm:rounded-none max-sm:p-0 max-sm:px-4 max-sm:overflow-y-auto",
            className
          )}
        >
          {children}
        </div>
      </div>
    </>
  )
}
