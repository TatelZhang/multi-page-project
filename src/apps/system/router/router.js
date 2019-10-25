import Layout from '@/AppMain'
/**
 * hidden: true, 不会在侧边目录中显示
 *
 */

export const constantRouterMap = [
  { path: '/login',
    meta: { title: '登录', noCache: true },
    component: () => import('@/views/login/index'),
    // component: Login,
    hidden: true
  },
  {
    path: '/test',
    component: () => import('@/views/test.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/403',
    component: () => import('@/views/errorPage/403'),
    hidden: true
  },
  {
    path: '/redirect',
    component: () => import('@/views/Layout/index'),
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/',
    component: () => import('@/views/Layout/index'),
    redirect: '/home',
    hidden: true,
    children: [
      {
        path: 'home',
        name: '首页',
        meta: { title: '首页', icon: 'el-icon-evi-shouye', affix: true },
        component: () => import('@/views/pages/home/home_info')
      }
    ]
  }
]

export const solveAsyncRouter = (routers, isSubMenu) => { // 根据返回router列表 进行异步引入组件 // isSubMenu: 判断是否为子目录
  const accessedRouters = routers.filter(router => {
    const { component } = router
    if (component) { // 存在组件路径
      if (router.component === 'Layout') { // Layout组件特殊处理
        router.component = Layout
      } else {
        router.component = loadView(component)
      }
    }
    if (router.children && router.children.length) { // 添加子目录
      router.children = solveAsyncRouter(router.children, true)
    }
    if (!isSubMenu) {
      if (!router.children || !router.children.length) { // 第一级目录, 不显示为下拉
        const { meta } = router
        router.children = [
          {
            path: '',
            component: router.component,
            meta,
            name: meta.name
          }
        ]
        router.component = Layout
        router.isMenuItem = true // 在最外层目录, 且可点击
      }
    }
    return true
  })
  return accessedRouters
}
export const loadView = (view) => { // 路由懒加载
  return () => import(`@/views/pages${view}`)
}

