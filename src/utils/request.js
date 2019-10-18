import axios from 'axios'
import config from '../config'
import { getToken, remeoveToken } from '../utils/auth'
import { Notification, MessageBox } from 'element-ui'
const service = axios.create({
  baseURL: config.baseURL,
  timeout: config.timeout
})

service.interceptors.request.use(
  req => {
    const token = getToken()
    if (token) req.headers['Authorization'] = 'Bearer ' + token
    req.headers['Content-Type'] = 'application/json'
    return req
  }
)

service.interceptors.response.use(
  res => {
    const { status } = res
    if (status < 200 || status > 300) {
      Notification.error({
        title: res.message
      })
      return Promise.reject('error')
    }
    return res.data
  },
  error => {
    let status = 500
    try {
      status = error.response.status
    } catch {
      if (error.toString().indexOf('Error: timeout') !== -1) {
        Notification.error({
          title: '网络请求超时',
          duration: 2500
        })
      }
      if (error.toString().indexOf('Error: Network Error') !== -1) {
        Notification.error({
          title: '网络请求错误',
          duration: 2500
        })
      }
      return Promise.reject(error)
    }
    if (status === 401) { // 登陆过期
      remeoveToken()
      MessageBox.confirm(
        '登陆状态已过期, 您可以继续留在该页面, 或者重新登陆',
        '系统提示',
        {
          confirmButtonText: '重新登陆',
          cancelButtonText: '取消',
          type: 'warning'
        }.then(() => {
          location.href = '/'
        })
      )
    }
    return Promise.error('error')
  }
)

export default service
