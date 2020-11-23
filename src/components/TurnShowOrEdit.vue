<template lang="pug">
.TurnShowOrEdit.is-unselectable(v-if="base.mediator && base.summary_show && (base.view_p || base.play_p)")
  template(v-if="base.turn_edit_p")
    input(type="number" v-model.number="base.turn_edit_value" @blur="blur_handle" ref="turn_edit_input")
  template(v-else)
    .turn_edit_text.is-inline-block(@click.stop.prevent="turn_edit_handle")
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
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayerPosition
  .TurnShowOrEdit
    // N手目の編集モードのnumberフィールド
    input
      width: 3rem
    // N手目のテキスト表示
    .turn_edit_text
      cursor: pointer
</style>
