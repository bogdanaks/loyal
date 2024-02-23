import { BusinessSettings } from "features/business"

import { Layout } from "widgets/ui/layout"

export const BusinessPage = () => {
  return (
    <Layout>
      <h1 className="min-h-12 flex items-center text-3xl font-bold px-4">Мой бизнес</h1>
      <BusinessSettings />
    </Layout>
  )
}
