import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginState:+localStorage.getItem('loginState')||0
  },
  mutations: {
    islogin(state){
      state.loginState = 1
    },
    nologin(state){
      state.loginState = 0
    }
  },
  actions: {
  },
  modules: {
  }
})
