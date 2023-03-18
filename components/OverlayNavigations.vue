<template lang="pug">
.OverlayNavigations(v-if="TheSp.sp_overlay_nav")
  .OverlayNavigationItem.previous(          @click.stop.prevent="TheSp.api_turn_add(-1, {interactive: $event})")
  .OverlayNavigationItem.next(              @click.stop.prevent="TheSp.api_turn_add(+1, {interactive: $event})")
  .OverlayNavigationItem.flip_trigger_cell( @click.stop.prevent="TheSp.viewpoint_flip_handle")
</template>

<script>
import { support } from "./support.js"

export default {
  name: "OverlayNavigations",
  mixins: [support],
}
</script>

<style lang="sass">
@import "./support.sass"

.ShogiPlayer
  &.is_mode_view
    .OverlayNavigationItem
      // background-color: change_color($primary, $alpha: 0.5)

      position: absolute
      z-index: $overlay_navigation_item_z
      width: 50% // クリックできるエリアを横に広げるとモバイルのときに画面の右に隙間ができてしまうの盤の幅以上広げはいけない
      height: 100%
      -webkit-tap-highlight-color: transparent

      &.previous
        left: 0                 // 左端から50%
      &.next
        right: 0                // 右端から50%
      &.flip_trigger_cell       // 天王山あたり(パディングを考慮していないため正確に合っているわけではない)
        z-index: $flip_trigger_cell_z

        // (100% / 9) は間違い。テーブルのパディングがあるため正しいセルのサイズは出ない
        // 中心の左上半分から [sp_cell_w, sp_cell_h] のサイズとするのが正しい

        left: calc(50% - var(--sp_cell_w) / 2)    // 中央からセルの横半分左に移動する
        width: var(--sp_cell_w)
        top: calc(50% - var(--sp_cell_h) / 2)     // 中央からセルの縦半分上に移動する
        height: var(--sp_cell_h)

      //////////////////////////////////////////////////////////////////////////////// cursor
      cursor: pointer
      &.previous
        cursor: w-resize
      &.next
        cursor: e-resize
      &.flip_trigger_cell
        cursor: ns-resize
</style>
