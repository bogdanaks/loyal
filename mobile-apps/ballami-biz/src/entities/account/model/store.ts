import { create } from "zustand"

interface AccountState {
  account: Account | null
  setAccount: (account: Account | null) => void
}

export const useAccountStore = create<AccountState>()((set) => ({
  account: null,
  setAccount: (account) => set({ account }),
}))
