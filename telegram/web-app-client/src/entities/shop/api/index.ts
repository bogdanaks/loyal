import ky from "ky";

import { beforeAuthRequest } from "app/api/utils";

import { config } from "shared/config";

const api = ky.create({
  credentials: "include",
  prefixUrl: `${config.apiUrl}/shop`,
  hooks: { beforeRequest: [beforeAuthRequest] },
});

export const getShopTypes = async (): Promise<BaseResponse<ShopType[]>> =>
  await api.get("type").json();
