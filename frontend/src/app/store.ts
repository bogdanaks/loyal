import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type AppType = "telegram" | "web"

interface AccountState {
  type: AppType
  setType: (type: AppType) => void
}

export const useAppStore = create<AccountState>()(
  persist(
    (set) => ({
      type: "web",
      setType: (type) => set({ type }),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
