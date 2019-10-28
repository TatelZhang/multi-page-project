import Layout from '@/AppMain'
/**
 * hidden: true, 不会在侧边目录中显示
 *
 */

export const constantRouterMap = [
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
  return () => import(`@/apps/views${view}`)
}

