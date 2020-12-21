<template lang="pug">
.ShogiPlayerBody
  BoardOuter(:base="base")
</template>

<script>
import Membership            from "./Membership.vue"
import AspectRatioFixedBlock from "./AspectRatioFixedBlock.vue"
import BoardOuter            from "./BoardOuter.vue"
import OverlayNavigations    from "./OverlayNavigations.vue"

import { support } from "./support.js"

export default {
  name: "ShogiPlayerBody",
  mixins: [support],
  components: {
    BoardOuter,
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayerGround
  .ShogiPlayerBody
    // 縦横関係なく中央に寄せる
    display: flex
    align-items: center
    justify-content: center

    ////////////////////////////////////////////////////////////////////////////////
    // position: relative
    // z-index: 1 // Membership 内の PieceObjectCount が駒箱の下に入るのを防ぐ
    ////////////////////////////////////////////////////////////////////////////////
</style>
