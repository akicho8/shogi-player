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
  --sp_piece_box_color: rgba(0, 0, 0, 0.2)  // 駒箱背景
  --sp_piece_box_radius: 3px                // 角丸度合

  .PieceBox
    @extend %real_hoverable_opacity
    @extend %is_unselectable

    // margin-top: $sp_size_piece_stand_margin_top_bottom

    display: flex
    justify-content: flex-start
    align-items: center

    position: relative
    min-height: var(--sp_piece_box_piece_h)

    .PieceWithCount
      display: flex
      justify-content: center
      align-items: center

  .PieceBoxTexture
    +overlay_block
    +filter_drop_shadow(1)
    background-color: var(--sp_piece_box_color)
    border-radius: var(--sp_piece_box_radius)
</style>
