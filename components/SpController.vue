<template lang="pug">
.SpController.buttons.are-small.has-addons.is-centered.is-paddingless.is-flex-wrap-nowrap
  template(v-if="TheSp.inside_controller_p")
    button.button.first(ref="first" @click.stop.prevent="TheSp.move_to_first({interactive: $event})")
      b-icon(size="is-small" icon="menu-left")
    button.button.previous(ref="previous" @click.stop.prevent="TheSp.api_turn_add(-1, {interactive: $event})")
      b-icon(size="is-small" icon="chevron-left")
    button.button.dev_tools(@click.stop.prevent="TheSp.dev_tools_toggle_handle" v-if="TheSp.debug_or_development_p")
      b-icon(size="is-small" icon="cog")
    button.button.next(ref="next" @click.stop.prevent="TheSp.api_turn_add(+1, {interactive: $event})")
      b-icon(size="is-small" icon="chevron-right")
    button.button.last(ref="last" @click.stop.prevent="TheSp.move_to_last({interactive: $event})")
      b-icon(size="is-small" icon="menu-right")
  template(v-if="false")
    button.button.flip(@click.stop.prevent="TheSp.viewpoint_flip_handle")
      b-icon(size="is-small" icon="swap-vertical")
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

$sp_controller_font_size: 0.02     // 盤の縦幅に対する割合
$sp_controller_font_min: 8px       // ただしこれ以上は小さくしない(SpSlider.vueの8pxと合わせたい)

.ShogiPlayer
  .SpController

    margin-top: var(--sp_common_gap_real_px)
    margin-bottom: 0

    +workaround_buttons_connect
    .button
      margin-bottom: 0
      font-size: unquote("max(calc(var(--sp_board_h) * #{$sp_controller_font_size}), #{$sp_controller_font_min})") ! important
      &:focus
        outline: none    // Google Chrome では変化ない？
      &.first, &.last
        flex: 0 0 10%    // 伸びても端は拡大しない
      &.previous, &.next
        flex: 1 0        // 伸びたら前後ボタンを優先して拡大する
</style>
