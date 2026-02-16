export const mod_shortcut = {
  methods: {
    shortcut_hook(e) {
      if (e.code === "Enter" || e.code === "Escape" || e.code === "Space" || e.key === "/") {
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
      if (e.key === "0") {
        this.PresetInfo.fetch("初期値").func(this)
        return true
      }
      if (e.key === "#") {
        this.sp_layer = !this.sp_layer
        return true
      }
      if (e.key === "s") {
        this.xstore_save_handle()
        return true
      }
      if (e.key === "l") {
        this.xstore_load_handle()
        return true
      }
      if (e.key === "d") {
        this.sp_dev_tools = !this.sp_dev_tools
        return true
      }
      if (e.key === "c") {
        this.sp_controller = !this.sp_controller
        this.sp_slider = !this.sp_slider
        return true
      }
    },
  },
}
