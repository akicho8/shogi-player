<template lang="pug">
.ShogiPlayerPure(:class="component_class")
  ShogiPlayerWidth(:base="base")
</template>

<script>
import ShogiPlayerWidth from "./ShogiPlayerWidth.vue"

import { support } from "./support.js"

export default {
  name: "ShogiPlayerPure",
  mixins: [support],
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
.ShogiPlayerPure
  &.is_layer_on
    border: 1px dashed change_color($primary, $alpha: 0.5)
  &.is_fullheight
    height: 100vh

  text-align: center
  line-height: 100%
  display: flex

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

  //////////////////////////////////////////////////////////////////////////////// for mobile
  +mobile
    justify-content: center
    // font-size: unquote('calc(50vw / 9')
</style>
