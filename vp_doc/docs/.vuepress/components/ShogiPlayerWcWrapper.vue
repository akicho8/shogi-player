<template>
<div :class="['ShogiPlayerWcWrapper', STAGE_ENV]">
  <shogi-player-wc v-bind="params" v-on="$listeners" />
</div>
</template>

<script>
export default {
  name: "ShogiPlayerWcWrapper",
  inheritAttrs: false,
  computed: {
    STAGE_ENV() { return `STAGE-${process.env.NODE_ENV}` },
    params_default() {
      return {
        // sp_layout: "landscape",
      }
    },
    params() {
      return {
        ...this.params_default,
        ...this.$attrs,
      }
    },
  },
}
</script>

<style lang="stylus">
@import "../styles/responsive_macro_from_bulma"

// 全体の詳細度を低くした初期値
shogi-player-wc::part(spwc_style_scope)
  --sp_board_radius: 0

.ShogiPlayerWcWrapper
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
