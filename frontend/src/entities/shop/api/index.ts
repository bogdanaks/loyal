import { authApi } from "app/api/utils"

import { config } from "shared/config"

const api = authApi.extend({
  prefixUrl: config.apiUrl + "/shop-biz",
})

export const getMyShop = async (): Promise<BaseResponse<Shop>> => await api.get("my").json()

export const updateShop = async (data: Partial<Shop>): Promise<BaseResponse<Shop>> =>
  await api.patch("", { json: data }).json()

export const uploadShopPhoto = async (data: FormData): Promise<BaseResponse<Shop>> =>
  await api.post("photos", { body: data }).json()

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

export const updateClientBonus = async (data: UpdateClientBonus): Promise<BaseResponse<string>> =>
  await api.post("client-bonus", { json: data }).json()

export const getShopClients = async (): Promise<BaseResponse<ShopClient[]>> =>
  await api.get("client").json()

export const getShopClient = async (user_id: number): Promise<BaseResponse<ShopClient>> =>
  await api.get(`client/${user_id}`).json()
