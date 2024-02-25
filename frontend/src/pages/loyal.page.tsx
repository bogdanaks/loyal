import { EditLoyal } from "features/loyal/edit-loyal"

import { Container } from "widgets/ui/container"
import { Layout } from "widgets/ui/layout"

export const LoyalPage = () => {
  return (
    <Layout>
      <Container title="Программа лояльности" withBack className="max-w-[900px]">
        <EditLoyal />
      </Container>
    </Layout>
  )
}
