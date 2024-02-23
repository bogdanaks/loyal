interface UpdateClientBonus {
  user_id: number
  check_amount: number
  point_amount: number
  is_accrual: boolean
}

interface UpdateShopData {
  title: string
  type_id: number
  status_id: number
  short_description: string
  description: string
}
