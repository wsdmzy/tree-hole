import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import userModule from './module/user'

export default new Vuex.Store({
  state: {
    showNavbar: true
  },
  mutations: {
    isShow_Navbar(state, ishow) {
      state.showNavbar = ishow
    }
  },
  actions: {
    show({commit}, ishow) {
      commit('isShow_Navbar',ishow)
    }
  },
  modules: {
    userModule
  }
})
