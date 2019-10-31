import Vue from 'vue'
import AppContainer from './index.vue'
import '@/styles/index.scss'
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
Vue.use(ElementUI)
Vue.config.productionTip = false
import Cookie from 'js-cookie'
window.Cookie = Cookie

new Vue({
  render: h => h(AppContainer)
}).$mount('#app')
