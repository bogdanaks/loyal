import { EditAccount } from "features/account";

import { Container } from "widgets/ui";
import { AnimationContainer } from "widgets/ui/animation-container";

export const AccountSettingsPage = () => {
  return (
    <AnimationContainer>
      <Container header={{ title: "Настройки аккаунта", withBack: true }}>
        <EditAccount />
      </Container>
    </AnimationContainer>
  );
};
