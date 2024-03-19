import React from "react"

import { Spinner } from "shared/ui/spinner"

interface Props {
  isLoading: boolean
  children: React.ReactNode
}

export const LoaderBox = ({ isLoading, children }: Props) => {
  if (isLoading) {
    return (
      <div className="flex flex-row items-center min-h-32">
        <Spinner />
      </div>
    )
  }
  return children
}
