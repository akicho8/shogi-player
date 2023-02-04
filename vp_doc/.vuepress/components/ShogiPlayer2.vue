<template>
<div :class="['ShogiPlayer2', STAGE_ENV]">
  <!-- @update:sp_turn="foo"  -->
  <shogi-player-wc v-bind="params" v-on="$listeners" />
</div>
</template>

<script>
export default {
  name: "ShogiPlayer2",
  inheritAttrs: false,
  methods: {
    foo(v) {
      console.log(v)
    },
  },

  computed: {
    STAGE_ENV() { return `STAGE-${process.env.NODE_ENV}` },
    params() {
      return {
        sp_layout: "is_horizontal",
        ...this.$attrs,
      }
    },
  },
}
</script>

<style lang="stylus">
@import "../styles/responsive_macro_from_bulma"

// 全体の詳細度を低くした初期値
shogi-player-wc::part(sp_css_variables)
  --sp_board_radius: 0

.ShogiPlayer2
  &.is-small
    --width: 40%
  --width: 50%
  &.is-large
    --width: 60%

  display: flex
  align-items: center
  justify-content: center

  shogi-player-wc
    width: 100%
    +tablet()
      width: var(--width)

  &.STAGE-development
    border: 1px dotted blue
</style>
