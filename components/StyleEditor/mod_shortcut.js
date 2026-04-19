import { KeyboardHelper } from "../models/keyboard_helper.js"

export const mod_shortcut = {
  methods: {
    shortcut_hook(e) {
      // if (KeyboardHelper.modifier_p(e)) {
      //   return
      // }

      if (this.sp_mode !== "edit") {
        if (e.code === "Space") {
          this.sidebar_toggle_handle()
          return true
        }
      }

      if (KeyboardHelper.pure_enter_p(e) || e.code === "Escape" || e.key === "/") {
        this.sidebar_toggle_handle()
        return true
      }

      // if (e.code === "ArrowRight") {
      //   this.$refs.sp_object.api_turn_add(1)
      //   return true
      // }
      // if (e.code === "ArrowLeft") {
      //   this.$refs.sp_object.api_turn_add(-1)
      //   return true
      // }

      if (KeyboardHelper.soft_pure_key_p(e, "0")) {
        this.SePresetInfo.fetch("初期値").func(this)
        return true
      }
      if (KeyboardHelper.soft_pure_key_p(e, "#")) {
        this.sp_layer = !this.sp_layer
        return true
      }
      if (KeyboardHelper.soft_pure_key_p(e, "s")) {
        this.xstore_save_handle()
        return true
      }
      if (KeyboardHelper.soft_pure_key_p(e, "l")) {
        this.xstore_load_handle()
        return true
      }
      if (KeyboardHelper.soft_pure_key_p(e, "d")) {
        this.sp_dev_tools = !this.sp_dev_tools
        return true
      }
      if (KeyboardHelper.soft_pure_key_p(e, "c")) {
        this.sp_controller = !this.sp_controller
        this.sp_slider = !this.sp_slider
        return true
      }
      if (KeyboardHelper.soft_pure_key_p(e, "v")) {
        this.$buefy.toast.open("再生モード")
        this.sp_mode = "view"
        return true
      }
      if (KeyboardHelper.soft_pure_key_p(e, "p")) {
        this.$buefy.toast.open("操作モード")
        this.sp_mode = "play"
        return true
      }
      if (KeyboardHelper.soft_pure_key_p(e, "e")) {
        this.$buefy.toast.open("編集モード")
        this.sp_mode = "edit"
        return true
      }
      if (KeyboardHelper.soft_pure_key_p(e, "h")) {
        if (this.sp_layout === "vertical") {
          this.sp_layout = "horizontal"
        } else if (this.sp_layout === "horizontal") {
          this.sp_layout = "vertical"
        }
        return true
      }
    },
  },
}
