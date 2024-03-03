interface Shop {
  id: number
  type: ShopType
  type_id: number
  status_id: number
  loyal_program: LoyalProgram
  loyal_program_id: number
  title: name
  short_description: name
  description: name
  working_hours: WorkingHours
  photo: string
  banners: Record<string, string>
  phone: string
  address: string
  created_at: string
  updated_at: string
}

interface LoyalProgram {
  id: number
  shop_id: number
  loyal_type_id: number
  percent_bonus: number
  reg_bonus: number
  created_at: string
  updated_at: string
}

interface ShopType {
  id: number
  title: string
  created_at: string
  updated_at: string
}

interface ShopClient {
  id: number
  user_id: number
  shop: Shop
  balance: number
  is_active: boolean
  created_at: string
  updated_at: string
}

interface WorkingHours {
  common: WorkingTimeWithDays
  by_days: {
    [day: string]: WorkingTimeDay
  }
}

interface WorkingTimeWithDays extends WorkingTimeDay {
  days: string[]
}

interface WorkingTimeDay {
  opening_time: string
  closing_time: string
  breaks_time_from: string
  breaks_time_to: string
}
