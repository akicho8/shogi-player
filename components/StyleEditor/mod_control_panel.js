import { GX } from "../models/gx.js"

export const mod_control_panel = {
  methods: {
    sidebar_toggle_handle() {
      this.sidebar_p = !this.sidebar_p
    },
    se_ws_image_input_handle(v) {
      this.se_ws_image = v
    },
    sp_board_image_input_handle(v) {
      this.sp_board_image = v
      this.sp_board_variant = "none" // 背景画像プリセットを選択してない状態に戻しておく
    },

    se_preset_apply_handle(se_preset_info) {
      se_preset_info.call(this)
    },

    se_board_size_preset_apply_handle(board_size_preset_info) {
      board_size_preset_info.func(this)
    },

    se_user_custom_css_preset_apply_handle(user_custom_css_preset_info) {
      this.user_custom_css_update_by(user_custom_css_preset_info.key)
    },

    user_custom_css_update_by(key) {
      const user_custom_css_preset_info = this.UserCustomCssPresetInfo.fetch(key)
      this.user_custom_css = user_custom_css_preset_info.user_custom_css.trim()
    },
  },

  computed: {
    slider_options() {
      return {
        indicator: true,
        tooltip: false,
        size: "is-small",
      }
    },
  },
}
