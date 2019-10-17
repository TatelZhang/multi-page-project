import Vue from 'vue'
import AppContainer from './index.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(AppContainer)
}).$mount('#app')
