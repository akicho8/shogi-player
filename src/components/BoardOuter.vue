<template lang="pug">
.BoardOuter
  table.BoardInner
    tr(v-for="(_, y) in base.mediator.dimension")
      td(
        v-for="(_, x) in base.mediator.dimension"
        @pointerdown="base.board_cell_pointerdown_handle([x, y], $event)"
        @click.stop.prevent="base.board_cell_left_click([x, y], $event)"
        @click.stop.prevent.right="base.board_cell_right_click([x, y], $event)"
        @mouseover="base.board_mouseover_handle([x, y], $event)"
        @mouseleave="base.mouseleave_handle"
        )
        PieceObject(
          :base="base"
          :class="base.board_piece_control_class([x, y])"
          :style="base.board_piece_back_style([x, y])"
          :piece_texture_class="base.mediator.board_piece_fore_class([x, y])"
          )
</template>

<script>
import { support_child } from "./support_child.js"
import PieceObject from "./PieceObject.vue"

export default {
  name: "BoardOuter",
  mixins: [support_child],
  components: {
    PieceObject,
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayerPure
  .BoardOuter
    width: 100%
    height: 100%

    @extend %board_shadow
    @extend %board_texture_bg

  table.BoardInner
    width: 100%
    height: 100%

    +board_star_mark_define($sp_real_star_color)

    // 盤面の駒(テキスト)を連打やドラッグの際に選択できないようにする
    @extend %is_unselectable

    table-layout: fixed    // 横幅均等
  td
    height: calc(100% / 9) // 縦幅均等
    border: $sp_real_grid_inner solid $sp_real_grid_color // 盤面の罫線

  &.is_texture_image
    .BoardOuter
      padding: unquote("max(2%, 3px)")  // 盤の隅の隙間
      background-position: center
      background-repeat: no-repeat
      background-size: cover
      border-radius: var(--sp_board_texture_radius, 0.5%) // 角を丸める(オプション化)

  &.is_texture_text
    .BoardOuter
      border: 1px solid change_color($black, $alpha: 0.5)

  &.is_texture_none
</style>
