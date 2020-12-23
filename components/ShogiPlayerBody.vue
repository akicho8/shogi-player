<template lang="pug">
.ShogiPlayerBody(:class="component_class")
  Membership(:base="base" position="north" :location="location_of('white')")
    //- b-button.mr-1(icon-left="cog" @click="base.setting_modal_p = true" v-if="base.setting_button_show" size="is-small")
  AspectRatioFixedBlock
    OverlayNavigations(:base="base")
    BoardWood(:base="base")
  Membership(:base="base" position="south" :location="location_of('black')")
</template>

<script>
import Membership            from "./Membership.vue"
import AspectRatioFixedBlock from "./AspectRatioFixedBlock.vue"
import BoardWood             from "./BoardWood.vue"
import OverlayNavigations    from "./OverlayNavigations.vue"
import Location              from "./models/location.js"

import { support } from "./support.js"

export default {
  name: "ShogiPlayerBody",
  mixins: [support],
  components: {
    Membership,
    AspectRatioFixedBlock,
    BoardWood,
    OverlayNavigations,
  },

  methods: {
    location_of(key) {
      return Location.fetch(key).flip_if(this.base.new_flip)
    },
  },

  computed: {
    component_class() {
      return [
      ]
    },
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayerGround
  //////////////////////////////////////////////////////////////////////////////// 回転
  .ShogiPlayerBody
    transition: all 0.4s 0s ease-in-out
  &.is_flip_off
    .ShogiPlayerBody

  &.is_flip_on
    .ShogiPlayerBody
      // @extend %is_flip

  .ShogiPlayerBody
    // 縦横関係なく中央に寄せる
    display: flex
    align-items: center
    justify-content: center

    ////////////////////////////////////////////////////////////////////////////////
    //- position: relative
    //- z-index: 1 // Membership 内の PieceCount が駒箱の下に入るのを防ぐ
    ////////////////////////////////////////////////////////////////////////////////

  // |---------+----------------+--------------+--------------------------------------|
  // |         | .is_horizontal | .is_vertical | 備考                                 |
  // |---------+----------------+--------------+--------------------------------------|
  // | +tablet | row            | column       | 画面が広いので切り替え可             |
  // | +mobile | column         | column       | 画面幅を最大に使いたいので常に縦配置 |
  // |---------+----------------+--------------+--------------------------------------|
  +IS_HORIZONTAL
    .ShogiPlayerBody
      flex-direction: row
  +IS_VERTICAL
    .ShogiPlayerBody
      flex-direction: column

  .is_flip_on
    .overlay_navi
      &.previous
        cursor: e-resize
      &.next
        cursor: w-resize
</style>
