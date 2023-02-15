<template lang="pug">
.TurnShowOrEdit.is-unselectable(v-if="component_alive_p")
  template(v-if="TheSp.turn_edit_p")
    b-input(size="is-small" type="number" v-model.number="TheSp.turn_edit_value" @input="TheSp.turn_edit_value_set" @blur="blur_handle" ref="turn_edit_input")
  template(v-else)
    // is-inline-block にすることで縦の margin が効く
    .SpTurnText.is-inline-block(@click.stop.prevent="turn_edit_handle")
      template(v-if="TheSp.view_p")
        | {{TheSp.xcontainer.current_turn_label}}
      template(v-if="TheSp.play_p")
        template(v-if="TheSp.turn_base === 0")
          | {{TheSp.turn_offset}}
        template(v-if="TheSp.turn_base >= 1")
          | {{TheSp.turn_base}}
          template(v-if="TheSp.turn_offset >= 1")
            | +{{TheSp.turn_offset}}
        | 手
</template>

<script>
import { support } from "./support.js"

export default {
  name: "TurnShowOrEdit",
  mixins: [support],
  methods: {
    blur_handle() {
      this.TheSp.turn_edit_p = false
    },
    turn_edit_handle() {
      this.TheSp.turn_edit_handle()
      this.$nextTick(() => this.$refs.turn_edit_input.focus())
    },
  },
  computed: {
    component_alive_p() {
      return this.TheSp.xcontainer && this.TheSp.sp_turn_show === "is_turn_show_on" && (this.TheSp.view_p || this.TheSp.play_p)
    },
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayerGround
  .TurnShowOrEdit
    input
      max-width: 5em

  .SpTurnText
    cursor: pointer
    font-weight: bold
    font-size: $size-7

  &.is_balloon_on
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
