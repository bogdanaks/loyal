import { authApi } from "app/api/utils";

import { config } from "shared/config";

const api = authApi.extend({
  prefixUrl: config.apiUrl + "/shop",
});

export const getMyShop = async (): Promise<BaseResponse<Shop>> => await api.get("my").json();
export const updateMyShop = async (data: FormData): Promise<BaseResponse<Shop>> =>
  await api.patch("my", { body: data }).json();

export const getShopTypes = async (): Promise<BaseResponse<ShopType[]>> =>
  await api.get("type").json();

export const checkQrCode = async (payload: string): Promise<BaseResponse<UserAsClient>> =>
  await api.get(`check-qr?payload=${payload}`).json();

export const updateClientBonus = async (data: UpdateClientBonus): Promise<BaseResponse<string>> =>
  await api.post("client-bonus", { json: data }).json();

export const getShopClient = async (user_id: number): Promise<BaseResponse<ShopClient>> =>
  await api.get("client", { searchParams: { user_id } }).json();
