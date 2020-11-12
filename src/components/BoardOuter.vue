<template lang="pug">
.BoardOuter
  table.board_inner
    tr(v-for="y in base.mediator.dimension")
      td(
        v-for="x in base.mediator.dimension"
        @pointerdown="base.board_cell_pointerdown_handle([x - 1, y - 1], $event)"
        @click.stop.prevent="base.board_cell_left_click([x - 1, y - 1], $event)"
        @click.stop.prevent.right="base.board_cell_right_click([x - 1, y - 1], $event)"
        @mouseover="base.board_mouseover_handle([x - 1, y - 1], $event)"
        @mouseleave="base.mouseleave_handle")
        .piece_back(:class="base.board_piece_back_class([x - 1, y - 1])" :style="base.board_piece_back_style([x - 1, y - 1])")
          .piece_fore(:class="base.mediator.board_piece_fore_class([x - 1, y - 1])")
            | {{base.mediator.cell_view([x - 1, y - 1])}}
</template>

<script>
import { support_child } from "./support_child.js"

export default {
  name: 'Flippable',
  mixins: [support_child],
  components: {
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.shogi-player
  .BoardOuter
    width: 100%
    height: 100%
    border: 1px solid blue

    padding: 1.4%               // 盤の隅の隙間

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
        // height: calc(100% / 9) // 縦幅を均等にする

      td
        border: $sp_real_grid_inner solid $sp_real_grid_color // 盤面の罫線
        .piece_back
          height: 100%          // 駒全体が表示される

          // text-align: center    // 駒のテキストを中央にする
          // vertical-align: middle   // block要素(Y)を中央にする
          // padding: 0               // ブラウザの初期値だと1pxあるので消す

          .piece_fore
</style>
