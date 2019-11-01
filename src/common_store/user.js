import { getToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    userInfo: {},
    // 第一次加载菜单时用到
    menus: []
  },
  getters: {
    roles: state => state.roles,
    hasMenu: state => state.menus.length > 0,
    sideMenus: state => state.menus,
    userName: state => state.userInfo.realname
  },

  mutations: {
    SET_UserInfo: (state, userInfo) => {
      // console.log('userinfo', userInfo)
      state.userInfo = userInfo
    },
    SET_Menus: (state, menus) => {
      state.menus = menus
    }
  },

  actions: {
    initUserData({ commit }) { // 初始化用户信息
      const userInfoStr = localStorage.getItem('userInfo')
      if (userInfoStr) {
        const userInfo = JSON.parse(userInfoStr)
        commit('SET_UserInfo', userInfo)
      }
    },
    initMenu({ commit }, menus) { // 获取目录
      commit('SET_Menus', menus)
    }
  }
}

export default user
