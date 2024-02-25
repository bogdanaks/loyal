import { BusinessSettings } from "features/business"

import { Container } from "widgets/ui/container"
import { Layout } from "widgets/ui/layout"

export const BusinessPage = () => {
  return (
    <Layout>
      <Container title="Мой бизнес" withBack className="max-w-[900px]">
        <BusinessSettings />
      </Container>
    </Layout>
  )
}
