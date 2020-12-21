<template lang="pug">
.BoardOuter
  // .BoardOuter に設定した background-image に影をつけるために drop-shadow すると
  // .BoardOuter その子供である table にまで影が適用されてしまう
  // table に影が適用されると、駒の影にも .BoardOuter の影が加算されてしまい濃くなってしまう
  // それを防ぐためには .BoardOuter の :after に背景を指定すればよい
  // が、わかりやすくするために背景専用の BoardOuterBG を追加した
  // これなら BoardOuterTexture に適用した影が table に影響しない
  .BoardOuterTexture

  table.BoardInner
    tr(v-for="(_, y) in base.mediator.dimension")
      td(v-for="(_, x) in base.mediator.dimension")
        PieceObject(:base="base" :piece_texture_class="base.mediator.board_piece_fore_class([x, y])")
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
  // 全体背景と同じ構成
  +defvar(sp_board_color, rgba(0, 0, 0, 0.2))   // 盤の色
  +defvar(sp_board_image, none)                 // 背景画像
  +defvar(sp_board_blur, 0)                     // ぼかし
  +defvar(sp_board_grayscale, 0%)               // グレースケール
  +defvar(sp_board_contrast, 1.0)           // 駒コントラスト
  +defvar(sp_board_invert, 0)               // 駒色反転
  +defvar(sp_board_hue, 1.0)                    // 色相
  +defvar(sp_board_saturate, 1.0)               // 彩度
  +defvar(sp_board_brightness, 1.0)             // 輝度

  +defvar(sp_board_opacity, 1.0)                // 非半透明度
  +defvar(sp_board_padding, 1.5)                // 盤の隅の隙間
  +defvar(sp_board_radius, 5)                   // 盤の隅の丸め度合い

  +defvar(sp_grid_outer_stroke, 1.5)              // グリッドの外枠の太さ(紙面風のとき)
  +defvar(sp_grid_outer_color, rgba(0, 0, 0, 0.5))   // グリッド外枠色
  +defvar(sp_grid_color, rgba(0, 0, 0, 0.5))    // グリッド色
  +defvar(sp_grid_stroke, 1)                    // グリッド太さ
  +defvar(sp_grid_outer_texture_edge_stroke, 0) // 盤背景の縁取りの太さ(影の影響あり)
  +defvar(sp_grid_star, 10%)                    // 星の大きさ

  .BoardOuter
    width: 100%
    height: 100%
    padding: calc(var(--sp_board_padding) * 1%)

  .BoardOuter
    +is_overlay_origin
  .BoardOuterTexture
    +is_overlay_block
    mix-blend-mode: difference

    background-color: var(--sp_board_color)  // 背景色は画像の透明な部分があれば見えるので画像があっても無駄にはならない
    +is_background_cover_by_image
    background-image: var(--sp_board_image)  // none でスルーする
    background-image: url("../assets/inspect/256x256.png")

    border-radius: calc(var(--sp_board_radius) * 1px)
    border: calc(var(--sp_grid_outer_texture_edge_stroke) * 1px) solid var(--sp_grid_outer_color) // 画像の輪郭で影の影響あり

  .BoardInner
    width: 100%
    height: 100%
    border: calc(var(--sp_grid_outer_stroke) * 1px) solid var(--sp_grid_outer_color)
  td
    height: calc(100% / var(--sp_dimension)) // 縦幅均等
</style>
