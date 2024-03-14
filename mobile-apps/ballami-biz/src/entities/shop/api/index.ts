import { authApi } from "core/api/utils"

import { config } from "shared/config"

const api = authApi.extend({
  prefixUrl: config.apiUrl + "/shop-biz",
})

export const getMyShop = async (): Promise<BaseResponse<Shop>> => await api.get("my").json()

export const updateShop = async (data: Partial<Shop>): Promise<BaseResponse<Shop>> =>
  await api.patch("", { json: data }).json()

export const uploadShopAvatar = async (data: FormData): Promise<BaseResponse<Shop>> =>
  await api.post("shop-avatar", { body: data }).json()

export const uploadShopBanner = async (data: FormData): Promise<BaseResponse<Shop>> =>
  await api.post("banner", { body: data }).json()

export const deleteShopPhoto = async (id: string): Promise<BaseResponse<Shop>> =>
  await api.delete(`photos?id=${id}`).json()

export const getShopTypes = async (): Promise<BaseResponse<ShopType[]>> =>
  await api.get("type").json()

export const getShopStatuses = async (): Promise<BaseResponse<ShopStatus[]>> =>
  await api.get("status").json()

export const checkQrCode = async (payload: string): Promise<BaseResponse<UserAsClient>> =>
  await api.get(`check-qr?payload=${payload}`).json()

export const checkPhone = async (payload: string): Promise<BaseResponse<UserAsClient>> =>
  await api.get(`check-phone?payload=${payload}`).json()

export const updateClientBonusPlus = async (
  data: UpdateClientBonusPlus
): Promise<BaseResponse<string>> => await api.post("client-bonus/plus", { json: data }).json()

export const updateClientBonusMinus = async (
  data: UpdateClientBonusMinus
): Promise<BaseResponse<string>> => await api.post("client-bonus/minus", { json: data }).json()

export const getShopClients = async (): Promise<BaseResponse<ShopClient[]>> =>
  await api.get("client").json()

export const getShopClient = async (client_id: number): Promise<BaseResponse<ShopClient>> =>
  await api.get(`client/${client_id}`).json()

export const getShopClientPurchases = async (client_id: number): Promise<BaseResponse<number>> =>
  await api.get(`client-purchases/${client_id}`).json()
