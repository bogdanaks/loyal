import { EditUserForm } from "features/user/edit-user-form";

import { HeaderPage } from "shared/ui/header-page/header-page";

export const ProfileEditPage = () => {
  return (
    <div className="flex flex-col grow px-4 pt-2">
      <HeaderPage title="Личные данные" withBack />
      <EditUserForm />
    </div>
  );
};
