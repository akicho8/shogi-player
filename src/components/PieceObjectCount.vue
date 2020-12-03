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
  --sp_piece_object_count_gap_right: 86%      // 駒数の位置(横配置時)
  --sp_piece_object_count_gap_bottom: 100%    // 駒数の位置(縦配置時)
  --sp_piece_object_count_font_size: 0.75rem  // 駒数の文字サイズ
  --sp_piece_object_count_font_color: #000000 // 駒数の文字色

  //////////////////////////////////////////////////////////////////////////////// 本当に共通のもの
  .PieceObjectCount
    color: var(--sp_piece_object_count_font_color)
    font-size: var(--sp_piece_object_count_font_size)
    font-weight: bold
    z-index: 1            // 駒画像の下に潜るのを防ぐため

  &.is_layer_on
    .PieceObjectCount
      border: 1px dashed change_color($primary, $alpha: 0.5)
      line-height: 100%

  //////////////////////////////////////////////////////////////////////////////// 全体横並びの場合は横に広く表示
  &.is_horizontal
    .PieceTexture
      position: relative
    .PieceObjectCount
      position: absolute
      top: 0
      bottom: 0

      display: flex
      justify-content: center
      align-items: center

    .is_white
      .PieceObjectCount
        right: var(--sp_piece_object_count_gap_right) // 右端から横幅分押すと左端の外になる
        transform: rotate(180deg) // 上下対象にするため(反転時にそのままでよくなるが、先手からは読みにくい)
    .is_black
      .PieceObjectCount
        left: var(--sp_piece_object_count_gap_right)  // 左端から横幅分押すと右端の外になる

  //////////////////////////////////////////////////////////////////////////////// 全体縦並びの場合
  &.is_vertical
    .PieceTexture
      position: relative
    .PieceObjectCount
      position: absolute
      left: 0
      right: 0

      display: flex
      justify-content: center
      align-items: center

    .Membership
      &.is_white
        .PieceObjectCount
          bottom: var(--sp_piece_object_count_gap_bottom)
          transform: rotate(180deg) // 上下対象にするため(反転時にそのままでよくなるが、先手からは読みにくい)
      &.is_black
        .PieceObjectCount
          top: var(--sp_piece_object_count_gap_bottom)

    .PieceBox
      .PieceObjectCount
        top: var(--sp_piece_object_count_gap_bottom)
</style>
