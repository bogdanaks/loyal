import { ClientsList } from "widgets/clients"
import { Layout } from "widgets/ui/layout"

export const ClientsPage = () => {
  return (
    <Layout>
      <h1 className="min-h-12 flex items-center text-3xl font-bold px-4">Клиенты</h1>
      <div className="p-4 flex h-full overflow-hidden">
        <div className="bg-background p-5 rounded-3xl flex w-full h-full">
          <ClientsList />
        </div>
      </div>
    </Layout>
  )
}
