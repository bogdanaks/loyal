import { Link } from "react-router-dom";

import { Button } from "shared/ui/button";

import { Container } from "widgets/ui";

export const AuthPage = () => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center grow">
        <h1 className="text-center mb-2 text-3xl">Войдите или зарегистриуйтесь</h1>
        <p className="text-center text-sm mb-6 text-slate-500">
          чтобы пользоваться функциями нашего приложения
        </p>
        <Link to="/login" className="w-full">
          <Button variant="default" className="mb-2 w-full">
            Войти
          </Button>
        </Link>
        <Link to="/register" className="w-full">
          <Button variant="outline" className="w-full">
            Зарегистрироваться
          </Button>
        </Link>
      </div>
    </Container>
  );
};
