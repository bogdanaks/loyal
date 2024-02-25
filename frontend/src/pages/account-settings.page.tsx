import { AccountSettings } from "features/account/account-settings"

import { Container } from "widgets/ui/container"
import { Layout } from "widgets/ui/layout"

export const AccountSettingsPage = () => {
  return (
    <Layout>
      <Container title="Аккаунт" withBack className="max-w-[900px]">
        <AccountSettings />
      </Container>
    </Layout>
  )
}
