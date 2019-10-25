import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)
import getters from './getters'
import user from '@/common_store/user'

const store = new vuex.Store({
  modules: {
    user
  },
  getters
})

export default store
