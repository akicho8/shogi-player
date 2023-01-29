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
  +defvar(sp_piece_count_horizontal_x, 0.43)                              // 駒数の中央からの相対位置X(%) (横配置時)
  +defvar(sp_piece_count_horizontal_y, 0.30)                              // 駒数の中央からの相対位置Y(%) (横配置時)
  +defvar(sp_piece_count_vertical_x, 0.0)                               // 駒数の中央からの相対位置X(%) (縦配置時)
  +defvar(sp_piece_count_vertical_y, 0.47)                              // 駒数の中央からの相対位置y(%) (縦配置時)
  +defvar(sp_piece_count_font_size_rate, 0.2)                      // 駒数の文字サイズ(駒セル縦幅に対する比率)
  +defvar(sp_piece_count_font_color, rgba(0, 0, 0, 0.75))     // 駒数の文字色
  +defvar(sp_piece_count_bg_color, rgba(255, 255, 255, 0.9))  // 駒数の文字色背景
  +defvar(sp_piece_count_padding_rate, 0.08)                        // 駒数のパディング(駒セル縦幅に対する比率)

  //////////////////////////////////////////////////////////////////////////////// 本当に共通のもの

  .PieceTexture
    display: flex               // PieceCount を中央配置させるため
    justify-content: center
    align-items: center

  .PieceCount
    @extend %is_piece_count_color_set
    font-size: calc(var(--sp_base_h) * var(--sp_piece_count_font_size_rate))
    padding:   calc(var(--sp_base_w) * var(--sp_piece_count_padding_rate)) calc(var(--sp_base_h) * var(--sp_piece_count_padding_rate))

    line-height: 100%
    border-radius: 50%
    font-weight: bold

    z-index: $piece_count_z // 駒数が Membership の下に潜るのを防ぐ
    position: relative // 相対的にずらすため、かつ z-index 用

  &.is_layer_on
    .PieceCount
      +is_layer_border

  //////////////////////////////////////////////////////////////////////////////// 全体横並びの場合は横に広く表示
  +IS_HORIZONTAL
    .Membership
      &.is_position_north
        .PieceCount
          +is_flip // 上下対象にするため(反転時にそのままでよくなるが、先手からは読みにくい)
          right:   calc(var(--sp_piece_count_horizontal_x) * 100%)
          bottom:  calc(var(--sp_piece_count_horizontal_y) * 100%)
      &.is_position_south
        .PieceCount
          left:  calc(var(--sp_piece_count_horizontal_x) * 100%)
          top:   calc(var(--sp_piece_count_horizontal_y) * 100%)

  //////////////////////////////////////////////////////////////////////////////// 全体縦並びの場合

  +IS_VERTICAL
    .Membership
      &.is_position_north
        .PieceCount
          +is_flip // 上下対象にするため(反転時にそのままでよくなるが、先手からは読みにくい)
          right:  calc(var(--sp_piece_count_vertical_x) * 100%)
          bottom: calc(var(--sp_piece_count_vertical_y) * 100%)
      &.is_position_south
        .PieceCount
          left: calc(var(--sp_piece_count_vertical_x) * 100%)
          top:  calc(var(--sp_piece_count_vertical_y) * 100%)

  //////////////////////////////////////////////////////////////////////////////// 駒箱
  .PieceBox
    .PieceCount
      left: calc(var(--sp_piece_count_vertical_x) * 100%)
      top:  calc(var(--sp_piece_count_vertical_y) * 100%)
</style>
