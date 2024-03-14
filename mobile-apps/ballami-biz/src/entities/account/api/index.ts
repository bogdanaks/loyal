import { authApi } from "core/api/utils"

import { config } from "shared/config"

const api = authApi.extend({
  prefixUrl: config.apiUrl + "/account",
})

export const getAccount = async (): Promise<BaseResponse<Account>> => await api.get("").json()

export const updateAccount = async (data: Partial<Account>): Promise<BaseResponse<Account>> =>
  await api.patch("", { json: data }).json()

export const updatePassword = async (data: UpdatePasswordData): Promise<BaseResponse<string>> =>
  await api.patch("password", { json: data }).json()
