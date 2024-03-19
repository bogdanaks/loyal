import { EditLoyal } from "features/loyal/edit-loyal"

import { Container } from "widgets/ui/container"

export const LoyalPage = () => {
  return (
    <Container title="Программа лояльности" withBack className="max-w-[900px]">
      <EditLoyal />
    </Container>
  )
}
