import { publicApi } from "app/api/utils"

import { config } from "shared/config"

const api = publicApi.extend({
  prefixUrl: config.apiUrl + "/auth",
})

export const accountRegister = async (data: RegisterData): Promise<BaseResponse<string>> =>
  await api.post("account-register", { json: data }).json()

export const accountLogin = async (data: LoginData): Promise<BaseResponse<string>> =>
  await api.post("account-login", { json: data }).json()
