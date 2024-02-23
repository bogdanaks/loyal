import ky from "ky";

import { beforeAuthRequest } from "app/api/utils";

import { config } from "shared/config";

const api = ky.create({
  credentials: "include",
  prefixUrl: `${config.apiUrl}/user`,
  hooks: { beforeRequest: [beforeAuthRequest] },
});

export const getMe = async (): Promise<{ data: User }> => await api.get("me").json();

export const updateUser = async (data: Partial<User>) => await api.patch("", { json: data }).json();
export const uploadUserPhoto = async (data: FormData) =>
  await api.patch("photo", { body: data }).json();
