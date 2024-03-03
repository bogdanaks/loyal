interface User {
  id: number
  birthday: string
  phone: string
  first_name: string
  tg_user_id: number | null
  tg_username: string | null
  photo?: string
  last_name: string | null
  email: string | null
  created_at: Date
  updated_at: Date
}
