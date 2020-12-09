<template lang="pug">
.PieceObjectCount.is-unselectable(v-if="count >= 2")
  | {{count}}
</template>

<script>
import { support } from "./support.js"

export default {
  name: "PieceObjectCount",
  mixins: [support],
  props: {
    count: { type: Number, required: true },
  },
}
</script>

<style lang="sass">
@import "./support.sass"

.ShogiPlayerGround
  --sp_piece_count_gap_right: 86%                      // 駒数の駒右端からのオフセット(横配置時)
  --sp_piece_count_gap_bottom: 47%                     // 駒数の駒底辺からのオフセット(縦配置時)
  --sp_piece_count_font_size: 0.75rem                  // 駒数の文字サイズ
  --sp_piece_count_font_color:  rgba(0, 0, 0, 0.75)    // 駒数の文字色
  --sp_piece_count_bg_color: rgba(255, 255, 255, 0.75) // 駒数の文字色背景
  --sp_piece_count_padding: 3px                        // 駒数のパディング

  //////////////////////////////////////////////////////////////////////////////// 本当に共通のもの
  .PieceObjectCount
    font-size: var(--sp_piece_count_font_size)
    line-height: 100%
    background-color: var(--sp_piece_count_bg_color)
    border-radius: 50%

    padding: var(--sp_piece_count_padding)
    color: var(--sp_piece_count_font_color)
    font-weight: bold

    z-index: 1         // 駒数が Membership の下に潜るのを防ぐ
    position: relative // 相対的にずらすため、かつ z-index 用

  &.is_layer_on
    .PieceObjectCount
      border: 1px dashed change_color($primary, $alpha: 0.5)

  //////////////////////////////////////////////////////////////////////////////// 全体横並びの場合は横に広く表示
  &.is_horizontal
    .PieceTexture
      display: flex
      justify-content: center
      align-items: center
    .PieceObjectCount
      top:    unset
      bottom: unset
      right:  unset
      left:   unset
    .is_white
      .PieceObjectCount
        right: var(--sp_piece_count_gap_right) // 右端から横幅分押すと左端の外になる
        transform: rotate(180deg) // 上下対象にするため(反転時にそのままでよくなるが、先手からは読みにくい)
    .is_black
      .PieceObjectCount
        left: var(--sp_piece_count_gap_right)  // 左端から横幅分押すと右端の外になる

  //////////////////////////////////////////////////////////////////////////////// 全体縦並びの場合

  =is_vertical_style
    .Membership
      .PieceTexture
        display: flex
        justify-content: center
        align-items: center
      .PieceObjectCount
        top:    unset     // is_horizontal の状態で mobile 表示するときこれらをリセットしないとパラメータがまざってしまう
        bottom: unset
        right:  unset
        left:   unset
      &.is_white
        .PieceObjectCount
          bottom: var(--sp_piece_count_gap_bottom)
          transform: rotate(180deg) // 上下対象にするため(反転時にそのままでよくなるが、先手からは読みにくい)
      &.is_black
        .PieceObjectCount
          top: var(--sp_piece_count_gap_bottom)
  &.is_vertical
    +is_vertical_style
  +mobile
    &.is_mobile_style
      +is_vertical_style

  //////////////////////////////////////////////////////////////////////////////// 駒箱
  .PieceBox
    .PieceTexture
      display: flex
      justify-content: center
      align-items: center
    .PieceObjectCount
      top: var(--sp_piece_count_gap_bottom)
</style>
