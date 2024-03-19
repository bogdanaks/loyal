interface Props {
  user: User;
}

export const UserRow = ({ user }: Props) => {
  return (
    <div className="flex flex-row gap-2">
      <img className="rounded-full w-12 h-12" src="/im.jpg" alt="Im" />
      <div className="flex flex-col">
        <span className="font-medium text-left">
          {user.first_name} {user.last_name?.substring(0, 1)}
        </span>
        <span className="text-muted-foreground text-left">{user.phone}</span>
      </div>
    </div>
  );
};
