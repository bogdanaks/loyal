import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ShopState {
  shop: Shop | null;
  setShop: (shop: Shop) => void;
}

export const useShopStore = create<ShopState>()(
  persist(
    (set) => ({
      shop: null,
      setShop: (shop: Shop) => set({ shop }),
    }),
    {
      name: "shop-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
