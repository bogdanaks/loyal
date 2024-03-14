import { authApi } from "core/api/utils"

import { config } from "shared/config"

const api = authApi.extend({
  prefixUrl: config.apiUrl + "/user",
})

export const getMe = async (): Promise<{ data: User }> => await api.get("me").json()

export const updateUser = async (data: Partial<User>) => await api.patch("", { json: data }).json()
export const uploadUserPhoto = async (data: FormData) =>
  await api.patch("photo", { body: data }).json()