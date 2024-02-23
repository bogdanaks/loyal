interface LoyalType {
  id: number;
  title: string;
  icon: string;
  created_at: string;
  updated_at: string;
}

interface LoyalProgram {
  id: number;
  shop_id: number;
  loyal_type_id: number;
  percent_bonus: number;
  reg_bonus: number;
  created_at: string;
  updated_at: string;
}

interface LoyalData {
  type: number;
  percent_bonus: number;
  reg_bonus: number;
}
