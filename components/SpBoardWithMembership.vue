<template lang="pug">
.SpBoardWithMembership(:class="component_class")
  Membership(position="north" :location="location_of('white')")
  AspectRatioFixedBlock
    OverlayNavigations
    BoardBase
  Membership(position="south" :location="location_of('black')")
</template>

<script>
import { support } from "./support.js"

import { Location } from "./models/location.js"

import Membership            from "./Membership/Membership.vue"
import AspectRatioFixedBlock from "./AspectRatioFixedBlock.vue"
import BoardBase             from "./BoardBase.vue"
import OverlayNavigations    from "./OverlayNavigations.vue"

export default {
  name: "SpBoardWithMembership",
  mixins: [support],
  components: {
    Membership,
    AspectRatioFixedBlock,
    BoardBase,
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
.ShogiPlayer .SpGround
  +defvar(sp_board_horizontal_gap, 0) // 盤の左右の隙間(横配置時)
  +defvar(sp_board_vertical_gap, 0)   // 盤の上下の隙間(縦配置時)

  .SpBoardWithMembership
    // 縦横関係なく中央に寄せる
    display: flex
    align-items: center
    justify-content: center

    ////////////////////////////////////////////////////////////////////////////////
    //- position: relative
    //- z-index: 1 // Membership 内の PieceCount が駒箱の下に入るのを防ぐ
    ////////////////////////////////////////////////////////////////////////////////

  // |---------+----------------+--------------+--------------------------------------|
  // |         | .horizontal | .vertical | 備考                                 |
  // |---------+----------------+--------------+--------------------------------------|
  // | +tablet | row            | column       | 画面が広いので切り替え可             |
  // | +mobile | column         | column       | 画面幅を最大に使いたいので常に縦配置 |
  // |---------+----------------+--------------+--------------------------------------|
  +IF_HORIZONTAL
    .SpBoardWithMembership
      flex-direction: row
      gap: calc(var(--sp_cell_w) * var(--sp_board_horizontal_gap))
  +IF_VERTICAL
    .SpBoardWithMembership
      flex-direction: column
      // 縦は "100%" としても反応しない
      gap: calc(var(--sp_cell_h) * var(--sp_board_vertical_gap))
</style>
