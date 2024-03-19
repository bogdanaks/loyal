import { create } from "zustand"

interface ShopState {
  client: UserAsClient | null
  setClient: (client: UserAsClient | null) => void
}

export const useScanClientStore = create<ShopState>((set) => ({
  client: null,
  setClient: (client) => set({ client }),
}))
