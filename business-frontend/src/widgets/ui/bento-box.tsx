import { HTMLAttributes } from "react"

import { cn } from "shared/libs/utils"

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string
  children: React.ReactNode
}

export const BentoBox = ({ title, children, className, ...props }: Props) => {
  return (
    <div className={cn("bg-background p-5 pb-6 rounded-3xl h-fit", className)} {...props}>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      {children}
    </div>
  )
}
