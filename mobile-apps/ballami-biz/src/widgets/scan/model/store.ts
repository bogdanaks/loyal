import { create } from "zustand"

export interface SuccessPaymentData {
  is_new: boolean
  is_accrual: boolean
  check_amount: number
  bonus_points: number
  point_amount?: number
  user_id: number
  client_id: number
}

interface ScanState {
  balance: number
  userAsClient: UserAsClient | null
  successPaymentData: SuccessPaymentData | null
  setBalance: (balance: number) => void
  setUserAsClient: (userAsClient: UserAsClient | null) => void
  setSuccessPaymentData: (successPaymentData: SuccessPaymentData | null) => void
}

export const useScanStore = create<ScanState>()((set) => ({
  balance: 0,
  userAsClient: null,
  successPaymentData: null,
  setBalance: (balance) => set({ balance }),
  setUserAsClient: (userAsClient) => set({ userAsClient }),
  setSuccessPaymentData: (successPaymentData) => set({ successPaymentData }),
}))
