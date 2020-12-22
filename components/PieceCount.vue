<template lang="pug">
.PieceCount.is-unselectable(v-if="count >= 2")
  | {{count}}
</template>

<script>
import { support } from "./support.js"

export default {
  name: "PieceCount",
  mixins: [support],
  props: {
    count: { type: Number, required: true },
  },
}
</script>

<style lang="sass">
@import "./support.sass"

.ShogiPlayerGround
  +defvar(sp_piece_count_gap_right, 62%)                      // 駒数の駒右端からのオフセット(横配置時)
  +defvar(sp_piece_count_gap_bottom, 32%)                     // 駒数の駒底辺からのオフセット(縦配置時)
  +defvar(sp_piece_count_font_size, 0.75rem)                  // 駒数の文字サイズ
  +defvar(sp_piece_count_font_color, rgba(0, 0, 0, 0.75))     // 駒数の文字色
  +defvar(sp_piece_count_bg_color, rgba(255, 255, 255, 0.75)) // 駒数の文字色背景
  +defvar(sp_piece_count_padding, 3px)                        // 駒数のパディング

  //////////////////////////////////////////////////////////////////////////////// 本当に共通のもの
  .PieceCount
    @extend %is_piece_count_color_set
    font-size:        var(--sp_piece_count_font_size)
    padding:          var(--sp_piece_count_padding)

    line-height: 100%
    border-radius: 50%
    font-weight: bold

    z-index: 1         // 駒数が Membership の下に潜るのを防ぐ
    position: relative // 相対的にずらすため、かつ z-index 用

  &.is_layer_on
    .PieceCount
      +is_layer_border

  //////////////////////////////////////////////////////////////////////////////// 全体横並びの場合は横に広く表示
  +IS_HORIZONTAL_ONLY
    .PieceTexture
      display: flex
      justify-content: center
      align-items: center
    .PieceCount
      top:    unset
      bottom: unset
      right:  unset
      left:   unset
    .is_white
      .PieceCount
        right: var(--sp_piece_count_gap_right) // 右端から横幅分押すと左端の外になる
        transform: rotate(180deg) // 上下対象にするため(反転時にそのままでよくなるが、先手からは読みにくい)
    .is_black
      .PieceCount
        left: var(--sp_piece_count_gap_right)  // 左端から横幅分押すと右端の外になる

  //////////////////////////////////////////////////////////////////////////////// 全体縦並びの場合

  +IS_VERTICAL_OR_MOBILE
    .Membership
      .PieceTexture
        display: flex
        justify-content: center
        align-items: center
      .PieceCount
        top:    unset     // is_horizontal の状態で mobile 表示するときこれらをリセットしないとパラメータがまざってしまう
        bottom: unset
        right:  unset
        left:   unset
      &.is_white
        .PieceCount
          bottom: var(--sp_piece_count_gap_bottom)
          transform: rotate(180deg) // 上下対象にするため(反転時にそのままでよくなるが、先手からは読みにくい)
      &.is_black
        .PieceCount
          top: var(--sp_piece_count_gap_bottom)

  //////////////////////////////////////////////////////////////////////////////// 駒箱
  .PieceBox
    .PieceTexture
      display: flex
      justify-content: center
      align-items: center
    .PieceCount
      top: var(--sp_piece_count_gap_bottom)
</style>
