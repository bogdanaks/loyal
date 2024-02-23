import { Button } from "shared/ui/button";

import { Container, GridGroup } from "widgets/ui";
import { AnimationContainer } from "widgets/ui/animation-container";

export const AccountPaymentPage = () => {
  return (
    <AnimationContainer>
      <Container header={{ title: "Оплата", withBack: true }}>
        <GridGroup title="Информация">
          <h2>Ваш аккаунт оплачен до: 2023-12-12</h2>
          <h3>Тариф: 999р в месяц</h3>
          <Button>Продлить подписку</Button>
        </GridGroup>
      </Container>
    </AnimationContainer>
  );
};
