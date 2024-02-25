import { SendFeedback } from "features/help/send-feedback"
import { Link } from "react-router-dom"

import { config } from "shared/config"

import { Container } from "widgets/ui/container"
import { Layout } from "widgets/ui/layout"

export const HelpPage = () => {
  return (
    <Layout>
      <Container title="Помощь" withBack className="max-w-[900px]">
        <div className="flex flex-col w-full">
          <SendFeedback />
          <div className="flex flex-col w-full gap-1 items-center justify-center mt-20">
            <img src="/empty.png" alt="Logo" width={80} height={80} />
            <p className="text-sm text-slate-600">Версия: {config.appVersion}</p>
          </div>
          <ul className="flex flex-col w-full gap-2 mt-8">
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
        </div>
      </Container>
    </Layout>
  )
}
