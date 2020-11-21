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
// 上に被せてすべてを押せないようにする
.ShogiPlayer
  &.run_mode-view_mode
    position: relative
    .OverlayForDisable
      position: absolute
      z-index: 2
      width: 100%
      height: 100%
</style>
