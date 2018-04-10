import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    flip: false,                   // 反転したか？
  },
  mutations: {
    flip_toggle(state) {
      state.flip = !state.flip
    },
  },
})

export default store
