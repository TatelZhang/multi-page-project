import Vue from 'vue'
import AppMain from '@/AppMain'
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
Vue.use(ElementUI)
import router from './router'
import store from './store'
import '@/styles/index.scss'
Vue.config.productionTip = false
new Vue({
  render: h => h(AppMain),
  router,
  store
}).$mount('#app')
