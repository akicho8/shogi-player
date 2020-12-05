<template lang="pug">
.ShogiPlayerCore(:class="component_class")
  Membership(:base="base" :location="base.location_white")
    //- b-button.mr-1(icon-left="cog" @click="base.setting_modal_p = true" v-if="base.setting_button_show" size="is-small")
  AspectRatioFixedBlock
    OverlayNavigations(:base="base")
    BoardOuter(:base="base")
  Membership(:base="base" :location="base.location_black")
</template>

<script>
import Membership            from "./Membership.vue"
import AspectRatioFixedBlock from "./AspectRatioFixedBlock.vue"
import BoardOuter            from "./BoardOuter.vue"
import OverlayNavigations    from "./OverlayNavigations.vue"

import { support } from "./support.js"

export default {
  name: "ShogiPlayerCore",
  mixins: [support],
  components: {
    Membership,
    AspectRatioFixedBlock,
    BoardOuter,
    OverlayNavigations,
  },
  computed: {
    component_class() {
      return [
        this.base.new_flip ? "is_flip_on" : "is_flip_off",
      ]
    },
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayerGround
  .ShogiPlayerCore
    // 縦横関係なく中央に寄せる
    display: flex
    align-items: center
    justify-content: center

    // 反転
    transform: rotate(0deg)
    transition: all 0.4s 0s ease-in-out
    &.is_flip_off
    &.is_flip_on
      @extend %is_flip

    ////////////////////////////////////////////////////////////////////////////////
    position: relative
    z-index: 1 // Membership 内の PieceObjectCount が駒箱の下に入るのを防ぐ
    ////////////////////////////////////////////////////////////////////////////////

  // |---------+----------------+--------------+--------------------------------------|
  // |         | .is_horizontal | .is_vertical | 備考                                 |
  // |---------+----------------+--------------+--------------------------------------|
  // | +tablet | row            | column       | 画面が広いので切り替え可             |
  // | +mobile | column         | column       | 画面幅を最大に使いたいので常に縦配置 |
  // |---------+----------------+--------------+--------------------------------------|
  &.is_horizontal
    .ShogiPlayerCore
      flex-direction: row
  =is_vertical_style
    .ShogiPlayerCore
      flex-direction: column
  &.is_vertical
    +is_vertical_style
  +mobile
    &.is_mobile_style
      +is_vertical_style

  .is_flip_on
    .overlay_navi
      &.previous
        cursor: e-resize
      &.next
        cursor: w-resize
</style>

