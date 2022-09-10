<template lang="pug">
.ShogiPlayerBody(:class="component_class")
  Membership(position="north" :location="location_of('white')")
  AspectRatioFixedBlock
    OverlayNavigations
    MainBoard
  Membership(position="south" :location="location_of('black')")
</template>

<script>
import { support } from "./support.js"

import { Location } from "./models/location.js"

import Membership            from "./Membership/Membership.vue"
import AspectRatioFixedBlock from "./AspectRatioFixedBlock.vue"
import MainBoard             from "./MainBoard.vue"
import OverlayNavigations    from "./OverlayNavigations.vue"

export default {
  name: "ShogiPlayerBody",
  mixins: [support],
  components: {
    Membership,
    AspectRatioFixedBlock,
    MainBoard,
    OverlayNavigations,
  },

  methods: {
    location_of(key) {
      return Location.fetch(key).flip_if(this.TheSp.fliped)
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
</style>
