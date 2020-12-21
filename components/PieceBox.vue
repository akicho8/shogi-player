<template lang="pug">
.PieceBox(
  v-if="base.edit_p"
  :class="component_class"
  @click.stop.prevent="base.piece_box_other_click"
  @click.right.prevent="base.hold_cancel"
  )
  .PieceBoxTexture
  .PieceWithCount(
    v-for="[piece, count] in base.mediator.piece_box_realize()"
    :class="{holding_p: base.piece_box_have_p(piece)}"
    @click.stop.prevent="base.piece_box_piece_click(piece, $event)"
    @mouseover="base.piece_box_mouseover_handle(piece, $event)"
    @mouseleave="base.mouseleave_handle"
    )
    PieceTap(
      :base="base"
      :class="base.piece_box_piece_control_class(piece)"
      :piece_texture_class="base.piece_box_piece_texture_class(piece)"
      :count="count"
      )
</template>

<script>
import { support } from "./support.js"
import PieceTap from "./PieceTap.vue"

export default {
  mixins: [support],
  components: {
    PieceTap,
  },
  computed: {
    component_class() {
      const list = []
      if (this.base.holding_p) {
        list.push("hoverable_p")
      }
      return list
    },
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayerGround
  +defvar(sp_piece_box_color, rgba(0, 0, 0, 0.2)) // 駒箱背景
  +defvar(sp_common_gap, 12px)          // 共通の隙間

  .PieceBox
    @extend %is_unselectable

    display: flex
    justify-content: flex-start
    align-items: center

    min-height: var(--sp_piece_box_piece_h) // 駒がないときに駒台が消えるのを防ぐため(▲△もないので必ず必要)

    .PieceWithCount
      display: flex
      justify-content: center
      align-items: center

  //////////////////////////////////////////////////////////////////////////////// is_horizontal or is_vertical
  &.is_horizontal
    .PieceBox
      margin-top: var(--sp_common_gap)
  +is_vertical_and_mobile
    .PieceBox
      margin-top: 0

  //////////////////////////////////////////////////////////////////////////////// 駒持ってhoverしたとき
  .PieceBox
    &.hoverable_p
      &:hover
        .PieceBoxTexture
          border: var(--sp_stand_hover_border_stroke) dashed var(--sp_stand_hover_border_color)

  ////////////////////////////////////////////////////////////////////////////////
  .PieceBox
    +is_overlay_origin
  .PieceBoxTexture
    +is_overlay_block
    background-color: var(--sp_piece_box_color)
    border-radius: calc(var(--sp_board_radius) * 1px)
  &.is_board_shadow_box
    .PieceBoxTexture
      +filter_box_shadow(1)
  &.is_board_shadow_drop
    .PieceBoxTexture
      +filter_drop_shadow(1)
  &.is_board_shadow_none
    .PieceBoxTexture
</style>
