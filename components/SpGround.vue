<template lang="pug">
// SpGround は SpGroundInside の位置を調整するためにあるので他のものを入れてはいけない → 常に100%なので意味ない
.SpGround(:class="component_class" :style="component_style")
  .SpGroundTexture
  SpGroundInside(v-if="TheSp.xcontainer" ref="SpGroundInside")
  DevTools(v-if="TheSp.mut_dev_tools")
</template>

<script>
import SpGroundInside from "./SpGroundInside.vue"
import DevTools  from "./dev_tools/DevTools.vue"

import { support } from "./support.js"

export default {
  name: "SpGround",
  mixins: [support],
  components: {
    SpGroundInside,
    DevTools,
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

.ShogiPlayer .SpGround
  +defvar(sp_common_gap, 0.18) // 共通の隙間(駒セルの縦幅に対する割合)

  // あまり重要ではないところでの縦のマージンが必要なときに使う
  // sp_common_gap を直接使ってはいけない
  --sp_common_gap_real_px: calc(var(--sp_cell_h) * var(--sp_common_gap))

  &.is_layer_on
    +is_layer_border

  text-align: center
  line-height: 100%

  // もしかしてこの下まったく要らない？ → いる

  display: flex
  align-items: center
  justify-content: center
  flex-direction: column

  //////////////////////////////////////////////////////////////////////////////// ここより下は消してもいいかも

  // 盤背景と同じ構成
  +defvar(sp_ground_color, transparent)      // グラウンド背景色
  +defvar(sp_ground_image, none)             // グラウンド背景画像

  +is_overlay_origin
  .SpGroundTexture
    +is_overlay_block

    background-color: var(--sp_ground_color)
    background-image: var(--sp_ground_image)
    background-position: center
    background-repeat: no-repeat
    background-size: cover
    //- background-image: url("https://glyphwiki.org/glyph/u9f8d.svg") // 確認用(消すな)
    // background-color: red
</style>
