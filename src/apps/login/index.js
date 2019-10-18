import Vue from 'vue'
import AppContainer from './index.vue'
import '@/styles/index.scss'
import 'normalize.css'
Vue.config.productionTip = false

new Vue({
  render: h => h(AppContainer)
}).$mount('#app')
