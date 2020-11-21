<template lang="pug">
.ShogiPlayerPure(:class="component_class")
  ShogiPlayerWidth(:base="base")
</template>

<script>
import ShogiPlayerWidth from "./ShogiPlayerWidth.vue"

import { support_child } from "./support_child.js"

export default {
  name: "ShogiPlayerPure",
  mixins: [support_child],
  components: {
    ShogiPlayerWidth,
  },
  computed: {
    component_class() {
      return [
        ...this.base.custom_class,
        this.base.new_sp_layout,
        this.base.new_theme,
        ["bg_variant", this.base.new_bg_variant].join("-"),
        ["pi_variant", this.base.new_pi_variant].join("-"),
      ]
    },
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayer
  .ShogiPlayerPure
    &.is_layer_on
      border: 1px dashed change_color($primary, $alpha: 0.5)
    &.is_fullheight
      height: 100vh

    text-align: center
    line-height: 100%
    display: flex

    //////////////////////////////////////////////////////////////////////////////// for mobile
    +mobile
      justify-content: center
      font-size: unquote('calc(50vw / 9)')

    //////////////////////////////////////////////////////////////////////////////// is_size_none 以外のときの固定値
    +tablet
      &.is_size_small
        font-size: 30px
      &.is_size_medium
        font-size: 40px
      &.is_size_large
        font-size: 50px

    //////////////////////////////////////////////////////////////////////////////// for position (tablet以上)

    +tablet
      &.is_left
        justify-content: flex-start
      &.is_centered
        justify-content: center
      &.is_right
        justify-content: flex-end

      // is_fullheight のときは is_vcentered にするのがよい
      &.is_top
        align-items: flex-start
      &.is_vcentered
        align-items: center
      &.is_bottom
        align-items: flex-end
</style>
