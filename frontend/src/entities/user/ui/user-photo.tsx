import { config } from "shared/config"
import { cn } from "shared/libs/utils"

interface Props {
  src?: string
  className?: string
}

export const UserPhoto = ({ src, className }: Props) => {
  return (
    <div
      className={cn(
        "rounded-full overflow-hidden h-24 w-24 max-sm:h-16 max-sm:w-16 max-sm:max-h-16 max-sm:max-w-16",
        className
      )}
    >
      <img
        src={src ? `${config.apiDomain}/static/${src}` : "/empty.png"}
        alt={src ?? "client-photo"}
        className="w-full h-auto"
      />
    </div>
  )
}
