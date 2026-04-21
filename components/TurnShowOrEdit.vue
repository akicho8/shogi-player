<template lang="pug">
.TurnShowOrEdit.is-unselectable(v-if="component_alive_p")
  template(v-if="TheSP.turn_edit_p")
    b-input(
      size="is-small"
      type="number"
      v-model.number="TheSP.turn_edit_value"
      @input="TheSP.turn_edit_value_set"
      @blur="blur_handle"
      :min="TheSP.turn_offset_min"
      :max="TheSP.turn_offset_max"
      ref="turn_edit_input"
      )
  template(v-else)
    // is-inline-block にすることで縦の margin が効く
    .SpTurnText.is-inline-block(@click.stop.prevent="turn_edit_handle")
      template(v-if="TheSP.view_p")
        | {{TheSP.xcontainer.current_turn_label}}
      template(v-if="TheSP.play_p")
        template(v-if="TheSP.turn_base === 0")
          | {{TheSP.turn_offset}}
        template(v-if="TheSP.turn_base >= 1")
          | {{TheSP.turn_base}}
          template(v-if="TheSP.turn_offset >= 1")
            | +{{TheSP.turn_offset}}
        | 手
</template>

<script>
import { support } from "./support.js"

export default {
  name: "TurnShowOrEdit",
  mixins: [support],
  methods: {
    blur_handle() {
      this.TheSP.turn_edit_p = false
    },
    turn_edit_handle() {
      this.TheSP.turn_edit_handle()
      this.$nextTick(() => this.$refs.turn_edit_input.focus({preventScroll: true}))
    },
  },
  computed: {
    component_alive_p() {
      return this.TheSP.xcontainer && this.TheSP.sp_turn_show && (this.TheSP.view_p || this.TheSP.play_p)
    },
  },
}
</script>

<style lang="sass">
@import "./support"
.ShogiPlayer
  .TurnShowOrEdit
    input
      max-width: 5em

  .SpTurnText
    cursor: pointer
    font-weight: bold
    font-size: $size-7

  &.true
    .SpTurnText
      @extend %is_piece_count_color_set
      padding: 0.5em
      border-radius: 3px

  &.is_layer_on
    .TurnShowOrEdit
      +is_layer_border

  // &.vertical
  //   .TurnShowOrEdit
  //     margin: 0.2rem 0
  // +IF_HORIZONTAL
  //   .TurnShowOrEdit
  //     margin: 0.25rem 0

  ////////////////////////////////////////////////////////////////////////////////
  +IF_HORIZONTAL
    .TurnShowOrEdit
      margin-bottom: var(--sp_common_gap_real_px)
  +IF_VERTICAL
    .TurnShowOrEdit
      margin-bottom: var(--sp_common_gap_real_px)
</style>
