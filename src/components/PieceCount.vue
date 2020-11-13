<template lang="pug">
.PieceCount(v-if="count >= 2")
  | {{count}}
</template>

<script>
import { support_child } from "./support_child.js"

export default {
  name: "PieceCount",
  mixins: [support_child],
  props: {
    count: { type: Number, required: true },
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.shogi-player
  .PieceCount
    color: change_color($black, $alpha: 0.5)
    font-size: 1rem
    font-weight: bold
    margin-left: -0.6rem
    z-index: 1            // 駒画像の下に潜るのを防ぐため
    -webkit-text-stroke: 1px change_color($black, $alpha: 1)
</style>
