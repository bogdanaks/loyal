import { BusinessSettings } from "features/business"

import { Container } from "widgets/ui/container"

export const BusinessPage = () => {
  return (
    <Container title="Мой бизнес" withBack className="max-w-[900px]">
      <BusinessSettings />
    </Container>
  )
}
