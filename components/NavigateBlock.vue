<template lang="pug">
.NavigateBlock(v-if="base.inside_navigate_p")
  .buttons.are-small.has-addons.is-centered.is-paddingless(v-if="base.inside_controller_show_p")
    template(v-if="base.inside_controller_show_p")
      button.button.first(    ref="first"    @click.stop.prevent="base.move_to_first"):             b-icon(icon="menu-left")
      button.button.previous( ref="previous" @click.stop.prevent="base.relative_move(-1, $event)"): b-icon(icon="chevron-left"  size="is-small")
      button.button.next(     ref="next"     @click.stop.prevent="base.relative_move(+1, $event)"): b-icon(icon="chevron-right" size="is-small")
      button.button.last(     ref="last"     @click.stop.prevent="base.move_to_last"):              b-icon(icon="menu-right")
    template(v-if="false")
      button.button.flip(                    @click.stop.prevent="base.board_flip_toggle"):            b-icon(icon="swap-vertical" size="is-small")
    template(v-if="base.setting_button_show")
      button.button.setting(                 @click.stop.prevent="base.setting_modal_p = true"):    b-icon(icon="cog"   size="is-small")
  TurnSliderBlock(:base="base" ref="TurnSliderBlock")
</template>

<script>
import { support } from "./support.js"
import TurnSliderBlock from "./TurnSliderBlock.vue"

export default {
  name: "NavigateBlock",
  mixins: [support],
  components: {
    TurnSliderBlock,
  },
  mounted() {
    this.base.$NavigateBlock = this // どこからでも refs するための荒技
  },
}
</script>

<style lang="sass">
@import "./support.sass"

.ShogiPlayerGround
  .NavigateBlock
    .buttons
      margin-bottom: 0
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

  &.is_layer_on
    .NavigateBlock
      +is_layer_border($danger)

  ////////////////////////////////////////////////////////////////////////////////
  &.is_horizontal
    .NavigateBlock
      margin-top: var(--sp_common_gap)
  +IS_VERTICAL_OR_MOBILE
    .NavigateBlock
      margin-top: 0 // 少し開けた方がいいかな？
</style>
