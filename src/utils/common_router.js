export const solveAsyncRouterByApp = (loadViewMethod) => {
  const solveRouter = (routers, sup_path = '') => { // 根据返回router列表 进行异步引入组件 // isSubMenu: 判断是否为子目录
    const accessedRouters = routers.filter(router => {
      const { component } = router
      if (router.children && router.children.length) { // 添加子目录
        const path = router.path || ''
        const routerPath = `${sup_path}${path}` // 当前嵌套根节点路由路径
        router.children = solveRouter(router.children, routerPath)
        console.log(router.children)
        router.redirect = `${routerPath}/${router.children[0].path}`
        router.component = { render: h => h('router-view') }
      } else {
        if (component) {
          router.component = loadViewMethod(component)
        }
      }
      return true
    })
    return accessedRouters
  }
  return solveRouter
}
