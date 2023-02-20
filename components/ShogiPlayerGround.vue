<template lang="pug">
// ShogiPlayerGround は ShogiPlayerWidth の位置を調整するためにあるので他のものを入れてはいけない → 常に100%なので意味ない
.ShogiPlayerGround(:class="component_class" :style="component_style")
  .ShogiPlayerGroundTexture
  ShogiPlayerWidth(v-if="TheSp.xcontainer" ref="ShogiPlayerWidth")
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
        // これらはCSS用なのでコードで管理するのは違うような気もする
        // とはいえ利用者に委ねるとタグの構造の理解を強要することになる
        // それに間違った場所に指定してしまってもエラーが出ることもない
        // なので結局ここでいい
        // Buefy も同じようなことをしている

        // String
        this.TheSp.str_to_css_class("is_layout", this.TheSp.sp_layout),                         // is_layout_horizontal is_layout_vertical
        this.TheSp.str_to_css_class("is_coordinate_variant", this.TheSp.sp_coordinate_variant), // is_coordinate_variant_kanji
        this.TheSp.str_to_css_class("is_name_direction", this.TheSp.sp_name_direction),         // is_name_direction_horizontal
        this.TheSp.str_to_css_class("is_stand_gravity", this.TheSp.sp_stand_gravity),           // is_stand_gravity_top
        this.TheSp.str_to_css_class("is_piece_variant", this.TheSp.sp_piece_variant),           // is_piece_variant_a
        this.TheSp.str_to_css_class("is_bg_variant", this.TheSp.sp_bg_variant),                 // is_bg_variant_a
        this.TheSp.str_to_css_class("is_device", this.TheSp.devise_info.key),                   // is_device_touch

        // Boolean
        this.TheSp.bool_to_css_class("is_layer", this.TheSp.sp_layer),
        this.TheSp.bool_to_css_class("is_mobile_vertical", this.TheSp.sp_mobile_vertical),
        this.TheSp.bool_to_css_class("is_coordinate", this.TheSp.sp_coordinate),
        this.TheSp.bool_to_css_class("is_balloon", this.TheSp.sp_balloon),

        // 特殊
        `is_viewpoint_${this.TheSp.new_viewpoint}`, // is_viewpoint_black (システムテストで見ている)
      ]
    },
    component_style() {
      return {
        "--sp_board_dimension_w": this.TheSp.sp_board_dimension_w,
        "--sp_board_dimension_h": this.TheSp.sp_board_dimension_h,
        ...this.TheSp.ro_css_variables_hash,
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

  // もしかしてこの下まったく要らない？

  display: flex
  align-items: center
  justify-content: center
  flex-direction: column

  //////////////////////////////////////////////////////////////////////////////// ここより下は消してもいいかも

  // 盤背景と同じ構成
  +defvar(sp_ground_color, transparent)      // グラウンド背景色
  +defvar(sp_ground_image, none)             // グラウンド背景画像

  +is_overlay_origin
  .ShogiPlayerGroundTexture
    +is_overlay_block

    background-color: var(--sp_ground_color)
    background-image: var(--sp_ground_image)
    background-position: center
    background-repeat: no-repeat
    background-size: cover
    //- background-image: url("https://glyphwiki.org/glyph/u9f8d.svg") // 確認用(消すな)
    // background-color: red
</style>
