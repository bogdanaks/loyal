export const saveAuthToken = (value: string) => {
  window.localStorage.setItem("authToken", value)
}

export const getAuthToken = () => {
  return window.localStorage.getItem("authToken")
}

export const removeAuthToken = () => {
  window.localStorage.removeItem("authToken")
}
