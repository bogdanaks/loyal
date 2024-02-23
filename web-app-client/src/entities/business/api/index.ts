import ky from "ky";

import { beforeAuthRequest } from "app/api/utils";

import { config } from "shared/config";

const api = ky.create({
  credentials: "include",
  prefixUrl: `${config.apiUrl}/biz`,
  hooks: { beforeRequest: [beforeAuthRequest] },
});

export const getBusinessTypes = async (): Promise<BaseResponse<BusinessType[]>> =>
  await api.get("type").json();

export const getAccount = async (): Promise<{ data: BusinessAccount }> =>
  await api.get("account").json();
