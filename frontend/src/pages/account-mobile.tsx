import { Link } from "react-router-dom"

import { useAccountStore } from "entities/account/model/store"

import CreditCardIcon from "shared/assets/icons/credit-card.svg?react"
import GearIcon from "shared/assets/icons/gear.svg?react"
import KaffeeIcon from "shared/assets/icons/kaffee.svg?react"
import QuestionIcon from "shared/assets/icons/question.svg?react"
import TicketIcon from "shared/assets/icons/ticket.svg?react"

import { Layout } from "widgets/ui"

export const AccountMobile = () => {
  const account = useAccountStore((state) => state.account)

  return (
    <Layout>
      <div className="p-5">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-3xl font-medium">
            Привет{`${account ? `, ${account?.name}` : ""}`}!
          </h1>
          <Link to="/pay">
            <CreditCardIcon width={40} />
          </Link>
        </div>
        <div className="gap-4 mt-8 grid grid-cols-2">
          <Link to="/business">
            <div className="aspect-square bg-background rounded-xl p-4 px-6 flex flex-col items-center justify-between">
              <span className="w-full flex items-center justify-center">
                <KaffeeIcon className="w-[75%]" />
              </span>
              <span className="w-full flex items-center justify-center text-center">
                Мой бизнес
              </span>
            </div>
          </Link>
          <Link to="/loyal">
            <div className="aspect-square bg-background rounded-xl p-4 px-6 flex flex-col items-center justify-between h-full w-full">
              <span className="w-full flex items-center justify-center">
                <TicketIcon className="w-[75%]" />
              </span>
              <span className="w-full flex items-center justify-center text-center">
                Программа лояльности
              </span>
            </div>
          </Link>
          <Link to="/account-settings">
            <div className="aspect-square bg-background rounded-xl p-4 px-6 flex flex-col items-center justify-between h-full w-full">
              <span className="w-full flex items-center justify-center">
                <GearIcon className="w-[75%]" />
              </span>
              <span className="w-full flex items-center justify-center text-center">
                Настройки аккаунта
              </span>
            </div>
          </Link>
          <Link to="/help">
            <div className="aspect-square bg-background rounded-xl p-4 px-6 flex flex-col items-center justify-between h-full w-full">
              <span className="w-full flex items-center justify-center">
                <QuestionIcon className="w-[75%]" />
              </span>
              <span className="w-full flex items-center justify-center text-center">Справка</span>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  )
}
