import Cookies from 'js-cookie'
import config from '../config'

const { tokenKey } = config
export const getToken = () => Cookies.get(tokenKey)

export const setToken = (token, rememberMe) => {
  if (!token) return
  return rememberMe ? Cookies.set(tokenKey, token, { expires: config.tokenCookieExpires })
    : Cookies.set(tokenKey, token)
}

export const removeToken = () => Cookies.remove(tokenKey)

export const loginRedirect = to => { // 未登录带当前路由参数跳转至登录页面
  const pathname = location.pathname
  // console.log(`/login?redirect=${pathname}#${to.fullPath}`)
  // hash 模式
  location.href = `/login?redirect=${pathname}#${to.fullPath}`
}

export const goRedirect = () => { // 登录后跳转至目标页面
  const { search, hash } = location
  let target = '/system'
  if (search) {
    target = search.replace(/\?redirect=/i, '') + hash
  }
  location.href = target
}

export const logoutFromThisPage = () => {
  const { hash, pathname } = location
  location.href = `/login?redirect=${pathname}${hash}`
}
