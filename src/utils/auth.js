import Cookies from 'js-cookie'
import config from '../config'
const { tokenKey } = config
export const getToken = () => Cookies.get(tokenKey)

export const setToken = (token, rememberMe) => {
  if (!token) return
  return rememberMe ? Cookies.set(tokenKey, token, { expires: config.tokenCookieExpires })
    : Cookies.set(tokenKey, token)
}

export const remeoveToken = () => Cookies.remove(tokenKey)

export const loginRedirect = to => { // 带路由参数跳转至登录页面
  const pathname = location.pathname
  location.href = `/login?redirect=${pathname}${to.fullPath}`
}

export const goRedirect = () => { // 登录后跳转至目标页面
  const { search } = location
  let target = '/system'
  if (search) {
    target = search.replace(/\?redirect=/i, '')
  }
  location.href = target
}

export function removeToken() {
  return Cookies.remove(tokenKey)
}
