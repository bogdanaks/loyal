import { publicApi } from "app/api/utils";

import { config } from "shared/config";

const api = publicApi.extend({
  prefixUrl: config.apiUrl + "/auth",
});

export interface RegisterData {
  biz_type: number;
  biz_name: string;
  name: string;
  phone: string;
  email: string;
  password: string;
}

export const registerBiz = async (data: RegisterData): Promise<BaseResponse<string>> =>
  await api.post("register-biz", { json: data }).json();

export interface LoginData {
  email: string;
  password: string;
}
export const loginBiz = async (data: LoginData): Promise<BaseResponse<string>> => {
  try {
    return await api.post("login-biz", { json: data }).json();
  } catch (err: unknown) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const serverMessage: ServerError = await err.response.json();
    throw serverMessage;
  }
};
