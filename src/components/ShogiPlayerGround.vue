<template lang="pug">
// ShogiPlayerGround は ShogiPlayerWidth の位置を調整するためにあるので他のものを入れてはいけない
.ShogiPlayerGround(:class="component_class")
  .ShogiPlayerGroundTexture
  ShogiPlayerWidth(:base="base" v-if="base.mediator" ref="board_container_ref")
</template>

<script>
import ShogiPlayerWidth from "./ShogiPlayerWidth.vue"
import DebugBlock from "./DebugBlock.vue"

import { support } from "./support.js"

export default {
  name: "ShogiPlayerGround",
  mixins: [support],
  components: {
    ShogiPlayerWidth,
  },
  computed: {
    component_class() {
      return [
        ...Object.values(this.base.new_style_params),
        // ["sp_bg_variant", this.base.new_sp_bg_variant].join("-"),
        // ["sp_pi_variant", this.base.new_sp_pi_variant].join("-"),
      ]
    },
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayerGround
  --sp_ground_color: inherit   // グラウンド背景色
  --sp_ground_bg_image: none   // グラウンド背景画像

  .ShogiPlayerGroundTexture
    +overlay_block
    // z-index: -1

    background-color: var(--sp_ground_color)
    background-image: var(--sp_ground_bg_image)
    background-position: center
    background-repeat: no-repeat
    background-size: cover
    // filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5))
    // background-image: url("https://glyphwiki.org/glyph/u9f8d.svg") // 確認用(消すな)

  &.is_layer_on
    border: 1px dashed change_color($primary, $alpha: 0.5)
  &.is_fullheight
    height: 100vh

  text-align: center
  line-height: 100%
  display: flex
  flex-direction: row  // 要素は1つだからといって column してはいけない(justify-content が縦位置になってまぎらわしくなる)

  //////////////////////////////////////////////////////////////////////////////// for position (tablet以上)

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
    &.is_mobile_style
      justify-content: center
      align-items: center
</style>
