import { EditLoyal } from "features/loyal/edit-loyal"

import { Layout } from "widgets/ui/layout"

export const LoyalPage = () => {
  return (
    <Layout>
      <h1 className="min-h-12 flex items-center text-3xl font-bold px-4">Программа лояльности</h1>
      <EditLoyal />
    </Layout>
  )
}
