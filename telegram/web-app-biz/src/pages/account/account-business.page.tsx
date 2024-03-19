import { EditBusiness } from "features/account";

import { Container } from "widgets/ui";
import { AnimationContainer } from "widgets/ui/animation-container";

export const AccountBusinessPage = () => {
  return (
    <AnimationContainer>
      <Container header={{ title: "Мой бизнес", withBack: true }}>
        <EditBusiness />
      </Container>
    </AnimationContainer>
  );
};
