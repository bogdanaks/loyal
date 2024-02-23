import { EditLoyal } from "features/account";

import { Container } from "widgets/ui";
import { AnimationContainer } from "widgets/ui/animation-container";

export const AccountLoyalPage = () => {
  return (
    <AnimationContainer>
      <Container header={{ title: "Программа лояльности", withBack: true }}>
        <EditLoyal />
      </Container>
    </AnimationContainer>
  );
};
