import { AccountSettings } from "features/account/account-settings"

import { Layout } from "widgets/ui/layout"

export const AccountSettingsPage = () => {
  return (
    <Layout>
      <h1 className="min-h-12 flex items-center text-3xl font-bold px-4">Аккаунт</h1>
      <AccountSettings />
    </Layout>
  )
}
