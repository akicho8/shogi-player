<template lang="pug">
// ShogiPlayerPosition は ShogiPlayerWidth の位置を調整するためにあるので他のものを入れてはいけない
.ShogiPlayerPosition(:class="component_class")
  ShogiPlayerWidth(:base="base" v-if="base.mediator" ref="board_container_ref")
</template>

<script>
import ShogiPlayerWidth from "./ShogiPlayerWidth.vue"
import DebugBlock from "./DebugBlock.vue"

import { support } from "./support.js"

export default {
  name: "ShogiPlayerPosition",
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
.ShogiPlayerPosition
  &.is_layer_on
    border: 1px dashed change_color($primary, $alpha: 0.5)
  &.is_fullheight
    height: 100vh

  text-align: center
  line-height: 100%
  display: flex
  flex-direction: row  // 要素は1つだからといって column してはいけない(justify-content が縦位置になってまぎらわしくなる)

  //////////////////////////////////////////////////////////////////////////////// for position (tablet以上)

  +tablet
    &.is_left
      justify-content: flex-start
    &.is_centered
      justify-content: center
    &.is_right
      justify-content: flex-end

    // is_fullheight のときは合わせて is_vcentered にするのがおすすめ
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
