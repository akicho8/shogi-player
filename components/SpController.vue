<template lang="pug">
.SpController.buttons.are-small.has-addons.is-centered.is-paddingless
  template(v-if="TheSp.inside_controller_p")
    button.button.first(    ref="first"    @click.stop.prevent="TheSp.move_to_first"):             b-icon(icon="menu-left")
    button.button.previous( ref="previous" @click.stop.prevent="TheSp.relative_move(-1, $event)"): b-icon(icon="chevron-left"  size="is-small")
    button.button.next(     ref="next"     @click.stop.prevent="TheSp.relative_move(+1, $event)"): b-icon(icon="chevron-right" size="is-small")
    button.button.last(     ref="last"     @click.stop.prevent="TheSp.move_to_last"):              b-icon(icon="menu-right")
  template(v-if="false")
    button.button.flip(                    @click.stop.prevent="TheSp.viewpoint_flip_handle"):            b-icon(icon="swap-vertical" size="is-small")
  template(v-if="TheSp.sp_setting")
    button.button.setting(                 @click.stop.prevent="TheSp.setting_modal_p = true"):    b-icon(icon="cog"   size="is-small")
</template>

<script>
import { support } from "./support.js"

export default {
  name: "SpController",
  mixins: [support],
}
</script>

<style lang="sass">
@import "./support.sass"

.ShogiPlayerGround
  .SpController
    margin-top: var(--sp_common_gap_real_px)
    margin-bottom: 0
    .button
      margin-bottom: 0
      &:focus
        outline: none // Google Chrome では変化ない？
      &.first, &.last
        width: 2rem // ← 比例させる ← これは盤の幅を考慮する
        flex-grow: 0
      &.previous, &.next
        flex-grow: 1
      &.setting
        width: 2rem
</style>
