<template lang="pug">
.BoardWood
  // .BoardWood に設定した background-image に影をつけるために drop-shadow すると
  // .BoardWood その子供である table にまで影が適用されてしまう
  // table に影が適用されると、駒の影にも .BoardWood の影が加算されてしまい濃くなってしまう
  // それを防ぐためには .BoardWood の :after に背景を指定すればよい
  // が、わかりやすくするために背景専用の BoardWoodBG を追加した
  // これなら BoardWoodTexture に適用した影が table に影響しない
  .BoardWoodTexture.is-overlay

  // BoardWoodTexture の兄弟として BoardField を置くと BoardWoodTexture に BoardField の border が負ける
  .BoardFieldWithPadding.is-overlay
    table.BoardField
      tr(v-for="(_, y) in base.mediator.dimension")
        td(
          v-for="(_, x) in base.mediator.dimension"
          @pointerdown="base.board_cell_pointerdown_handle(logical_vector(x, y), $event)"
          @click.stop.prevent="base.board_cell_left_click(logical_vector(x, y), $event)"
          @click.stop.prevent.right="base.board_cell_right_click(logical_vector(x, y), $event)"
          @mouseover="base.board_mouseover_handle(logical_vector(x, y), $event)"
          @mouseleave="base.mouseleave_handle"
          )
          PieceTap(
            :base="base"
            :class="base.board_piece_control_class(logical_vector(x, y))"
            :style="base.board_piece_back_style(logical_vector(x, y))"
            :piece_texture_class="base.mediator.board_piece_fore_class(logical_vector(x, y))"
            )
</template>

<script>
import { support } from "./support.js"
import PieceTap from "./PieceTap.vue"
import Board from "./models/board.js"

export default {
  name: "BoardWood",
  mixins: [support],
  components: {
    PieceTap,
  },
  methods: {
    logical_vector(x, y) {
      if (this.base.new_flip) {
        return Board.vector_flip(x, y)
      }
      return [x, y]
    },
  },
}
</script>

<style lang="sass">
@import "./support.sass"

// 外枠 border をどこに適用するか？
// |-------------------+--------------------------+------------------------------------+------------------------------------+------|
// | 場所              | よい                     | だめ                               | 備考                               | 結果 |
// |-------------------+--------------------------+------------------------------------+------------------------------------+------|
// | BoardWood        | わかりやすい             | Chromeで隙間ができる               | わかりやすい気がしていただけ       |      |
// | BoardWoodTexture | 角を丸めても縁取りできる | 影の影響がある                     | 画像に縁取りできても別に嬉しくない |      |
// | table.BoardField  | 普通に考えてここ         | グリッドと外枠に隙間が入れられない | 隙間を入れれても嬉しくない         | ←   |
// |-------------------+--------------------------+------------------------------------+------------------------------------+------|

.ShogiPlayerGround
  // 全体背景と同じ構成
  +defvar(sp_board_color, rgba(0, 0, 0, 0.2))      // 盤の色
  +defvar(sp_board_image, none)                    // 背景画像
  +defvar(sp_board_blur, 0)                        // ぼかし
  +defvar(sp_board_grayscale, 0%)                  // グレースケール
  +defvar(sp_board_contrast, 1.0)                  // 駒コントラスト
  +defvar(sp_board_invert, 0)                      // 駒色反転
  +defvar(sp_board_hue, 1.0)                       // 色相
  +defvar(sp_board_saturate, 1.0)                  // 彩度
  +defvar(sp_board_brightness, 1.0)                // 輝度
  +defvar(sp_board_blend, normal)                  // 盤の mix-blend-mode の値

  +defvar(sp_board_opacity, 1.0)                   // 非半透明度
  +defvar(sp_board_padding, 1.5)                   // 盤の隅の隙間
  +defvar(sp_board_radius, 5)                      // 盤の隅の丸め度合い

  +defvar(sp_grid_outer_stroke, 1.5)               // グリッドの外枠の太さ(紙面風のとき)
  +defvar(sp_grid_outer_color, rgba(0, 0, 0, 0.5)) // グリッド外枠色
  +defvar(sp_grid_color, rgba(0, 0, 0, 0.5))       // グリッド色
  +defvar(sp_grid_stroke, 1)                       // グリッド太さ
  +defvar(sp_grid_outer_texture_edge_stroke, 0)    // 盤背景の縁取りの太さ(影の影響あり)
  +defvar(sp_grid_star_size, 10%)                  // 星の大きさ
  +defvar(sp_grid_star_color, var(--sp_grid_color)) // 星の色

  .BoardWood
    width: 100%
    height: 100%
    +is_overlay_origin

  .BoardWoodTexture
    mix-blend-mode: var(--sp_board_blend)

    background-color: var(--sp_board_color)  // 背景色は画像の透明な部分があれば見えるので画像があっても無駄にはならない
    +is_background_cover_by_image
    background-image: var(--sp_board_image)  // none でスルーする
    // background-image: url("../assets/inspect/256x256.png")

    border-radius: calc(var(--sp_board_radius) * 1px)
    border: calc(var(--sp_grid_outer_texture_edge_stroke) * 1px) solid var(--sp_grid_outer_color) // 画像の輪郭で影の影響あり

  &.is_board_shadow_box
    .BoardWoodTexture
      +filter_box_shadow(1, board_filter_params_without_drop_shadow())
  &.is_board_shadow_drop
    .BoardWoodTexture
      +filter_drop_shadow(1, board_filter_params_without_drop_shadow())
  &.is_board_shadow_none
    .BoardWoodTexture
      filter: board_filter_params_without_drop_shadow()

  .BoardFieldWithPadding
    padding: calc(var(--sp_board_padding) * 1%)

  .BoardField
    // これを指定するとオーバーレイの兄(BoardWoodTexture)の上に表示できる
    // が、駒のテクスチャに mix-blend-mode が効かなくなる
    // ので指定してはいけない
    // isolation: isolate

    width: 100%
    height: 100%
    border: calc(var(--sp_grid_outer_stroke) * 1px) solid var(--sp_grid_outer_color)
    border-collapse: collapse // td同士のborderを共有する

    // 盤面の駒(テキスト)を連打やドラッグの際に選択できないようにする
    @extend %is_unselectable

    table-layout: fixed    // 横幅均等

  // 縦幅均等
  td
    height: calc(100% / var(--sp_board_dimension))
    border: calc(var(--sp_grid_stroke) * 1px) solid var(--sp_grid_color)

  // border が BoardWoodTexture に負けるので入れ子にしている
  // td
  //   +is_overlay_origin
  //   .CellBorder
  //     +is_overlay_block
  //     // border: calc(var(--sp_grid_stroke) * 1px) solid var(--sp_grid_color)

  tr:nth-child(3n+4)
    td:nth-child(3n+4)
      position: relative
      &:after
        position: absolute
        content: ""
        top:  calc(var(--sp_grid_star_size) * -0.5)
        left: calc(var(--sp_grid_star_size) * -0.5)
        width:  var(--sp_grid_star_size)
        height: var(--sp_grid_star_size)
        border-radius: 50%
        background-color: var(--sp_grid_star_color)
</style>
