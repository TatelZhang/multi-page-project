import request from '../utils/request'
import menus from './menus.js'

export function login(data) {
  // return Promise.resolve({ token: 'asdasdasd' })
  return request({
    url: '/sys/login',
    data,
    method: 'post'
  })
}

export function getMenus(app) {
  return Promise.resolve(menus[app])
  return request({
    url: '',
    method: 'GET'
  }).then(res => {}).catch(() => {})
}

