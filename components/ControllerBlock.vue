<template lang="pug">
.ControllerBlock
  .buttons.has-addons.is-centered.is-paddingless(v-if="base.setting_button_show || controll_buttons_show_p")
    template(v-if="controll_buttons_show_p")
      button.button.first(    ref="first"    @click.stop.prevent="base.move_to_first"):             b-icon(icon="menu-left")
      button.button.previous( ref="previous" @click.stop.prevent="base.relative_move(-1, $event)"): b-icon(icon="chevron-left"  size="is-small")
      button.button.next(     ref="next"     @click.stop.prevent="base.relative_move(+1, $event)"): b-icon(icon="chevron-right" size="is-small")
      button.button.last(     ref="last"     @click.stop.prevent="base.move_to_last"):              b-icon(icon="menu-right")
      button.button.flip(                    @click.stop.prevent="base.board_flip_run"):            b-icon(icon="swap-vertical" size="is-small")
    template(v-if="base.setting_button_show")
      button.button.setting(                 @click.stop.prevent="base.setting_modal_p = true"):    b-icon(icon="cog"   size="is-small")
  .is-flex.is-justify-content-center(v-if="base.slider_show")
    input.turn_slider(type="range" :value="base.turn_offset" @input="base.current_turn_set($event.target.value)" :min="base.turn_offset_min" :max="base.turn_offset_max" ref="turn_slider")
</template>

<script>
import { support } from "./support.js"

export default {
  name: "ControllerBlock",
  mixins: [support],
  mounted() {
    this.base.$ControllerBlock = this // どこからでも refs するための荒技
  },
  computed: {
    controll_buttons_show_p() {
      return this.base.controller_show && (this.base.view_p || this.base.play_p)
    },
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayerGround
  .ControllerBlock
    .buttons
      margin: 0.8rem 0 0
      .button
        margin-bottom: 0
        &.first
          width: 3rem
        &.previous
          width: 6rem
        &.next
          width: 6rem
        &.last
          width: 3rem
        &.flip
          width: 2.5rem
        &.setting
          width: 2.5rem
    .turn_slider
      margin: 0.6rem 0
      cursor: pointer
      width: calc(3rem + 6rem + 6rem + 3rem + 2.5rem)
</style>
