import { authApi } from "core/api/utils"

import { config } from "shared/config"

const api = authApi.extend({
  prefixUrl: config.apiUrl + "/loyal",
})

export const getLoyalTypes = async (): Promise<BaseResponse<LoyalType[]>> =>
  await api.get("type").json()

export const getMyLoyalProgram = async (): Promise<BaseResponse<LoyalProgram>> =>
  await api.get("my").json()

export const updateLoyal = async (data: LoyalData): Promise<BaseResponse<string>> =>
  await api.patch("", { json: data }).json()
