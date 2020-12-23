<template lang="pug">
.OverlayForDisable(v-if="base.operation_disable")
</template>

<script>
import { support } from "./support.js"

export default {
  mixins: [support],
}
</script>

<style lang="sass">
@import "./support.sass"
// 上に被せてすべてを押せないようにする
.ShogiPlayer
  &.run_mode-view_mode
    .ShogiPlayerWidth
      .OverlayForDisable
        position: absolute
        z-index: $overlay_for_disable_z
        width: 100%
        height: 100%
    .is_layer_on
      .OverlayForDisable
        background: change_color($primary, $alpha: 0.5)
</style>
