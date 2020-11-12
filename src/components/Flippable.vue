<template lang="pug">
.Flippable.is-flex(:class="[base.new_flip ? 'view_point_white' : 'view_point_black']")
  Membership(:base="base" :location="base.location_white")
  AspectRatioFixedBlock(:rwidth="1" :rheight="1.05")
    template(v-if="base.overlay_navi")
      .overlay_navi.previous(@click.stop.prevent="base.navi_relative_move(-1, $event)")
      .overlay_navi.next(@click.stop.prevent="base.navi_relative_move(+1, $event)")
      .overlay_navi.flip_trigger_cell(@click.stop.prevent="base.board_flip_run")
    BoardOuter(:base="base")
  Membership(:base="base" :location="base.location_black")
</template>

<script>
import Membership            from "./Membership.vue"
import AspectRatioFixedBlock from "./AspectRatioFixedBlock.vue"
import BoardOuter            from "./BoardOuter.vue"

import { support_child } from "./support_child.js"

export default {
  name: 'Flippable',
  mixins: [support_child],
  components: {
    Membership,
    AspectRatioFixedBlock,
    BoardOuter,
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.shogi-player
  .Flippable
    width: 100%

    flex-direction: column
    align-items: center

    // 反転
    transform: rotate(0deg)
    transition: all 0.2s 0s ease-in-out
    &.view_point_white
      @extend %is_flip

    .overlay_navi
      cursor: pointer
      &.previous
        cursor: w-resize
      &.next
        cursor: e-resize
      &.flip_trigger_cell
        cursor: ns-resize
    .view_point_white
      .overlay_navi
        &.previous
          cursor: e-resize
        &.next
          cursor: w-resize
</style>
