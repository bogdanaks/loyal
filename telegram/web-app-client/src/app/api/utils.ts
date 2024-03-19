import { BeforeRequestHook } from "ky";

import { getAuthToken } from "shared/libs/ls";

export const beforeAuthRequest: BeforeRequestHook = (request) => {
  const header = request.headers.get("Authorization");
  if (!header?.startsWith("Basic")) {
    return request.headers.append("Authorization", `Bearer ${getAuthToken()}`);
  }
};
