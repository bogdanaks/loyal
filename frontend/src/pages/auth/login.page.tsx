import { LoginForm } from "features/auth"
import { Link } from "react-router-dom"

import { Card, CardContent, CardHeader, CardTitle } from "shared/ui/card"

export const LoginPage = () => {
  return (
    <div className="flex items-center justify-center grow">
      <Card className="w-full max-w-[400px]">
        <CardHeader>
          <CardTitle>Войти в аккаунт</CardTitle>
        </CardHeader>
        <CardContent>
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
