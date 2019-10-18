import Cookies from 'js-cookie'
import config from '../config'
const { tokenKey } = config
export const getToken = () => Cookies.get(tokenKey)

export const setToken = (token, rememberMe) => {
  return rememberMe ? Cookies.set(tokenKey, token, { expires: config.tokenCookieExpires })
    : Cookies.set(tokenKey, token)
}

export const remeoveToken = () => Cookies.remove(tokenKey)