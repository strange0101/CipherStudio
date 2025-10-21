import Cookies from "js-cookie";

export const setToken = (token) => Cookies.set("cipherstudio_token", token);
export const getToken = () => Cookies.get("cipherstudio_token");
export const removeToken = () => Cookies.remove("cipherstudio_token");
