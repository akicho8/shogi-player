<template lang="pug">
// ↓ v-sp-disable-interactions を指定したことによってこの中では @click は使えない
.MainBoard.is-unselectable(data-resize_observer_id="MainBoard" v-sp-disable-interactions)
  // ↑ここに影を適用してはいけない
  // .MainBoard に設定した background-image に影をつけるために drop-shadow すると
  // .MainBoard その子供である table にまで影が適用されてしまう
  //
  // table に影が適用されると、駒の影にも .MainBoard の影が加算されてしまい濃くなってしまう
  // それを防ぐためには .MainBoard の :after に背景を指定すればよい
  // が、わかりやすくするために背景専用の BoardTexture を追加した
  // これなら BoardTexture に適用した影が table に影響しない
  .BoardTexture.is-overlay

  // BoardTexture の兄弟として BoardMatrix を置くと BoardTexture に BoardMatrix の border が負ける
  .BoardMatrixWithPadding.is-overlay
    // flex ではなく table にしている理由:
    // ・罫線が実線ではなく隙間であるため、線を黒くしようとしたとき、背景に黒を敷き詰めておかないといけない
    // ・そこでもし背景に画像を配置したとすると、その上の敷き詰めた黒は透明でなければならない
    // ・つまり、黒を敷き詰める必要あるのと、画像盤の上は透明でないといけないことが両立できない
    //
    // @[xxx] に装飾詞をつけられない問題:
    // @[xxx].left と @[xxx].right を定義しても .left .right の部分は無視されているため @[xxx] は一つだけとする
    //
    table.BoardMatrix
      tr.BoardRow(v-for="(_, y) in TheSp.sp_board_view_h")
        td.BoardCell(
          v-for="(_, x) in TheSp.sp_board_view_w"
          data-resize_observer_id="BoardCell"
          @pointerdown.stop.prevent.left="TheSp.board_cell_left_click(place_by(x, y), $event)"
          @pointerdown.stop.prevent.right="TheSp.board_cell_right_click(place_by(x, y), 'transform_all', $event)"
          @mouseover="TheSp.board_mouseover_handle(place_by(x, y), $event)"
          @mouseleave="TheSp.mouseleave_handle"
          :class="cell_class(x, y)"
          :style="cell_style(place_by(x, y))"
          )

          // PieceTap は盤上にあるとは限らないので x, y に依存してはいけない。だから x, y を元にしたものを渡している
          PieceTap(
            :class="TheSp.board_piece_tap_class(place_by(x, y))"
            :piece_texture_class="TheSp.xcontainer.soldier_css_class_list(place_by(x, y))"
            :mark_pos_key="place_by(x, y).to_mark_pos_key"
            )
</template>

<script>
import _ from "lodash"

import { support } from "./support.js"
import { Board   } from "./models/board.js"
import { Place   } from "./models/place.js"

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
    place_by(px, py) {
      const px2 = this.TheSp.sp_board_view_x + px
      const py2 = this.TheSp.sp_board_view_y + py
      const place = Place.fetch([px2, py2])
      if (this.TheSp.fliped) {
        return place.half_spin
      }
      return place
    },

    cell_class(px, py) {
      const place = this.place_by(px, py)
      let list = [place.even_or_odd]
      const fn = this.TheSp.sp_board_cell_class_fn
      if (fn) {
        list = _.concat(list, fn(place))
      }
      if (this.star_cell_p(px, py, place)) {
        list.push("is_star")
      }
      return list
    },

    star_cell_p(px, py, place) {
      // 端かそれより外であれば星を書かない
      // 単に見た目の問題で表示しないのではない
      // 必ずこうしないとスタイルが座標表示と重なってしまう
      if (!this.star_cell_candidate_p(px, py)) {
        return
      }

      if (this.TheSp.sp_star_step === 0) {
        return
      }

      const hx = place.human_x - 1
      const hy = place.human_y - 1
      return true &&
        (hx % this.TheSp.sp_star_step) === 0 &&
        (hy % this.TheSp.sp_star_step) === 0 &&
        true
    },

    // 範囲的な意味で物理座標(px,py)にあるセルは星を書く担当に含まれるか？
    // 例えば3x3のときは、
    // +---+---+---|
    // |   |   |   |
    // +---+---+---|
    // | o | o |   |
    // +---+---+---|
    // | o | o |   |
    // +---+---+---|
    // 担当のセルは「右上に星を書く」ので3x3のうちの左下の2x2が担当セルになる
    // sp_star_step を 1 にするとこの範囲を正確に確認できる
    star_cell_candidate_p(px, py) {
      return true &&
        0 <= px && px < (this.TheSp.sp_board_view_w - 1) &&
        0 <  py && px < (this.TheSp.sp_board_view_h - 1) &&
        true
    },

    cell_style(place) {
      return {
        "--cell_human_x": place.human_x,
        "--cell_human_y": place.human_y,
      }
    },
  },
}
</script>

<style lang="sass">
@import "./support.sass"

@import "./MainBoard/coordinate.sass"
@import "./MainBoard/board_variant.sass"

// 外枠 border をどこに適用するか？
// |-------------------+--------------------------+------------------------------------+------------------------------------+------|
// | 場所              | よい                     | だめ                               | 備考                               | 結果 |
// |-------------------+--------------------------+------------------------------------+------------------------------------+------|
// | MainBoard         | わかりやすい             | Chromeで隙間ができる               | わかりやすい気がしていただけ       |      |
// | BoardTexture      | 角を丸めても縁取りできる | 影の影響がある                     | 画像に縁取りできても別に嬉しくない |      |
// | table.BoardMatrix | 普通に考えてここ         | グリッドと外枠に隙間が入れられない | 隙間を入れれても嬉しくない         | ←   |
// |-------------------+--------------------------+------------------------------------+------------------------------------+------|

.ShogiPlayer
  // 全体背景と同じ構成
  +defvar(sp_board_color, hsla(0, 0%, 0%, 0.2))      // 盤の色
  +defvar(sp_board_even_cell_color, transparent) // セルの色
  +defvar(sp_board_odd_cell_color,  transparent) // セルの色
  +defvar(sp_board_image, none)                    // 盤画像

  +defvar(sp_board_padding, 0.015)                 // 盤の隅の隙間
  +defvar(sp_board_radius, 5)                      // 盤の隅の丸め度合い

  +defvar(sp_grid_outer_stroke, 0)                 // グリッドの外枠の太さ(紙面風のとき)
  +defvar(sp_grid_outer_color, hsla(0, 0%, 0%, 0.5)) // グリッド外枠色
  +defvar(sp_grid_inner_color, hsla(0, 0%, 0%, 0.5))       // グリッド色
  +defvar(sp_grid_inner_stroke, 1)                       // グリッド太さ
  +defvar(sp_board_edge_stroke, 0)    // 盤背景の縁取りの太さ(影の影響あり)
  +defvar(sp_star_size, 0.1)                  // 星の大きさ
  +defvar(sp_star_z_index, 0)                 // 星の z-index (符号の鬼ではタップの邪魔にならないよう -1 にする)

  .MainBoard
    width: 100%
    height: 100%
    +is_overlay_origin

  .BoardTexture
    background-color: var(--sp_board_color)  // 背景色は画像の透明な部分があれば見えるので画像があっても無駄にはならない
    +is_background_cover_by_image
    background-image: var(--sp_board_image)  // none でスルーする
    // background-image: url("../assets/inspect/256x256.png")

    border-radius: calc(var(--sp_board_radius) * 1px)
    border: calc(var(--sp_board_edge_stroke) * 1px) solid var(--sp_board_edge_color, var(--sp_grid_outer_color)) // 画像の輪郭で影の影響あり

  .BoardMatrixWithPadding
    padding: calc(var(--sp_board_padding) * 100%)

  //- flex に移行しやすいように table, tr, td 使用禁止
  .BoardMatrix
    width: 100%
    height: 100%
    border: calc(var(--sp_grid_outer_stroke) * 1px) solid var(--sp_grid_outer_color)
    border-collapse: collapse // td同士のborderを共有する

    table-layout: fixed    // 横幅均等

  .BoardCell
    // 何もしなければ縦幅は均等になる
    border: calc(var(--sp_grid_inner_stroke) * 1px) solid var(--sp_grid_inner_color) // border-collapse: collapse の効果で重ならない

    // 縦幅はブラウザによって異なるので難しい
    // Google Chrome 90.0.4430.216 までは指定なしで均等だったが、
    // Google Chrome 91.0.4472.77  からは最初と最後の行だけ1.2倍ほど広がり均等でなくなった
    // Firefox ではまったく均等にしないためセルが表示されない
    // そのため明示的に指定するようにした。これによって対象外としていた Firefox でも見れるようになった
    // ちなみに flex であれば height: 100% で均等になる
    // max は0除算対策
    height: calc(100.0% / max(1, var(--sp_board_view_h)))

    &.even
      background-color: var(--sp_board_even_cell_color)
    &.odd
      background-color: var(--sp_board_odd_cell_color)

  // border が BoardTexture に負けるので入れ子にしている
  // td
  //   +is_overlay_origin
  //   .CellBorder
  //     +is_overlay_block
  //     // border: calc(var(--sp_grid_inner_stroke) * 1px) solid var(--sp_grid_inner_color)

  // 星
  .BoardCell
    &.is_star
      // background-color: blue

      position: relative
      &:after
        position: absolute
        content: ""
        // "%" で指定すると長方形になってしまう
        // sp_cell_h だけを基準にすると正方形になる
        // 中央が右下にずれているので半ピクセル調整する
        top:   calc(var(--sp_cell_h) * var(--sp_star_size) * -0.5 - 0.5px)
        right: calc(var(--sp_cell_h) * var(--sp_star_size) * -0.5 - 0.5px)
        width:  calc(var(--sp_cell_h) * var(--sp_star_size))
        height: calc(var(--sp_cell_h) * var(--sp_star_size))
        // top: 0
        // right:   0
        // width:  calc(var(--sp_cell_h) * 0.5)
        // height: calc(var(--sp_cell_h) * 0.5)
        border-radius: 50%
        background-color: var(--sp_star_color, var(--sp_grid_outer_color))
        z-index: var(--sp_star_z_index)
        pointer-events: none // タップの邪魔をしないようにするため

  &.is_layer_on
    .BoardCell
      &.is_star
        +is_layer_border($primary, 4)

  // // 2. 最初と最後の行 (上端 tr:first-child / 下端 tr:last-child)
  // .BoardMatrix
  //   .BoardRow:first-child,.BoardRow:last-child
  //     .BoardCell.is_star:after
  //       content: none
</style>
