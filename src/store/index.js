import Vuex from "vuex"

const store = () => new Vuex.Store({
  state: {
    current_theme: null,
    current_size: null,
    current_bg_variant: null,
    current_piece_variant: null,
  },
})

export default store
