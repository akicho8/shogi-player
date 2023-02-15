<template lang="pug">
.NavigateBlock(v-if="TheSp.inside_navigate_p")
  .NavigateBlockInside
    .buttons.are-small.has-addons.is-centered.is-paddingless(v-if="TheSp.inside_controller_p")
      template(v-if="TheSp.inside_controller_p")
        button.button.first(    ref="first"    @click.stop.prevent="TheSp.move_to_first"):             b-icon(icon="menu-left")
        button.button.previous( ref="previous" @click.stop.prevent="TheSp.relative_move(-1, $event)"): b-icon(icon="chevron-left"  size="is-small")
        button.button.next(     ref="next"     @click.stop.prevent="TheSp.relative_move(+1, $event)"): b-icon(icon="chevron-right" size="is-small")
        button.button.last(     ref="last"     @click.stop.prevent="TheSp.move_to_last"):              b-icon(icon="menu-right")
      template(v-if="false")
        button.button.flip(                    @click.stop.prevent="TheSp.viewpoint_flip_handle"):            b-icon(icon="swap-vertical" size="is-small")
      template(v-if="TheSp.sp_setting === 'is_setting_on'")
        button.button.setting(                 @click.stop.prevent="TheSp.setting_modal_p = true"):    b-icon(icon="cog"   size="is-small")
    TurnSliderBlock( ref="TurnSliderBlock")
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
    this.TheSp.$NavigateBlock = this // どこからでも refs するための荒技
  },
}
</script>

<style lang="sass">
@import "./support.sass"

.ShogiPlayerGround
  +defvar(sp_controller_width, 0.5)        // コントローラー横幅
  +defvar(sp_controller_width_mobile, 0.8) // コントローラー横幅(モバイル時)

  .NavigateBlock
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column

  .NavigateBlockInside
    +tablet
      min-width: calc(var(--sp_controller_width) * 100%)
    +mobile
      width: calc(var(--sp_controller_width_mobile) * 100%)

  .NavigateBlock
    .buttons
      margin-bottom: 0
      .button
        // &:focus-visible
        &:focus
          outline: none // Google Chrome では変化ない？
        margin-bottom: 0
        &.first, &.last
          width: 2rem
          flex-grow: 0
        &.previous, &.next
          flex-grow: 1
        &.setting
          width: 2rem

  &.is_layer_on
    .NavigateBlock, .NavigateBlockInside
      +is_layer_border($danger)

  ////////////////////////////////////////////////////////////////////////////////
  +IF_HORIZONTAL
    .NavigateBlock
      margin-top: var(--sp_common_gap_real_px)
  +IF_VERTICAL
    .NavigateBlock
      margin-top: var(--sp_common_gap_real_px)
</style>
