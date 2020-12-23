<template lang="pug">
// ShogiPlayerGround は ShogiPlayerWidth の位置を調整するためにあるので他のものを入れてはいけない
.ShogiPlayerGround(:class="component_class" :style="component_style")
  .ShogiPlayerGroundTexture
  ShogiPlayerWidth(:base="base" v-if="base.mediator" ref="ShogiPlayerWidth")
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
        this.base.sp_layout,
        this.base.sp_hpos,
        this.base.sp_vpos,
        this.base.sp_fullheight,
        this.base.sp_balloon,
        this.base.sp_layer,
        this.base.sp_board_shadow,
        this.base.sp_blink,
        this.base.sp_pi_variant,
        this.base.sp_bg_variant,
        this.base.sp_mobile_fit,
        this.base.sp_mobile_vertical,
        this.base.new_flip ? "is_flip_on" : "is_flip_off",
      ]
    },
    component_style() {
      return {
        // "--sp_dimension": this.base.sp_dimension,
      }
    },
  },
}
</script>

<style lang="sass">
@import "./support.sass"

.ShogiPlayerGround
  &.is_layer_on
    +is_layer_border

  text-align: center
  line-height: 100%

  display: flex
  align-items: center
  justify-content: center
  flex-direction: column

  // 盤背景と同じ構成
  // +defvar(se_ws_color, transparent)      // グラウンド背景色
  // +defvar(se_ws_image, none)             // グラウンド背景画像
  // +defvar(se_ws_blur, 0)                 // ぼかし
  // +defvar(se_ws_grayscale, 0)            // グレースケール
  // +defvar(se_ws_contrast, 1.0)           // 駒コントラスト
  // +defvar(se_ws_invert, 0)               // 駒色反転
  // +defvar(se_ws_hue, 1.0)                // 色相
  // +defvar(se_ws_saturate, 1.0)           // 彩度
  // +defvar(se_ws_brightness, 1.0)         // 輝度

  // +is_overlay_origin
  // .ShogiPlayerGroundTexture
  //   +is_overlay_block
  //
  //   background-color: var(--se_ws_color)
  //   background-image: var(--se_ws_image)
  //   background-position: center
  //   background-repeat: no-repeat
  //   background-size: cover
  //   // filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5))
  //   // background-image: url("https://glyphwiki.org/glyph/u9f8d.svg") // 確認用(消すな)
  //   // background-color: red
  //   filter: unquote('invert(var(--se_ws_invert)) hue-rotate(calc(var(--se_ws_hue) * 1turn)) saturate(var(--se_ws_saturate)) grayscale(var(--se_ws_grayscale)) brightness(var(--se_ws_brightness)) contrast(var(--se_ws_contrast)) blur(calc(var(--se_ws_blur) * 1px))')

  // &.is_fullheight_on
  //   min-height: 100vh

  // display: flex
  // flex-direction: row  // 要素は1つだからといって column してはいけない(justify-content が縦位置になってまぎらわしくなる)
  //
  // //////////////////////////////////////////////////////////////////////////////// for position (tablet以上)
  //
  // &.is_left
  //   justify-content: flex-start
  // &.is_hcentered
  //   justify-content: center
  // &.is_right
  //   justify-content: flex-end
  //
  // // is_fullheight_on のときは合わせて is_vcentered にするのがおすすめ
  // &.is_top
  //   align-items: flex-start
  // &.is_vcentered
  //   align-items: center
  // &.is_bottom
  //   align-items: flex-end
  //
  // //////////////////////////////////////////////////////////////////////////////// for mobile
  // +mobile
  //   &.is_mobile_fit_on
  //     justify-content: center
  //     align-items: center
</style>
