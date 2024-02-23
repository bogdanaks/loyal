import { LayoutGroup } from "framer-motion";
import { Link } from "react-router-dom";

import { UserRow } from "entities/user/ui";

import CaretIcon from "shared/assets/icons/caret-right.svg?react";
import { Input } from "shared/ui/input";

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
];

export const ClientsList = () => {
  return (
    <div className="flex flex-col">
      <Input placeholder="Поиск" className="mb-4 rounded-3xl bg-primary-foreground border-none" />
      <LayoutGroup>
        <ul className="flex flex-col gap-6">
          {clients.map((client) => (
            <Link to={`/clients/${client.id}`} className="flex flex-row gap-4" key={client.id}>
              <UserRow user={client} />
              <CaretIcon width={20} height={20} className="ml-auto h-full fill-primary" />
            </Link>
          ))}
        </ul>
      </LayoutGroup>
    </div>
  );
};
