import { ClientsList } from "widgets/clients"
import { Container } from "widgets/ui/container"

export const ClientsPage = () => {
  return (
    <Container title="Клиенты" className="max-w-[900px]">
      <ClientsList />
    </Container>
  )
}
