import { create } from "zustand"

interface ShopState {
  shop: Shop | null
  setShop: (shop: Shop) => void
}

export const useShopStore = create<ShopState>()((set) => ({
  shop: null,
  setShop: (shop: Shop) => set({ shop }),
}))
