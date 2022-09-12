<template lang="pug">
// ShogiPlayerGround は ShogiPlayerWidth の位置を調整するためにあるので他のものを入れてはいけない
.ShogiPlayerGround(:class="component_class" :style="component_style")
  .ShogiPlayerGroundTexture
  ShogiPlayerWidth( v-if="TheSp.xcontainer" ref="ShogiPlayerWidth")
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
        this.TheSp.sp_layout,
        this.TheSp.sp_hpos,
        this.TheSp.sp_vpos,
        this.TheSp.sp_fullheight,
        this.TheSp.sp_balloon,
        this.TheSp.sp_layer,
        this.TheSp.sp_board_shadow,
        this.TheSp.sp_blink,
        this.TheSp.sp_pi_variant,
        this.TheSp.sp_bg_variant,
        this.TheSp.sp_mobile_fit,
        this.TheSp.sp_mobile_vertical,
        this.TheSp.devise_info.key,
        `is_viewpoint_${this.TheSp.new_viewpoint}`, // システムテストで見ている
      ]
    },
    component_style() {
      return {
        "--sp_board_dimension_w": this.TheSp.sp_board_dimension_w,
        "--sp_board_dimension_h": this.TheSp.sp_board_dimension_h,
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

  //////////////////////////////////////////////////////////////////////////////// ここより下は消してもいいかも

  // 盤背景と同じ構成
  +defvar(sp_ground_color, transparent)      // グラウンド背景色
  +defvar(sp_ground_image, none)             // グラウンド背景画像
  +defvar(sp_ground_blur, 0)                 // ぼかし
  +defvar(sp_ground_grayscale, 0)            // グレースケール
  +defvar(sp_ground_contrast, 1.0)           // 駒コントラスト
  +defvar(sp_ground_invert, 0)               // 駒色反転
  +defvar(sp_ground_hue, 1.0)                // 色相
  +defvar(sp_ground_saturate, 1.0)           // 彩度
  +defvar(sp_ground_brightness, 1.0)         // 輝度
  +defvar(sp_ground_sepia, 0)        // セピア

  +is_overlay_origin
  .ShogiPlayerGroundTexture
    +is_overlay_block

    background-color: var(--sp_ground_color)
    background-image: var(--sp_ground_image)
    background-position: center
    background-repeat: no-repeat
    background-size: cover
    // filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5))
    // background-image: url("https://glyphwiki.org/glyph/u9f8d.svg") // 確認用(消すな)
    // background-color: red
    filter: unquote('invert(var(--sp_ground_invert)) sepia(var(--sp_ground_sepia)) hue-rotate(calc(var(--sp_ground_hue) * 1turn)) saturate(var(--sp_ground_saturate)) grayscale(var(--sp_ground_grayscale)) brightness(var(--sp_ground_brightness)) contrast(var(--sp_ground_contrast)) blur(calc(var(--sp_ground_blur) * 1px))')

  &.is_fullheight_on
    min-height: 100vh

  display: flex
  flex-direction: row  // 要素は1つだからといって column してはいけない(justify-content が縦位置になってまぎらわしくなる)

  //////////////////////////////////////////////////////////////////////////////// for position (tablet以上)

  &.is_left
    justify-content: flex-start
  &.is_hcentered
    justify-content: center
  &.is_right
    justify-content: flex-end

  // is_fullheight_on のときは合わせて is_vcentered にするのがおすすめ
  &.is_top
    align-items: flex-start
  &.is_vcentered
    align-items: center
  &.is_bottom
    align-items: flex-end

  //////////////////////////////////////////////////////////////////////////////// for mobile
  +mobile
    &.is_mobile_fit_on
      justify-content: center
      align-items: center
</style>
