<template lang="pug">
.OpDisabledBlock.is-overlay(v-if="TheSp.sp_operation_disabled")
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
  &.is_mode_view
    .SpGroundInside
      .OpDisabledBlock
        z-index: $overlay_for_disable_z
    .is_layer_on
      .OpDisabledBlock
        background: change_color($primary, $alpha: 0.5)
</style>
