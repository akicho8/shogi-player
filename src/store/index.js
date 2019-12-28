import Vuex from "vuex"

// ここで Vue.use(Vuex) すると利用する側と干渉するので注意

const store = () => new Vuex.Store({
  state: {
    current_flip: false,                // 反転したか？
    current_vlayout: false,             // 縦レイアウト
    current_debug_mode: false,
    current_theme: null,
    current_size: null,
    current_bg_variant: null,
    current_piece_variant: null,
  },
  mutations: {
    // this.$store.commit("flip_toggle") として呼び出す
    flip_toggle(state) {
      state.current_flip = !state.current_flip
    },

    // this.$store.commit("current_debug_mode_set", true)
    current_debug_mode_set(state, payload) {
      state.current_debug_mode = payload
      // ここで呼び出しても意味ない。効き目なし。
      this.$emit("update:debug_mode", payload)
    },
  },
})

export default store