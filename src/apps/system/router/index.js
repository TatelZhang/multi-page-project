import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import { getToken, loginRedirect } from '@/utils/auth'
import { constantRouterMap, solveAsyncRouter } from './router'
import { getMenus } from '@/api/user'
import store from '../store/index'
const router = new Router({
  mode: 'hash',
  scrollBehavior: (to, from, position) => {
    return position && position.y ? { x: position.x, y: position.y } : { y: 0 }
  },
  routes: constantRouterMap
})

router.beforeEach((next, to, from) => {
  if (!getToken()) { // 未登录
    // loginRedirect()
  } else {
    if (!store.getters.hasMenu) { // 未获取目录
      loadMenus(next, to)
    } else {
      next()
    }
  }
})

export default router

export const loadMenus = (next, to) => {
  getMenus().then(res => {
    const asyncRouter = solveAsyncRouter(res)
    asyncRouter.push({ path: '*', redirect: '/404', hidden: true })
    store.dispatch('')
    // store.dispatch('GenerateRoutes', asyncRouter).then(() => { // 存储路由
    //   router.addRoutes(asyncRouter) // 动态添加可访问路由表
    //   next({ ...to, replace: true })// hack方法 确保addRoutes已完成
    // })
  })
}
