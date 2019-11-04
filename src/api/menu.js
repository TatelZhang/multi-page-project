// import request from '../utils/request'
import menus from './menus.js'

// ----------------------------------------------------------菜单api-----------------------------------------------------------
// 获取查询所有的菜单
export function getMenus(app) {
  return Promise.resolve(menus[app])
  // return request({
  //   url: '',
  //   method: 'GET'
  // }).then(res => {}).catch(() => {})
}
