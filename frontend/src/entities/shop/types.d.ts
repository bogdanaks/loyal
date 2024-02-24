interface Shop {
  id: number
  type: ShopType
  type_id: number
  status_id: number
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

interface ShopType {
  id: number
  title: name
  created_at: string
  updated_at: string
}

interface ShopStatus {
  id: number
  title: name
  created_at: string
  updated_at: string
}

interface ShopClient {
  id: number
  user_id: number
  balance: number
  is_active: boolean
  created_at: string
  updated_at: string
}

interface WorkingHours {
  monday: WorkingTimeDay
  tuesday: WorkingTimeDay
  wednesday: WorkingTimeDay
  thursday: WorkingTimeDay
  friday: WorkingTimeDay
  saturday: WorkingTimeDay
  sunday: WorkingTimeDay
}

interface WorkingTimeDay {
  opening_time: string
  closing_time: string
  is_day_off: boolean
  breaks: WorkingTimeBreak[]
}

interface WorkingTimeBreak {
  from_time: string
  to_time: string
}
