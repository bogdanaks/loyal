import { RegisterForm } from "features/auth";

export const RegisterPage = () => {
  return (
    <div className="flex flex-col px-4 pt-5 pb-5">
      <div className="flex flex-col h-full items-center justify-center">
        <RegisterForm />
      </div>
    </div>
  );
};
