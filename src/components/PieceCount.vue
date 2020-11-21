<template lang="pug">
.PieceCount.is-unselectable(v-if="count >= 2")
  | {{count}}
</template>

<script>
import { support } from "./support.js"

export default {
  name: "PieceCount",
  mixins: [support],
  props: {
    count: { type: Number, required: true },
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayer
  .PieceCount
    color: change_color($black, $alpha: 0.6)
    font-size: 1rem
    font-weight: bold
    margin-left: -0.4rem
    z-index: 1            // 駒画像の下に潜るのを防ぐため
    // -webkit-text-stroke: 1px change_color($black, $alpha: 1)
</style>
