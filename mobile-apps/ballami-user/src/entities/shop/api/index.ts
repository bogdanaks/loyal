import { authApi } from "core/api/utils"

import { config } from "shared/config"

const api = authApi.extend({
  prefixUrl: config.apiUrl + "/shop-client",
})

export const getShopTypes = async (): Promise<BaseResponse<ShopType[]>> =>
  await api.get("type").json()

export const getMyShopsByType = async (type_id: number): Promise<BaseResponse<ShopClient[]>> =>
  await api.get("", { searchParams: { type_id } }).json()
