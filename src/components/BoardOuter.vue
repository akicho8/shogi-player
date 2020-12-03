<template lang="pug">
.BoardOuter
  // .BoardOuter に設定した background-image に影をつけるために drop-shadow すると
  // .BoardOuter その子供である table にまで影が適用されてしまう
  // table に影が適用されると、駒の影にも .BoardOuter の影が加算されてしまい濃くなってしまう
  // それを防ぐためには .BoardOuter の :after に背景を指定すればよい
  // が、わかりやすくするために背景専用の BoardOuterBG を追加した
  // これなら BoardTextureSelf に適用した影が table に影響しない
  .BoardTextureSelf

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
  --sp_grid_color: rgba(0, 0, 0, 0.5)  // グリッド色
  --sp_board_padding: 2%               // 盤の隅の隙間
  --sp_grid_outer_stroke: 1px          // 升目外枠の太さ
  --sp_grid_star: 6px          // 星の大きさ
  --sp_board_radius: 0.5%              // 盤の隅の丸め度合い
  --sp_board_color: rgba(0, 0, 0, 0.2) // 盤の色
  --sp_board_opacity: 1.0              // 非半透明度
  --sp_board_bg_image: none            // 背景画像

  .BoardOuter
    width: 100%
    height: 100%

  table.BoardInner
    width: 100%
    height: 100%

    // 盤面の駒(テキスト)を連打やドラッグの際に選択できないようにする
    @extend %is_unselectable

    table-layout: fixed    // 横幅均等

  tr:nth-child(3n+4)
    td:nth-child(3n+4)
      position: relative
      &:after
        position: absolute
        content: ""
        top:  calc(var(--sp_grid_star) * -0.5 - 0.5px)
        left: calc(var(--sp_grid_star) * -0.5 - 0.5px)
        width:  var(--sp_grid_star)
        height: var(--sp_grid_star)
        border-radius: 50%
        background: var(--sp_grid_color)

  td
    height: calc(100% / 9) // 縦幅均等
    border: $sp_real_grid_inner solid var(--sp_grid_color)

  .BoardOuter
    padding: var(--sp_board_padding)

  .BoardOuter
    border: var(--sp_grid_outer_stroke) solid var(--sp_grid_color)

  .BoardTextureSelf
    +overlay_block
    z-index: -1

    +filter_drop_shadow(1) // .BoardOuter ではなく .BoardTextureSelf に適用しているので table の駒の影に影響がない

    background-color: var(--sp_board_color)    // 背景色は画像の透明な部分があれば見える

    // background-image: url("../assets/is_bg_variant/0270_337378_m.jpg") // for debug
    background-image: var(--sp_board_bg_image)

    // テクスチャを広げてマッピングする
    background-position: center
    background-repeat: no-repeat
    background-size: cover

    border-radius:    var(--sp_board_radius)   // 角を丸める
    opacity:          var(--sp_board_opacity)
</style>
