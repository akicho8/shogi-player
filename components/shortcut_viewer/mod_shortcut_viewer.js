import ShortcutViewer from "./ShortcutViewer.vue"

export const mod_shortcut_viewer = {
  data() {
    return {
      shortcut_viewer_p: false,
    }
  },
  methods: {
    shortcut_viewer_toggle_handle() {
      if (this.shortcut_viewer_p) {
        this.shortcut_viewer_close_handle()
      } else {
        this.shortcut_viewer_open_handle()
      }
    },
    shortcut_viewer_open_handle() {
      this.shortcut_viewer_p = true
    },
    shortcut_viewer_close_handle() {
      this.shortcut_viewer_p = false
    },
  },
}
