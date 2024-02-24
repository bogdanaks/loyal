import { authApi } from "app/api/utils"

import { config } from "shared/config"

const api = authApi.extend({
  prefixUrl: config.apiUrl + "/help",
})

export const sendFeedback = async (message: string): Promise<BaseResponse<string>> =>
  await api.post("biz/feedback", { json: { message } }).json()
