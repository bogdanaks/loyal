import { authApi } from "app/api/utils";

import { config } from "shared/config";

const api = authApi.extend({
  prefixUrl: config.apiUrl + "/biz",
});

export const getAccount = async (): Promise<BaseResponse<BusinessAccount>> =>
  await api.get("account").json();

export const updateAccount = async (
  data: Partial<BusinessAccount>
): Promise<BaseResponse<BusinessAccount>> => await api.patch("account", { json: data }).json();

export const updatePassword = async (data: UpdatePasswordData): Promise<BaseResponse<string>> =>
  await api.patch("account-password", { json: data }).json();
