<template lang="pug">
.TurnShowOrEdit.is-unselectable(v-if="component_alive_p")
  template(v-if="base.turn_edit_p")
    b-input(size="is-small" type="number" v-model.number="base.turn_edit_value" @blur="blur_handle" ref="turn_edit_input")
  template(v-else)
    // is-inline-block にすることで縦の margin が効く
    .SpTurnText.is-inline-block(@click.stop.prevent="turn_edit_handle")
      template(v-if="base.view_p")
        | {{base.mediator.current_turn_label(base.final_label)}}
      template(v-if="base.play_p")
        template(v-if="base.turn_base === 0")
          | {{base.turn_offset}}
        template(v-if="base.turn_base >= 1")
          | {{base.turn_base}}
          template(v-if="base.turn_offset >= 1")
            | +{{base.turn_offset}}
        | 手
</template>

<script>
import { support } from "./support.js"

export default {
  name: "TurnShowOrEdit",
  mixins: [support],
  methods: {
    blur_handle() {
      this.base.turn_edit_p = false
    },
    turn_edit_handle() {
      this.base.turn_edit_handle()
      this.$nextTick(() => this.$refs.turn_edit_input.focus())
    },
  },
  computed: {
    component_alive_p() {
      return this.base.mediator && this.base.summary_show && (this.base.view_p || this.base.play_p)
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

  // &.is_vertical
  //   .TurnShowOrEdit
  //     margin: 0.2rem 0
  // &.is_horizontal
  //   .TurnShowOrEdit
  //     margin: 0.25rem 0

  ////////////////////////////////////////////////////////////////////////////////
  &.is_horizontal
    .TurnShowOrEdit
      margin-bottom: var(--sp_common_gap)
  +IS_VERTICAL_OR_MOBILE
    .TurnShowOrEdit
      margin-bottom: 0
</style>
