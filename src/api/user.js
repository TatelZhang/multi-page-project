import request from '../utils/request'

export function login(data) {
  return request({
    url: '',
    data,
    method: 'post'
  })
}

export function getMenus(app) {
  return request({
    url: '',
    method: 'GET'
  }).then(res => {}).catch(() => {})
}

export function getInfo() {
  return request({
    url: 'auth/info',
    method: 'get'
  })
}
