import { GX } from "../models/gx.js"

export const mod_control_panel = {
  methods: {
    tfx_slider_attrs(value) {
      return { ...this.slider_attrs, disabled: value }
    },

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

    se_preset_apply_handle(preset_info) {
      preset_info.func(this)
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
    slider_attrs() {
      return {
        indicator: true,
        tooltip: false,
        size: "is-small",
      }
    },

    tf_wall_slider_attrs() { return this.tfx_slider_attrs(this.se_tf_wall_mode === "is_tf_wall_mode_off") },
    tf_board_slider_attrs() { return this.tfx_slider_attrs(this.se_tf_board_mode === "is_tf_board_mode_off") },
    tf_piece_slider_attrs() { return this.tfx_slider_attrs(this.se_tf_piece_mode === "is_tf_piece_mode_off") },
  },
}
