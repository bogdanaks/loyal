import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface AccountState {
  account: Account | null
  setAccount: (account: Account | null) => void
}

export const useAccountStore = create<AccountState>()(
  persist(
    (set) => ({
      account: null,
      setAccount: (account) => set({ account }),
    }),
    {
      name: "account-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
