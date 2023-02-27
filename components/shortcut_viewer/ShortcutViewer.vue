<template lang="pug">
.ShortcutViewer(@click.stop="TheSp.shortcut_viewer_close_handle")
  ShortcutContent
</template>

<script>
import { support } from "../support.js"
import ShortcutContent from "./ShortcutContent.vue"

export default {
  name: "ShortcutViewer",
  mixins: [support],
  components: {
    ShortcutContent,
  },
  mounted() {
    document.addEventListener("keydown", this.keydown_hook)
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.keydown_hook)
  },
  methods: {
    keydown_hook(e) {
      if (e.code === "Escape") {
        this.TheSp.shortcut_viewer_close_handle()
      }
    },
  },
}
</script>

<style lang="sass">
@import "../support.sass"

.ShogiPlayer .ShortcutViewer
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  overflow: auto

  z-index: $shortcut_viewer_z
  background-color: hsla(0, 0%, 0%, 0.5)

  display: flex
  align-items: center
  justify-content: center
  flex-direction: column

// .ShogiPlayer
//   &.is_layer_on
//     .ShortcutViewer
//       +is_layer_border
//       .b-tabs
//         +is_layer_border($danger, 2)
//         .tab-content
//           +is_layer_border($info, 2)
//           .tab-item
//             +is_layer_border($warning, 2)
//       .DevToolsGroupContent
//         +is_layer_border($success, 2)
</style>
