<template lang="pug">
.PieceBox.is-flex(
  v-if="base.edit_p"
  :class="component_class"
  @click.stop.prevent="base.piece_box_other_click"
  @click.right.prevent="base.hold_cancel"
  )
  .PieceWithCount.is-flex(
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
      )
    PieceObjectCount(:count="count")
</template>

<script>
import { support } from "./support.js"
import PieceObject from "./PieceObject.vue"
import PieceObjectCount from "./PieceObjectCount.vue"

export default {
  mixins: [support],
  components: {
    PieceObject,
    PieceObjectCount,
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
  &.is_vertical
    .PieceBox
      // @extend %board_texture_bg
      @extend %real_hoverable_opacity
      @extend %is_unselectable

      height: 3rem
      margin-top: $sp_size_piece_stand_margin_top_bottom
      justify-content: flex-start
      align-items: center

      .PieceWithCount                // FIXME: クリックをここにしたい
        // border: 1px dashed change_color($primary, $alpha: 0.5)
        // padding: 0 0.25rem
        // font-size: 2.8rem
        justify-content: center
        align-items: center
        // border: 1px dashed change_color($black, $alpha: 0.8)
        .PieceObject
          height: 2rem
          width:  2rem
</style>
