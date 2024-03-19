import EmptyIcon from "shared/assets/icons/empty.svg?react"

export const EmptyData = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center min-h-20">
      <EmptyIcon />
      <span className="mt-2 text-muted-foreground">Пусто</span>
    </div>
  )
}
