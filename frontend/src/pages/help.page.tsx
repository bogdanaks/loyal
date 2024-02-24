import { SendFeedback } from "features/help/send-feedback"
import { Link } from "react-router-dom"

import { config } from "shared/config"

import { Layout } from "widgets/ui/layout"

export const HelpPage = () => {
  return (
    <Layout>
      <h1 className="min-h-12 flex items-center text-3xl font-bold px-4">Помощь</h1>
      <div className="p-4">
        <div className="bg-background p-5 rounded-3xl flex flex-col">
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
      </div>
    </Layout>
  )
}
