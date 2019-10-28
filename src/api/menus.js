export function getMenu(path) {
  const menus = {
    system: [
      {
        name: '系统设置',
        components: 'Layout',
        path: '/configure',
        meta: { title: '系统设置' },
        children: [
          {
            name: '参数设置',
            component: '',
            meta: { title: '参数设置' }
          },
          {
            name: '组织机构代码维护',
            component: '',
            meta: { title: '组织机构代码维护' }
          }
        ]
      },
      {
        name: '权限管理',
        components: 'Layout',
        path: '/',
        meta: { title: '权限管理' },
        children: [
          {
            name: '角色管理',
            component: '',
            meta: { title: '角色管理' }
          },
          {
            name: '用户管理',
            component: '',
            meta: { title: '用户管理' }
          }
        ]
      }
    ]
  }
  return menus[path]
}

