<template lang="pug">
.MainBoard(@click.capture="click_handle")
  // .MainBoard に設定した background-image に影をつけるために drop-shadow すると
  // .MainBoard その子供である table にまで影が適用されてしまう
  // table に影が適用されると、駒の影にも .MainBoard の影が加算されてしまい濃くなってしまう
  // それを防ぐためには .MainBoard の :after に背景を指定すればよい
  // が、わかりやすくするために背景専用の MainBoardBG を追加した
  // これなら MainBoardTexture に適用した影が table に影響しない
  .MainBoardTexture.is-overlay

  // MainBoardTexture の兄弟として BoardField を置くと MainBoardTexture に BoardField の border が負ける
  .BoardFieldWithPadding.is-overlay
    // flex ではなく table にしている理由
    // ・罫線が実線ではなく隙間であるため、線を黒くしようとしたとき、背景に黒を敷き詰めておかないといけない
    // ・そこでもし背景に画像を配置したとすると、その上の敷き詰めた黒は透明でなければならない
    // ・つまり、黒を敷き詰める必要あるのと、画像盤の上は透明でないといけないことが両立できない
    table.BoardField
      tr.BoardRow(v-for="(_, y) in TheSp.sp_board_dimension_h")
        td.BoardColumn(
          v-for="(_, x) in TheSp.sp_board_dimension_w"
          @pointerdown="TheSp.board_cell_pointerdown_handle(logical_xy(x, y), $event)"
          @click.stop.prevent="TheSp.board_cell_left_click(logical_xy(x, y), $event)"
          @click.stop.prevent.right="TheSp.board_cell_right_click(logical_xy(x, y), $event)"
          @mouseover="TheSp.board_mouseover_handle(logical_xy(x, y), $event)"
          @mouseleave="TheSp.mouseleave_handle"
          )
          PieceTap(
            :class="TheSp.board_piece_tap_class(logical_xy(x, y))"
            :style="TheSp.board_piece_back_style(logical_xy(x, y))"
            :piece_texture_class="TheSp.xcontainer.board_piece_fore_class(logical_xy(x, y))"
            )
</template>

<script>
import { support } from "./support.js"
import { Board   } from "./models/board.js"

import PieceTap from "./PieceTap.vue"

export default {
  name: "MainBoard",
  mixins: [support],
  components: {
    PieceTap,
  },
  beforeUpdate() {
    this.TheSp.$data._MainBoardRenderCount += 1
  },
  methods: {
    click_handle() {
      if (this.TheSp.sp_board_click_handle) {
        this.TheSp.sp_board_click_handle()
      }
    },

    logical_xy(x, y) {
      x = x + Board.dimension - this.TheSp.sp_board_dimension_w
      y = y + Board.dimension - this.TheSp.sp_board_dimension_h
      if (this.TheSp.fliped) {
        x = this.TheSp.sp_board_dimension_w - x - 1
        y = this.TheSp.sp_board_dimension_h - y - 1
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
// | MainBoard         | わかりやすい             | Chromeで隙間ができる               | わかりやすい気がしていただけ       |      |
// | MainBoardTexture  | 角を丸めても縁取りできる | 影の影響がある                     | 画像に縁取りできても別に嬉しくない |      |
// | table.BoardField  | 普通に考えてここ         | グリッドと外枠に隙間が入れられない | 隙間を入れれても嬉しくない         | ←   |
// |-------------------+--------------------------+------------------------------------+------------------------------------+------|

.ShogiPlayerGround
  // 全体背景と同じ構成
  +defvar(sp_board_color, rgba(0, 0, 0, 0.2))      // 盤の色
  +defvar(sp_board_image, none)                    // 盤画像
  +defvar(sp_board_blur, 0)                        // 盤ぼかし
  +defvar(sp_board_grayscale, 0%)                  // 盤グレースケール
  +defvar(sp_board_contrast, 1.0)                  // 盤コントラスト
  +defvar(sp_board_invert, 0)                      // 盤色反転
  +defvar(sp_board_hue, 1.0)                       // 盤色相
  +defvar(sp_board_saturate, 1.0)                  // 盤彩度
  +defvar(sp_board_brightness, 1.0)                // 盤輝度
  +defvar(sp_board_sepia, 0)                       // 盤セピア
  +defvar(sp_board_blend, normal)                  // 盤の mix-blend-mode の値

  +defvar(sp_board_opacity, 1.0)                   // 非半透明度
  +defvar(sp_board_padding, 1.5)                   // 盤の隅の隙間
  +defvar(sp_board_radius, 5)                      // 盤の隅の丸め度合い

  +defvar(sp_grid_outer_stroke, 0)                 // グリッドの外枠の太さ(紙面風のとき)
  +defvar(sp_grid_outer_color, rgba(0, 0, 0, 0.5)) // グリッド外枠色
  +defvar(sp_grid_color, rgba(0, 0, 0, 0.5))       // グリッド色
  +defvar(sp_grid_stroke, 1)                       // グリッド太さ
  +defvar(sp_grid_outer_texture_edge_stroke, 0)    // 盤背景の縁取りの太さ(影の影響あり)
  +defvar(sp_grid_star_size, 10%)                  // 星の大きさ
  +defvar(sp_grid_star_z_index, 0)                 // 星の z-index (符号の鬼ではタップの邪魔にならないよう -1 にする)

  +defvar(sp_board_dimension_w, 9)                 // 盤のセル数(w) CSS内では未使用
  +defvar(sp_board_dimension_h, 9)                 // 盤のセル数(h) TDの縦幅を決めるのに必要

  .MainBoard
    width: 100%
    height: 100%
    +is_overlay_origin

  .MainBoardTexture
    // https://postd.cc/css-will-change-property/
    // will-change: filter

    // mix-blend-mode: var(--sp_board_blend)

    background-color: var(--sp_board_color)  // 背景色は画像の透明な部分があれば見えるので画像があっても無駄にはならない
    +is_background_cover_by_image
    background-image: var(--sp_board_image)  // none でスルーする
    // background-image: url("../assets/inspect/256x256.png")

    border-radius: calc(var(--sp_board_radius) * 1px)
    border: calc(var(--sp_grid_outer_texture_edge_stroke) * 1px) solid var(--sp_grid_outer_color) // 画像の輪郭で影の影響あり

  &.is_board_shadow_drop
    .MainBoardTexture
      // +filter_drop_shadow(1, board_filter_params_without_drop_shadow())
  &.is_board_shadow_box
    .MainBoardTexture
      // +filter_box_shadow(1, board_filter_params_without_drop_shadow())
  &.is_board_shadow_none
    .MainBoardTexture
      // filter: board_filter_params_without_drop_shadow()

  .BoardFieldWithPadding
    padding: calc(var(--sp_board_padding) * 1%)

  //- flex に移行しやすいように table, tr, td 使用禁止
  .BoardField
    // これを指定するとオーバーレイの兄(MainBoardTexture)の上に表示できる
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

  .BoardColumn
    // 何もしなければ縦幅は均等になる
    border: calc(var(--sp_grid_stroke) * 1px) solid var(--sp_grid_color) // border-collapse: collapse の効果で重ならない

    // 縦幅はブラウザによって異なるので難しい
    // Google Chrome 90.0.4430.216 までは指定なしで均等だったが、
    // Google Chrome 91.0.4472.77  からは最初と最後の行だけ1.2倍ほど広がり均等でなくなった
    // Firefox ではまったく均等にしないためセルが表示されない
    // そのため明示的に指定するようにした。これによって対象外としていた Firefox でも見れるようになった
    // ちなみに flex であれば height: 100% で均等になる
    height: calc(100.0% / var(--sp_board_dimension_h))

  // border が MainBoardTexture に負けるので入れ子にしている
  // td
  //   +is_overlay_origin
  //   .CellBorder
  //     +is_overlay_block
  //     // border: calc(var(--sp_grid_stroke) * 1px) solid var(--sp_grid_color)

  .BoardRow:nth-child(3n+4)
    .BoardColumn:nth-child(3n+4)
      position: relative
      &:after
        position: absolute
        content: ""
        top:  calc(var(--sp_grid_star_size) * -0.5)
        left: calc(var(--sp_grid_star_size) * -0.5)
        width:  var(--sp_grid_star_size)
        height: var(--sp_grid_star_size)
        border-radius: 50%
        background-color: var(--sp_grid_outer_color)
        z-index: var(--sp_grid_star_z_index)
</style>
