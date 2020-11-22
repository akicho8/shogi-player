<template lang="pug">
.ControllerBlock(v-if="base.view_p || base.play_p")
  .controller_group.buttons.has-addons.is-centered.is-paddingless(v-if="base.controller_show")
    button.button.first(    ref="first"    @click.stop.prevent="base.move_to_first"):             b-icon(icon="menu-left")
    button.button.previous( ref="previous" @click.stop.prevent="base.relative_move(-1, $event)"): b-icon(icon="chevron-left"  size="is-small")
    button.button.next(     ref="next"     @click.stop.prevent="base.relative_move(+1, $event)"): b-icon(icon="chevron-right" size="is-small")
    button.button.last(     ref="last"     @click.stop.prevent="base.move_to_last"):              b-icon(icon="menu-right")
    button.button.flip(                    @click.stop.prevent="base.board_flip_run"):            b-icon(icon="swap-vertical" size="is-small")
  .is-flex.is-justify-content-center(v-if="base.slider_show")
    input.turn_slider(type="range" :value="base.turn_offset" @input="base.current_turn_set($event.target.value)" :min="base.turn_offset_min" :max="base.turn_offset_max" ref="turn_slider")
</template>

<script>
import { support } from "./support.js"

export default {
  name: "ControllerBlock",
  mixins: [support],
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayerPure
  .ControllerBlock
    .controller_group
      margin-top: 0.8rem
      &.buttons
        margin-bottom: 0
        .button
          margin-bottom: 0
          &.first
            width: 3rem
          &.previous
            width: 5rem
          &.next
            width: 7rem
          &.last
            width: 3rem
          &.flip
            width: 2.5rem

    .turn_slider
      border: 1px dashed change_color($primary, $alpha: 0.5)
      margin-top: 0.5rem
      cursor: pointer
      width: 20rem
</style>
