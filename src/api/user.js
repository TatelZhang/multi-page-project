import request from '../utils/request'

export function login(data) {
  // return Promise.resolve({ token: 'asdasdasd' })
  return request({
    url: '/sys/login',
    data,
    method: 'post'
  })
}
