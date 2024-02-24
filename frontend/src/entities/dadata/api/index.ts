import ky from "ky"

import { config } from "shared/config"

const dadataApi = ky.create({
  prefixUrl: "http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Token " + config.dadataToken,
  },
})

export const getAddressSuggestion = async (
  query: string
): Promise<{ suggestions: AddressSuggestions[] }> =>
  await dadataApi.post("", { json: { query } }).json()
