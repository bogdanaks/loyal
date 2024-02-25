import ky, { AfterResponseHook, BeforeRequestHook } from "ky"

import { config } from "shared/config"
import { getAuthToken } from "shared/libs/ls"

export const beforeAuthRequest: BeforeRequestHook = (request) => {
  const header = request.headers.get("Authorization")
  if (!header?.startsWith("Basic")) {
    return request.headers.set("Authorization", `Bearer ${getAuthToken()}`)
  }
}

export const afterResponseHook: AfterResponseHook = async (_request, _options, response) => {
  if (response.status === 401) {
    location.replace("/login?next=" + encodeURIComponent(location.pathname))
  } else if (!response.ok) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    response.payload = await response.json()
    throw response
  }
}

export const publicApi = ky.create({
  credentials: "include",
  prefixUrl: `${config.apiUrl}/`,
  hooks: {
    afterResponse: [afterResponseHook],
  },
})

export const authApi = ky.create({
  credentials: "include",
  prefixUrl: `${config.apiUrl}/`,
  hooks: {
    beforeRequest: [beforeAuthRequest],
    afterResponse: [afterResponseHook],
  },
})
