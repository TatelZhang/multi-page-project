import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
  mode: 'hash',
  scrollBehavior: (to, from, position) => {
    return position && position.y ? { x: position.x, y: position.y } : { y: 0 }
  },
  routes: []
})

export default router
