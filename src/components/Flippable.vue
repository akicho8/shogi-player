<template lang="pug">
.Flippable.is-flex(:class="[base.new_flip ? 'flip_on' : 'flip_off']")
  Membership(:base="base" :location="base.location_white")
    b-button.mr-1(icon-left="cog" @click="base.setting_modal_p = true" v-if="base.setting_button_show" size="is-small")
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
  name: "Flippable",
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

    // 反転
    transform: rotate(0deg)
    transition: all 0.2s 0s ease-in-out
    &.flip_on
      @extend %is_flip

    .overlay_navi
      cursor: pointer
      &.previous
        cursor: w-resize
      &.next
        cursor: e-resize
      &.flip_trigger_cell
        cursor: ns-resize
    .flip_on
      .overlay_navi
        &.previous
          cursor: e-resize
        &.next
          cursor: w-resize

  // 縦並び
  &.vertical
    .Flippable
      flex-direction: column
      align-items: center
</style>

