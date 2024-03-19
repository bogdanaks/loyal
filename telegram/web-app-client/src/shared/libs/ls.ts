export const saveAuthToken = (value: string) => {
  window.localStorage.setItem("authTokenUser", value);
};

export const getAuthToken = () => {
  return window.localStorage.getItem("authTokenUser");
};

export const removeAuthToken = () => {
  window.localStorage.removeItem("authTokenUser");
};
