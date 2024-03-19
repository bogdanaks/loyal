export const saveAuthToken = (value: string) => {
  window.localStorage.setItem("authTokenBiz", value);
};

export const getAuthToken = () => {
  return window.localStorage.getItem("authTokenBiz");
};

export const removeAuthToken = () => {
  window.localStorage.removeItem("authTokenBiz");
};
