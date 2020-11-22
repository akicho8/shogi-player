<template lang="pug">
.PieceObjectCount.is-unselectable(v-if="count >= 2")
  | {{count}}
</template>

<script>
import { support } from "./support.js"

export default {
  name: "PieceObjectCount",
  mixins: [support],
  props: {
    count: { type: Number, required: true },
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayerPure
  .Membership
    &.is_white
      .PieceTexture
        position: relative
      .PieceObjectCount
        position: absolute
        right: 100% // ← 横位置調整可
        top: 0
        bottom: 0

        transform: rotate(180deg)

        display: flex
        justify-content: center
        align-items: center

        color: change_color($black, $alpha: 0.6)
        font-size: 1rem
        font-weight: bold
        // margin-left: -0.4rem
        z-index: 1            // 駒画像の下に潜るのを防ぐため
        // -webkit-text-stroke: 1px change_color($black, $alpha: 1)
    &.is_black
      .PieceTexture
        position: relative
      .PieceObjectCount
        position: absolute
        left: 100% // ← 横位置調整可
        top: 0
        bottom: 0

        display: flex
        justify-content: center
        align-items: center

        color: change_color($black, $alpha: 0.6)
        font-size: 1rem
        font-weight: bold
        // margin-left: -0.4rem
        z-index: 1            // 駒画像の下に潜るのを防ぐため
        // -webkit-text-stroke: 1px change_color($black, $alpha: 1)
</style>
