import { RegisterForm } from "features/auth"
import { Link } from "react-router-dom"

import { Card, CardContent, CardHeader, CardTitle } from "shared/ui/card"

export const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center grow">
      <Card className="flex flex-col items-center justify-center max-w-[400px] w-full max-sm:max-w-[100vw] max-sm:h-[100vh]">
        <CardHeader className="w-full">
          <CardTitle>Зарегистрировать аккаунт</CardTitle>
        </CardHeader>
        <CardContent className="w-full max-sm:px-4">
          <RegisterForm />
          <p className="w-full text-center mt-4 text-sm">
            Уже зарегистрированы?{" "}
            <Link to="/login" className="text-primary">
              Войти
            </Link>
          </p>
          <p className="w-full text-sm text-center mt-4">
            Нажимая кнопку “Зарегистрироваться”, вы принимаете условия{" "}
            <Link to="/privacy-policy" className="text-primary">
              Политики конфиденциальности
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
