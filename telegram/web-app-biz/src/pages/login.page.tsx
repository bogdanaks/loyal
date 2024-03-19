import { LoginForm } from "features/auth";

import { Container } from "widgets/ui";

export const LoginPage = () => {
  return (
    <Container>
      <div className="flex flex-col h-full items-center justify-center grow">
        <h1 className="text-left mb-10 text-4xl w-full font-medium">Вход</h1>
        <LoginForm />
      </div>
    </Container>
  );
};
