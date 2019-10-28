import request from '../utils/request'

export function login(data) {
  return Promise.resolve({ token: 'asdasdasd' })

  return request({
    url: '',
    data,
    method: 'post'
  })
}

export function getMenus(app) {
  return Promise.resolve()
  return request({
    url: '',
    method: 'GET'
  }).then(res => {}).catch(() => {})
}

