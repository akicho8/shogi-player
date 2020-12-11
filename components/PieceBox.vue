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
    PieceObject(
      :base="base"
      :class="base.piece_box_piece_control_class(piece)"
      :piece_texture_class="base.piece_box_piece_texture_class(piece)"
      :count="count"
      )
</template>

<script>
import { support } from "./support.js"
import PieceObject from "./PieceObject.vue"

export default {
  mixins: [support],
  components: {
    PieceObject,
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
  +defvar(sp_piece_box_margin_top, 10px)          // 横レイアウト時の上マージン

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

  //////////////////////////////////////////////////////////////////////////////// is_horizontal
  &.is_horizontal
    .PieceBox
      margin-top: var(--sp_piece_box_margin_top)

  //////////////////////////////////////////////////////////////////////////////// is_vertical
  =is_vertical_style
    .PieceBox
      margin-top: 0
  &.is_vertical
    +is_vertical_style
  +mobile
    &.is_mobile_style
      +is_vertical_style

  ////////////////////////////////////////////////////////////////////////////////
  .PieceBox
    +is_overlay_origin
  .PieceBoxTexture
    +is_overlay_block
    +filter_drop_shadow(1)
    background-color: var(--sp_piece_box_color)
    border-radius: var(--sp_board_radius)

  //////////////////////////////////////////////////////////////////////////////// 駒持ってhoverしたとき
  .PieceBox
    &.hoverable_p
      &:hover
        .PieceBoxTexture
          border: var(--sp_stand_hover_border_stroke) dashed var(--sp_stand_hover_border_color)
</style>
