<template lang="pug">
.BoardOuter
  table.board_inner
    tr(v-for="(_, y) in base.mediator.dimension")
      td(
        v-for="(_, x) in base.mediator.dimension"
        @pointerdown="base.board_cell_pointerdown_handle([x, y], $event)"
        @click.stop.prevent="base.board_cell_left_click([x, y], $event)"
        @click.stop.prevent.right="base.board_cell_right_click([x, y], $event)"
        @mouseover="base.board_mouseover_handle([x, y], $event)"
        @mouseleave="base.mouseleave_handle")
        PieceObject(
          :base="base"
          :class="base.board_piece_control_class([x, y])"
          :style="base.board_piece_back_style([x, y])"
          :tclass="base.mediator.board_piece_fore_class([x, y])"
          :piece_text="base.mediator.cell_view([x, y])"
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
.shogi-player
  .BoardOuter
    width: 100%
    height: 100%
    // border: 1px dashed change_color($primary, $alpha: 0.5)

    padding: unquote("max(1.4%, 3px)")  // 盤の隅の隙間

    @extend %board_shadow
    @extend %board_texture_bg

    table.board_inner
      +board_star_mark_define($sp_real_star_color)
      // 盤面の駒(テキスト)を連打やドラッグの際に選択できないようにする
      @extend %is_unselectable

      table-layout: fixed
      width: 100%
      height: 100%

      td
        height: calc(100% / 9) // 縦幅を均等にする

      td
        border: $sp_real_grid_inner solid $sp_real_grid_color // 盤面の罫線
        .PieceObject
          // text-align: center    // 駒のテキストを中央にする
          // vertical-align: middle   // block要素(Y)を中央にする
          // padding: 0               // ブラウザの初期値だと1pxあるので消す

          // .piece_fore
</style>
