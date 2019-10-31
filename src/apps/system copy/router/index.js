import Vue from 'vue'
import Router from 'vue-router'
import { getToken, loginRedirect } from '@/utils/auth'
// import { constantRouterMap, solveAsyncRouter } from './router'
import store from '../store/index'
import { getMenus } from '@/api/user'

const originalPush = Router.prototype.push // vue-router重复点击报错修复
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)
const router = new Router({
  mode: 'hash',
  scrollBehavior: (to, from, position) => {
    return position && position.y ? { x: position.x, y: position.y } : { y: 0 }
  },
  routes: [
    { path: '/',
      redirect: '/configure' }
  ]
})

router.beforeEach((to, from, next) => {
  console.log('before each', to)
  if (!getToken()) { // 未登录
    loginRedirect(to)
  } else {
    if (!store.getters.hasMenu) { // 未获取目录
      loadMenus(to, next)
    } else {
      next()
    }
  }
})

export const loadMenus = (to, next) => {
  getMenus('system').then(res => {
    const asyncRouter = solveAsyncRouter(res)
    // asyncRouter.push({ path: '*', redirect: '/404', hidden: true })
    store.dispatch('initMenu', res).then(() => {
      router.addRoutes(asyncRouter)
      next({ ...to, replace: true })
    })
  })
}

export const loadView = (view) => { // 路由懒加载
  return () => import(`@/apps/system/views${view}`)
}

export const solveAsyncRouter = (routers, sup_path = '') => { // 根据返回router列表 进行异步引入组件 // isSubMenu: 判断是否为子目录
  const accessedRouters = routers.filter(router => {
    const { component } = router
    if (router.children && router.children.length) { // 添加子目录
      const path = router.path || ''
      const routerPath = `${sup_path}${path}` // 当前嵌套根节点路由路径
      router.children = solveAsyncRouter(router.children, routerPath)
      router.redirect = `${routerPath}/${router.children[0].path}`
      router.component = { render: h => h('router-view') }
    } else {
      if (component) {
        router.component = loadView(component)
      }
    }
    return true
  })
  return accessedRouters
}

export default router
