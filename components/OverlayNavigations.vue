<template lang="pug">
.OverlayNavigations(v-if="base.overlay_navi")
  .OverlayNavigationItem.previous(          @click.stop.prevent="base.navi_relative_move(-1, $event)")
  .OverlayNavigationItem.next(              @click.stop.prevent="base.navi_relative_move(+1, $event)")
  .OverlayNavigationItem.flip_trigger_cell( @click.stop.prevent="base.board_flip_toggle")
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
  &.run_mode-view_mode
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
        left: calc(50% - ((100% / var(--sp_board_dimension)) / 2))
        width: calc((100% / var(--sp_board_dimension)))
        top:  calc(50% - ((100% / var(--sp_board_dimension)) / 2))
        height: calc((100% / var(--sp_board_dimension)))

      //////////////////////////////////////////////////////////////////////////////// cursor
      cursor: pointer
      &.previous
        cursor: w-resize
      &.next
        cursor: e-resize
      &.flip_trigger_cell
        cursor: ns-resize
</style>
