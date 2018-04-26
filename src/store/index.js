import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

// "() => " を外すとブラウザ内でグローバルになる
const store = () => new Vuex.Store({
  state: {
    flip: false,                // 反転したか？
    inside_debug_mode: false,
    current_theme: null,
  },
  mutations: {
    // this.$store.commit("flip_toggle") として呼び出す
    flip_toggle(state) {
      state.flip = !state.flip
    },

    // this.$store.commit("inside_debug_mode_set", true)
    inside_debug_mode_set(state, payload) {
      state.inside_debug_mode = payload
      // ここで呼び出しても意味ない。効き目なし。
      // this.$emit("update:debug_mode", payload)
    },
  },
})

export default store
