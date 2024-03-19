import ky from "ky";

import { beforeAuthRequest } from "app/api/utils";

import { config } from "shared/config";

const api = ky.create({
  credentials: "include",
  prefixUrl: `${config.apiUrl}/help`,
  hooks: { beforeRequest: [beforeAuthRequest] },
});

export const sendFeedback = async (message: string): Promise<BaseResponse<string>> =>
  await api.post("feedback", { json: { message } }).json();
