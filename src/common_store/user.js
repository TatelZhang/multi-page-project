import { getToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    userInfo: {},
    // 第一次加载菜单时用到
    loadMenus: false,
    menus: []
  },
  getters: {
    roles: state => state.roles,
    loadMenus: state => state.loadMenus,
    hasMenu: state => state.menus.length > 0
  },

  mutations: {
    SET_UserInfo: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_LOAD_MENUS: (state, loadMenus) => {
      state.loadMenus = loadMenus
    }
  },

  actions: {
    initUserData({ commit }) { // 初始化用户信息
      const userInfoStr = localStorage.getItem('userInfo')
      if (userInfoStr) {
        const userInfo = JSON.parse(userInfoStr)
        commit('SET_UserInfo', userInfo)
      }
    }
  }
}

export default user
