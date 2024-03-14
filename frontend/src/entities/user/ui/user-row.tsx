import { useMemo } from "react"
import { IMask } from "react-imask"

import { UserPhoto } from "."

interface Props {
  user: User
}

const phoneMask = IMask.createMask({
  mask: "+{7} (000) 000-00-00",
})

export const UserRow = ({ user }: Props) => {
  const phone = useMemo(() => {
    phoneMask.resolve(user.phone)
    return phoneMask.value
  }, [user])

  return (
    <div className="flex flex-row gap-2">
      <UserPhoto src={user.photo} className="max-w-12 max-h-12" />
      <div className="flex flex-col">
        <span className="font-medium text-left">
          {user.first_name} {user.last_name?.substring(0, 1)}
        </span>
        <span className="text-muted-foreground text-left">{phone}</span>
      </div>
    </div>
  )
}
