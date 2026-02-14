export const mod_shortcut = {
  methods: {
    shortcut_hook(e) {
      if (e.code === "Enter" || e.code === "Escape" || e.code === "Space") {
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
    },
  },
}
