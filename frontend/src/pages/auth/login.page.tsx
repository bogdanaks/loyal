import { LoginForm } from "features/auth"
import { Link } from "react-router-dom"

import { Card, CardContent, CardHeader, CardTitle } from "shared/ui/card"

export const LoginPage = () => {
  return (
    <div className="flex items-center justify-center grow">
      <Card className="flex flex-col items-center justify-center max-w-[400px] w-full max-sm:max-w-[100vw] max-sm:h-[100vh]">
        <CardHeader className="w-full">
          <CardTitle>Войти в аккаунт</CardTitle>
        </CardHeader>
        <CardContent className="w-full max-sm:px-4">
          <LoginForm />
          <p className="w-full text-center mt-4 text-sm">
            Нет аккаунта?{" "}
            <Link to="/register" className="text-primary">
              Зарегистрироваться
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
