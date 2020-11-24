<template lang="pug">
.BoardOuter
  // .BoardOuter に設定した background-image に影をつけるために drop-shadow すると
  // .BoardOuter その子供である table にまで影が適用されてしまう
  // table に影が適用されると、駒の影にも .BoardOuter の影が加算されてしまい濃くなってしまう
  // それを防ぐためには .BoardOuter の :after に背景を指定すればよい
  // が、わかりやすくするために背景専用の BoardOuterBG を追加した
  // これなら BoardBG に適用した影が table に影響しない
  .BoardBG

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
import { support } from "./support.js"
import PieceObject from "./PieceObject.vue"

export default {
  name: "BoardOuter",
  mixins: [support],
  components: {
    PieceObject,
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayerGround
  .BoardOuter
    width: 100%
    height: 100%

    // +filter_drop_shadow(1)
    // @extend %board_texture_bg

  table.BoardInner
    // +filter_drop_shadow(1)
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
    .BoardBG
      +overlay_block
      z-index: -1

      +filter_drop_shadow(1) //.BoardOuter ではなく .BoardBG に適用しているので table の駒の影に影響がない
      background-position: center
      background-repeat: no-repeat
      background-size: cover
      border-radius: var(--sp_board_texture_radius, 0.5%) // 角を丸める(オプション化)
      // background-image: url("../assets/is_bg_variant/0270_337378_m.jpg") // for debug

  &.is_texture_text
    .BoardOuter
      border: 1px solid change_color($black, $alpha: 0.5)

  &.is_texture_none
</style>
