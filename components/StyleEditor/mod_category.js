import { GX } from "../models/gx.js"

export const mod_category = {
  methods: {
    // ショートカット用
    // a(v-scroll-to="AppContext.v_scroll_to_params(e)")
    v_scroll_to_params(e) {
      return {
        element: `#${e.key}`,
        ...this.scroll_to_base_options,
        onDone: this.category_jumped_fn,
      }
    },

    // 飛んだときに呼ばれるので、最後に飛んだカテゴリを記憶する
    category_jumped_fn(elem) {
      this.last_selected_category_key = elem.id
    },

    // 最後に飛んだカテゴリがあればそこに飛ぶ
    category_jump_to_last_selected() {
      if (this.last_selected_category_key) {
        this.$scrollTo(`#${this.last_selected_category_key}`, 0, this.scroll_to_base_options)
      }
    },
  },
  computed: {
    // 共通のオプション
    scroll_to_base_options() {
      return {
        container: ".sidebar-content",
        offset: -16,
      }
    },
  },
}
