import { AccountSettings } from "features/account/account-settings"

import { Container } from "widgets/ui/container"

export const AccountSettingsPage = () => {
  return (
    <Container title="Аккаунт" withBack className="max-w-[900px]">
      <AccountSettings />
    </Container>
  )
}
