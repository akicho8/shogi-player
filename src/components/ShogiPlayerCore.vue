<template lang="pug">
.ShogiPlayerCore.is-flex(:class="[base.new_flip ? 'is_flip_on' : 'is_flip_off']")
  Membership(:base="base" :location="base.location_white")
    // b-button.mr-1(icon-left="cog" @click="base.setting_modal_p = true" v-if="base.setting_button_show" size="is-small")
  AspectRatioFixedBlock
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

import { support } from "./support.js"

export default {
  name: "ShogiPlayerCore",
  mixins: [support],
  components: {
    Membership,
    AspectRatioFixedBlock,
    BoardOuter,
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayerPure
  .ShogiPlayerCore
    // 縦横関係なく中央に寄せる
    display: flex
    align-items: center
    justify-content: center

  // |---------+----------------+--------------+--------------------------------------|
  // |         | .is_horizontal | .is_vertical | 備考                                 |
  // |---------+----------------+--------------+--------------------------------------|
  // | +tablet | row            | column       | 画面が広いので切り替え可             |
  // | +mobile | column         | column       | 画面幅を最大に使いたいので常に縦配置 |
  // |---------+----------------+--------------+--------------------------------------|
  +tablet
    &.is_horizontal
      .ShogiPlayerCore
        flex-direction: row
    &.is_vertical
      .ShogiPlayerCore
        flex-direction: column
  +mobile
    .ShogiPlayerCore
      flex-direction: column

  // 反転
  transform: rotate(0deg)
  transition: all 0.4s 0s ease-in-out
  &.is_flip_off
  &.is_flip_on
    @extend %is_flip

  .overlay_navi
    cursor: pointer
    &.previous
      cursor: w-resize
    &.next
      cursor: e-resize
    &.flip_trigger_cell
      cursor: ns-resize
  .is_flip_on
    .overlay_navi
      &.previous
        cursor: e-resize
      &.next
        cursor: w-resize
</style>
