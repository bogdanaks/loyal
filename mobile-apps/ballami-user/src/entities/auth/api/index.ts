import { publicApi } from "core/api/utils"

import { config } from "shared/config"

const api = publicApi.extend({
  prefixUrl: config.apiUrl + "/auth",
})

export const getLoginCode = async (phone: string): Promise<GetLoginCodeResponse> =>
  await api.post("get-code", { json: { phone } }).json()

export const checkLoginCode = async (data: {
  otp: string
  phone: string
}): Promise<CheckLoginCodeResponse> => await api.post("check-code", { json: data }).json()

export const login = async (data: LoginData): Promise<LoginResponse> =>
  await api.post("login-user", { json: data }).json()

export const register = async (data: RegisterData): Promise<LoginResponse> =>
  await api.post("register-user", { json: data }).json()
