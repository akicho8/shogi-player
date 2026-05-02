import { DomHelper } from "../models/dom_helper.js"

export const mod_keydown = {
  mounted() {
    window.addEventListener("keydown", this.keydown_hook)
  },

  beforeDestroy() {
    window.removeEventListener("keydown", this.keydown_hook)
  },

  methods: {
    keydown_hook(e) {
      if (DomHelper.input_focused_p()) {
        return
      }
      if (this.shortcut_hook) {
        if (this.shortcut_hook(e)) {
          e.preventDefault()
          return
        }
      }
    },
  }
}
