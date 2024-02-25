import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

import { UserRow } from "entities/user/ui"

import { Input } from "shared/ui/input"
import { ScrollArea } from "shared/ui/scroll-area"

const clients: User[] = [
  {
    id: 1,
    first_name: "Богдан",
    last_name: "Аксёнов",
    phone: "000000000000",
    email: "XXXXXXXXXXXX",
    created_at: "2022-01-01T00:00:00.000Z",
    updated_at: "2022-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    first_name: "Богдан",
    last_name: "Аксёнов",
    phone: "000000000000",
    email: "XXXXXXXXXXXX",
    created_at: "2022-01-01T00:00:00.000Z",
    updated_at: "2022-01-01T00:00:00.000Z",
  },
  {
    id: 3,
    first_name: "Богдан",
    last_name: "Аксёнов",
    phone: "000000000000",
    email: "XXXXXXXXXXXX",
    created_at: "2022-01-01T00:00:00.000Z",
    updated_at: "2022-01-01T00:00:00.000Z",
  },
  {
    id: 4,
    first_name: "Богдан",
    last_name: "Аксёнов",
    phone: "000000000000",
    email: "XXXXXXXXXXXX",
    created_at: "2022-01-01T00:00:00.000Z",
    updated_at: "2022-01-01T00:00:00.000Z",
  },
  {
    id: 5,
    first_name: "Богдан",
    last_name: "Аксёнов",
    phone: "000000000000",
    email: "XXXXXXXXXXXX",
    created_at: "2022-01-01T00:00:00.000Z",
    updated_at: "2022-01-01T00:00:00.000Z",
  },
  {
    id: 6,
    first_name: "Богдан",
    last_name: "Аксёнов",
    phone: "000000000000",
    email: "XXXXXXXXXXXX",
    created_at: "2022-01-01T00:00:00.000Z",
    updated_at: "2022-01-01T00:00:00.000Z",
  },
  {
    id: 7,
    first_name: "Богдан",
    last_name: "Аксёнов",
    phone: "000000000000",
    email: "XXXXXXXXXXXX",
    created_at: "2022-01-01T00:00:00.000Z",
    updated_at: "2022-01-01T00:00:00.000Z",
  },
  {
    id: 8,
    first_name: "Богдан",
    last_name: "Аксёнов",
    phone: "000000000000",
    email: "XXXXXXXXXXXX",
    created_at: "2022-01-01T00:00:00.000Z",
    updated_at: "2022-01-01T00:00:00.000Z",
  },
  {
    id: 9,
    first_name: "Богдан",
    last_name: "Аксёнов",
    phone: "000000000000",
    email: "XXXXXXXXXXXX",
    created_at: "2022-01-01T00:00:00.000Z",
    updated_at: "2022-01-01T00:00:00.000Z",
  },
  {
    id: 10,
    first_name: "Богдан",
    last_name: "Аксёнов",
    phone: "000000000000",
    email: "XXXXXXXXXXXX",
    created_at: "2022-01-01T00:00:00.000Z",
    updated_at: "2022-01-01T00:00:00.000Z",
  },
  {
    id: 11,
    first_name: "Богдан",
    last_name: "Аксёнов",
    phone: "000000000000",
    email: "XXXXXXXXXXXX",
    created_at: "2022-01-01T00:00:00.000Z",
    updated_at: "2022-01-01T00:00:00.000Z",
  },
  {
    id: 12,
    first_name: "Богдан",
    last_name: "Аксёнов",
    phone: "000000000000",
    email: "XXXXXXXXXXXX",
    created_at: "2022-01-01T00:00:00.000Z",
    updated_at: "2022-01-01T00:00:00.000Z",
  },
  {
    id: 13,
    first_name: "Богдан",
    last_name: "Аксёнов",
    phone: "000000000000",
    email: "XXXXXXXXXXXX",
    created_at: "2022-01-01T00:00:00.000Z",
    updated_at: "2022-01-01T00:00:00.000Z",
  },
  {
    id: 14,
    first_name: "Богдан",
    last_name: "Аксёнов",
    phone: "000000000000",
    email: "XXXXXXXXXXXX",
    created_at: "2022-01-01T00:00:00.000Z",
    updated_at: "2022-01-01T00:00:00.000Z",
  },
  {
    id: 15,
    first_name: "Богдан",
    last_name: "Аксёнов",
    phone: "000000000000",
    email: "XXXXXXXXXXXX",
    created_at: "2022-01-01T00:00:00.000Z",
    updated_at: "2022-01-01T00:00:00.000Z",
  },
]

export const ClientsList = () => {
  return (
    <div className="flex flex-col w-full h-full pt-2">
      <Input placeholder="Поиск" className="mb-4 rounded-3xl bg-primary-foreground border-none" />
      <ScrollArea className="h-full w-full">
        {clients.map((client) => (
          <Link
            to={`/clients/${client.id}`}
            className="flex flex-row gap-4 hover:bg-muted px-2 py-2 rounded-md delay-75"
            key={client.id}
          >
            <UserRow user={client} />
            <ChevronRight width={20} height={20} className="ml-auto h-full text-primary" />
          </Link>
        ))}
      </ScrollArea>
    </div>
  )
}
