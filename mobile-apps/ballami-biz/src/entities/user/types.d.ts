interface User {
  id: number
  tg_user_id?: number
  tg_username?: string
  birthday?: string
  phone: string
  photo?: string
  first_name: string
  last_name?: string
  email: string
  created_at: string
  updated_at: string
}

interface UserAsClient extends User {
  client?: ShopClient
}
