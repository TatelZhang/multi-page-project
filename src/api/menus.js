export default {
  system: [
    {
      name: '系统设置',
      component: 'Layout',
      path: '/configure',
      meta: { title: '系统设置' },
      children: [
        {
          name: '参数设置',
          component: '/configure/parameter',
          path: 'parameter',
          meta: { title: '参数设置' }
        },
        {
          name: '组织机构代码维护',
          component: '/configure/organization',
          path: 'organization',
          meta: { title: '组织机构代码维护' }
        }
      ]
    },
    {
      name: '权限管理',
      component: 'Layout',
      path: '/management',
      meta: { title: '权限管理' },
      children: [
        {
          name: '接口权限管理',
          component: '/management/permission',
          path: 'permission',
          meta: { title: '接口权限管理' }
        },
        {
          name: '组织人员管理',
          component: '/management/people',
          path: 'people',
          meta: { title: '组织人员管理' }
        },
        {
          name: '角色管理',
          component: '/management/role',
          path: 'role',
          meta: { title: '角色管理' }
        },
        {
          name: '用户管理',
          component: '/management/user',
          path: 'user',
          meta: { title: '用户管理' }
        },
        {
          name: '菜单管理',
          component: '/management/menu',
          path: 'menu',
          meta: { title: '菜单管理' }
        }
      ]
    }
  ]
}
