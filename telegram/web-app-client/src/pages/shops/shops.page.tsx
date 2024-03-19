import { TitlePage } from "shared/ui";

import { ShopList } from "widgets/shops";
import { Container } from "widgets/ui";

export const ShopsPage = () => {
  return (
    <Container>
      <TitlePage>Мои заведения</TitlePage>
      <ShopList />
    </Container>
  );
};
