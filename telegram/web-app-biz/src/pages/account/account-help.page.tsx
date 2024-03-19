import { SendFeedback } from "features/account/send-feedback";
import { Link } from "react-router-dom";

import { config } from "shared/config";

import { Container, GridGroup } from "widgets/ui";
import { AnimationContainer } from "widgets/ui/animation-container";

export const AccountHelpPage = () => {
  return (
    <AnimationContainer>
      <Container header={{ title: "Информация и помощь", withBack: true }}>
        <div className="flex flex-col gap-4 pb-4">
          <GridGroup title="Информация о приложении">
            <div className="flex flex-col w-full gap-1 items-center justify-center">
              <img src="/empty.png" alt="Logo" width={80} height={80} />
              <p className="text-sm text-slate-600">Версия: {config.appVersion}</p>
            </div>
            <ul className="flex flex-col w-full gap-2">
              <Link
                className="w-full bg-muted p-2 rounded-xl text-blue-500 flex items-center justify-center"
                to="/user-agreement"
              >
                Пользовательское соглашение
              </Link>
              <Link
                className="w-full bg-muted p-2 rounded-xl text-blue-500 flex items-center justify-center"
                to="/privacy-policy"
              >
                Политика конфиденциальности
              </Link>
            </ul>
          </GridGroup>
          <GridGroup
            title="Помощь или отзыв"
            desc="Если вы столкнулись с проблемой или у Вас есть предложения по улучшению сервиса, напишите нам!"
          >
            <SendFeedback />
          </GridGroup>
        </div>
      </Container>
    </AnimationContainer>
  );
};
