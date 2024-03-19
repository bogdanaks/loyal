import { SignTelegram } from "features/auth/sign-telegram/sign-telegram";

export const LoginPage = () => {
  return (
    <div className="flex flex-col px-5 items-center justify-center min-h-[100svh]">
      <div className="flex flex-col h-full items-center justify-center grow">
        <h1 className="text-center mb-4 text-4xl w-full font-medium">Вход</h1>
        <SignTelegram />
      </div>
    </div>
  );
};
