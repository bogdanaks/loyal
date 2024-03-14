import { theme } from "shared/config/theme"
import { Button } from "shared/ui/button"

interface Props {
  id: number
}

export const BlockClient = ({ id }: Props) => {
  return (
    <Button variant="outline" styleText={{ color: theme.destructive }}>
      Заблокировать
    </Button>
  )
}
