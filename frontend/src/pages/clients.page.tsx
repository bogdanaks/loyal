import { ClientsList } from "widgets/clients"
import { Container } from "widgets/ui/container"
import { Layout } from "widgets/ui/layout"

export const ClientsPage = () => {
  return (
    <Layout>
      <Container title="Клиенты" className="max-w-[900px]">
        <ClientsList />
      </Container>
    </Layout>
  )
}
