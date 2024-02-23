import { Link } from "react-router-dom";

import { useBusinessStore } from "entities/business/model/store";

import CreditCardIcon from "shared/assets/icons/credit-card.svg?react";
import GearIcon from "shared/assets/icons/gear.svg?react";
import KaffeeIcon from "shared/assets/icons/kaffee.svg?react";
import QuestionIcon from "shared/assets/icons/question.svg?react";
import TicketIcon from "shared/assets/icons/ticket.svg?react";
import { Button } from "shared/ui/button";

import { Container } from "widgets/ui";

export const AccountPage = () => {
  const account = useBusinessStore((store) => store.account);
  return (
    <Container>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-3xl font-medium">Привет, {account?.name}!</h1>
        <Link to="/account/payment">
          <Button variant="link" className="rounded-full bg-primary-disabled w-12 h-12 p-2">
            <CreditCardIcon className="w-full h-full" />
          </Button>
        </Link>
      </div>
      <div className="gap-4 mt-10 grid grid-cols-2">
        <Link to="/account/business">
          <div className="aspect-square bg-primary-disabled rounded-xl p-4 px-6 flex flex-col items-center justify-between">
            <span className="w-full flex items-center justify-center">
              <KaffeeIcon className="w-[75%]" />
            </span>
            <span className="w-full flex items-center justify-center text-center">Мой бизнес</span>
          </div>
        </Link>
        <Link to="/account/loyal">
          <div className="aspect-square bg-primary-disabled rounded-xl p-4 px-6 flex flex-col items-center justify-between">
            <span className="w-full flex items-center justify-center">
              <TicketIcon className="w-[75%]" />
            </span>
            <span className="w-full flex items-center justify-center text-center">
              Программа лояльности
            </span>
          </div>
        </Link>
        <Link to="/account/settings">
          <div className="aspect-square bg-primary-disabled rounded-xl p-4 px-6 flex flex-col items-center justify-between">
            <span className="w-full flex items-center justify-center">
              <GearIcon className="w-[75%]" />
            </span>
            <span className="w-full flex items-center justify-center text-center">
              Настройки аккаунта
            </span>
          </div>
        </Link>
        <Link to="/account/help">
          <div className="aspect-square bg-primary-disabled rounded-xl p-4 px-6 flex flex-col items-center justify-between">
            <span className="w-full flex items-center justify-center">
              <QuestionIcon className="w-[75%]" />
            </span>
            <span className="w-full flex items-center justify-center text-center">Справка</span>
          </div>
        </Link>
      </div>
    </Container>
  );
};
