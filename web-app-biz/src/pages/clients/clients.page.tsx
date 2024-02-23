import { TitlePage } from "shared/ui";

import { ClientsList } from "widgets/clients";
import { Container } from "widgets/ui";

export const ClientsPage = () => {
  return (
    <Container>
      <TitlePage>Мои клиенты</TitlePage>
      <ClientsList />
    </Container>
  );
};
