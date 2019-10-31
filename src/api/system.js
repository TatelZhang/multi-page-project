import request from '../utils/request'

// ----------------------------------------------------------菜单api-----------------------------------------------------------
// 获取查询所有的菜单
export function getMenus(params) {
  return request({
    url: 'api/menus',
    method: 'get',
    params
  })
}

// 获取路由菜单
export function getRouterMenus(params) {
  return request({
    url: 'api/menus/build',
    method: 'get',
    params
  })
}

// 新增
export function addMenus(data) {
  return request({
    url: 'api/menus',
    method: 'post',
    data
  })
}

// 删除菜单
export function delMenus(id) {
  return request({
    url: 'api/menus/' + id,
    method: 'delete'
  })
}

// 编辑菜单
export function editMenus(data) {
  return request({
    url: 'api/menus',
    method: 'put',
    data
  })
}

// 获取所有的菜单树
export function getMenusTree() {
  return request({
    url: 'api/menus/tree',
    method: 'get'
  })
}

export function buildMenus() {
  return request({
    url: 'api/menus/build',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: 'api/menus',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/menus/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/menus',
    method: 'put',
    data
  })
}
