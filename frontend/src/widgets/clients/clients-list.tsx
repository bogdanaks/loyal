import { useQuery } from "@tanstack/react-query"
import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

import { getShopClients } from "entities/shop/api"
import { UserRow } from "entities/user/ui"

import { Input } from "shared/ui/input"
import { ScrollArea } from "shared/ui/scroll-area"
import { Spinner } from "shared/ui/spinner"

export const ClientsList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["client"],
    queryFn: getShopClients,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })

  return (
    <div className="flex flex-col w-full h-full pt-2">
      <Input placeholder="Поиск" className="mb-4 rounded-3xl bg-primary-foreground border-none" />
      {isLoading && (
        <div className="flex flex-row items-center justify-center min-h-32">
          <Spinner />
        </div>
      )}
      {!isLoading && data && (
        <ScrollArea className="h-full w-full">
          {data?.data.map((client) => (
            <Link
              to={`/clients/${client.id}`}
              className="flex flex-row gap-4 hover:bg-muted px-2 py-2 rounded-md delay-75"
              key={client.id}
            >
              <UserRow user={client.user} />
              <ChevronRight width={20} height={20} className="ml-auto h-full text-primary" />
            </Link>
          ))}
        </ScrollArea>
      )}
    </div>
  )
}
