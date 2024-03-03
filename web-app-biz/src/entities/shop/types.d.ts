interface Shop {
  id: number;
  title: string;
  short_description: string;
  description: string;
  working_hours: WorkingHours;
  photo: string;
  banners: string[];
  type: ShopType;
  type_id: number;
  status: 0 | 1 | 2;
  created_at: string;
  updated_at: string;
}

interface ShopType {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
}

interface ShopClient {
  id: number;
  user_id: number;
  balance: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface WorkingHours {
  common: WorkingTimeWithDays;
  by_days: {
    [day: string]: WorkingTimeDay;
  };
}

interface WorkingTimeWithDays extends WorkingTimeDay {
  days: string[];
}

interface WorkingTimeDay {
  opening_time: string;
  closing_time: string;
  breaks_time_from: string;
  breaks_time_to: string;
}
