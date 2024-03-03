import { UserPhoto } from "."

interface Props {
  user: User
}

export const UserRow = ({ user }: Props) => {
  return (
    <div className="flex flex-row gap-2">
      <UserPhoto src={user.photo} className="max-w-12 max-h-12" />
      <div className="flex flex-col">
        <span className="font-medium text-left">
          {user.first_name} {user.last_name?.substring(0, 1)}
        </span>
        <span className="text-muted-foreground text-left">{user.phone}</span>
      </div>
    </div>
  )
}
