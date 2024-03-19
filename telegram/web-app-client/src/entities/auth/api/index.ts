import ky from "ky";

import { config } from "shared/config";

const api = ky.create({
  credentials: "include",
  prefixUrl: `${config.apiUrl}/auth`,
});

interface GetLoginCodeResponse {
  data: string;
}
export const getLoginCode = async (phone: string): Promise<GetLoginCodeResponse> =>
  await api.post("get-code", { json: { phone } }).json();

interface CheckLoginCodeResponse {
  data: string;
}
export const checkLoginCode = async (data: {
  otp: string;
  phone: string;
}): Promise<CheckLoginCodeResponse> => await api.post("check-code", { json: data }).json();

export const registerTelegram = async (
  data: Partial<User> & { initData: string }
): Promise<{ data: string }> => await api.post("register-telegram-user", { json: data }).json();

export const loginTelegram = async (data: string): Promise<{ data: string }> =>
  await api.post("login-telegram-user", { json: { initData: data } }).json();
