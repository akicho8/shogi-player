<template lang="pug">
#app.StyleEditor(:class="component_class")
  b-sidebar.StyleEditor-Sidebar(fullheight right v-model="sidebar_p")
    .mx-4.my-4
      .is-flex.is-justify-content-start.is-align-items-center
        b-button(@click="sidebar_toggle" icon-left="menu")
        .mx-3.has-text-weight-bold 将棋盤エディタ

      .my_controls
        .title.is-5 基本
        b-field(custom-class="is-small" label="コンテナ幅")
          b-slider(v-model="screen_width" :min="1" :max="100")
        b-field(custom-class="is-small" label="配置")
          b-radio-button(size="is-small" v-model="sp_layout" native-value="is_vertical") 縦
          b-radio-button(size="is-small" v-model="sp_layout" native-value="is_horizontal") 横
        b-field(custom-class="is-small" label="水平位置")
          b-radio-button(size="is-small" v-model="sp_hpos" native-value="is_left") ←
          b-radio-button(size="is-small" v-model="sp_hpos" native-value="is_centered") ・
          b-radio-button(size="is-small" v-model="sp_hpos" native-value="is_right") →
        b-field(custom-class="is-small" label="垂直位置")
          b-radio-button(size="is-small" v-model="sp_vpos" native-value="is_top") ↑
          b-radio-button(size="is-small" v-model="sp_vpos" native-value="is_vcentered") ・
          b-radio-button(size="is-small" v-model="sp_vpos" native-value="is_bottom") ↓
        b-field(custom-class="is-small" label="垂直領域")
          b-radio-button(size="is-small" v-model="sp_is_fullheight" native-value="is_fullheight") 全
          b-radio-button(size="is-small" v-model="sp_is_fullheight" native-value="") なし

        b-field(custom-class="is-small" label="横レイアウト時の駒台最小横幅")
          b-slider(v-model="sp_membership_min_width"  :min="1" :max="20" :step="0.05")
        b-field(custom-class="is-small" label="縦レイアウト時の駒台最小縦幅")
          b-slider(v-model="sp_membership_min_height" :min="1" :max="20" :step="0.05")

        b-field(custom-class="is-small" label="持駒画像w")
          b-slider(v-model="sp_piece_w" :min="1" :max="10" :step="0.05")
        b-field(custom-class="is-small" label="持駒画像h")
          b-slider(v-model="sp_piece_h" :min="1" :max="10" :step="0.05")

        .box
          .title.is-5 影
          b-field(custom-class="is-small" label="右下方向へのずれ")
            b-slider(v-model="sp_shadow_offset" :min="-10" :max="10")
          b-field(custom-class="is-small" label="ぶれ度合い")
            b-slider(v-model="sp_shadow_blur" :min="-1" :max="20")
          b-field(custom-class="is-small" label="色")
            b-input(v-model="sp_shadow_color" type="color")
          b-field(custom-class="is-small" label="非透明度")
            b-slider(v-model="sp_shadow_alpha" :min="0" :max="1.0" :step="0.01")

        .title.is-5 その他
        b-field(custom-class="is-small" label="レイヤー確認")
          b-radio-button(size="is-small" v-model="sp_layer" native-value="is_layer_on") ON
          b-radio-button(size="is-small" v-model="sp_layer" native-value="is_layer_off") OFF

        b-field(custom-class="is-small" label="背景色")
          b-input(v-model="bg_color" type="color")

        b-field(custom-class="is-small" label="縦時駒数位置")
          b-slider(v-model="sp_piece_object_count_gap_bottom" :min="-50" :max="150")
        b-field(custom-class="is-small" label="横時駒数位置")
          b-slider(v-model="sp_piece_object_count_gap_right" :min="-50" :max="150")

        b-field(custom-class="is-small" label="テクスチャ")
          b-radio-button(size="is-small" v-model="sp_texture" native-value="is_texture_image") 画像
          b-radio-button(size="is-small" v-model="sp_texture" native-value="is_texture_text") 文字
          b-radio-button(size="is-small" v-model="sp_texture" native-value="is_texture_none") none

        b-field(custom-class="is-small" label="駒種類")
          b-select(size="is-small" v-model="sp_pi_variant")
            option(value="is_pi_variant_none") なし
            option(value="is_pi_variant_a") a
            option(value="is_pi_variant_b") b
            option(value="is_pi_variant_c") c
            option(value="is_pi_variant_d") d
            option(value="is_pi_variant_e") e
            option(value="is_pi_variant_f") f
        b-field(custom-class="is-small" label="盤種類")
          b-select(size="is-small" v-model="sp_bg_variant")
            option(value="is_bg_variant_none") なし
            option(value="is_bg_variant_a") a
            option(value="is_bg_variant_b") b
            option(value="is_bg_variant_c") c
            option(value="is_bg_variant_d") d
            option(value="is_bg_variant_e") e
            option(value="is_bg_variant_f") f
            option(value="is_bg_variant_g") g
        b-field(custom-class="is-small" label="視点")
          b-radio-button(size="is-small" v-model="sp_flip" :native-value="false") ☗
          b-radio-button(size="is-small" v-model="sp_flip" :native-value="true") ☖

  b-button.sidebar_toggle_button(@click="sidebar_toggle" icon-left="menu")

  //- b-navbar(type="is-primary" :mobile-burger="false" wrapper-class="container" spaced)
  //-   template(slot="brand")
  //-     b-navbar-item.has-text-weight-bold 将棋盤エディター
  //-   template(slot="end")
  //-     b-navbar-item(@click="sidebar_toggle")
  //-       b-icon(icon="menu")

  //- .section
  //-   .container.is-fluid
  //-     .buttons
  //-     .columns.is-multiline

  div(is="style" v-text="style_define")

  .EditBlock
    ShogiPlayer(
      :style_params="{sp_texture, sp_layout, sp_hpos, sp_vpos, sp_is_fullheight, sp_fsize_class, sp_layer, sp_pi_variant, sp_bg_variant}"
      :run_mode="'edit_mode'"
      :debug_mode_p="true"
      :start_turn="0"
      :kifu_body="'position sfen 4R1gnk/6+Bsl/5+P1pp/9/9/9/9/9/9 b rb3g3s3n2l15pR3BG18SN 1 moves 3b2a 3a2a 5a2a+ 1a2a G*3b 2a1a 3b2b 1a2b N*3d 2b1a S*2b'"
      :size="'xxx'"
      :flip="sp_flip"
      :sound_effect="true"
      :setting_button_show="true"
      :slider_show="true"
      :controller_show="true"
      :player_info="player_info"
    )

  pre {{style_define}}
</template>

<script>
import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

import ShogiPlayer from './components/ShogiPlayer'

import SideInfo from "./models/side_info"
import RunModeInfo from "./models/run_mode_info"
import ThemeInfo from "./models/theme_info"
import BgVariantInfo from "./models/bg_variant_info"
import PiVariantInfo from "./models/pi_variant_info"
import SizeInfo from "./models/size_info"

import chroma from "chroma-js"

export default {
  name: 'app',
  components: {
    ShogiPlayer,
  },
  data() {
    return {
      sidebar_p: true,
      bg_color: "#000000",

      sp_hpos: "is_centered",
      sp_vpos: "is_vcentered",
      sp_layout: "is_vertical",
      sp_texture: "is_texture_image",
      sp_fsize: 2.0,
      screen_width: 30,

      // 影
      sp_shadow_offset: 2,
      sp_shadow_blur: 3,
      sp_shadow_color: "#000000",
      sp_shadow_alpha: 0.4,

      sp_fsize_class: "is_size_none",
      sp_is_fullheight: "is_fullheight",
      sp_piece_w: 2.4,
      sp_piece_h: 2.95,
      sp_flip: false,
      sp_piece_object_count_gap_right: 84,
      sp_piece_object_count_gap_bottom: 91,
      sp_layer: "is_layer_on",
      sp_pi_variant: "is_pi_variant_a",
      sp_bg_variant: "is_bg_variant_a",
      sp_membership_min_width: 3,
      sp_membership_min_height: 3,
      ////////////////////////////////////////////////////////////////////////////////

      SideInfo,
      RunModeInfo,
      ThemeInfo,
      BgVariantInfo,
      PiVariantInfo,
      SizeInfo,

      player_info: {
        black: { name: "先手", time: "",        },
        white: { name: "後手", time: "56:78:90" },
      },

      kifu_body: require("./極限早繰り銀.kif"),

      trigger_toast_p: false,

      kif_sample1: require("./第11回朝日杯将棋オープン戦本戦.kif"),
      kif_sample2: require("./藤井聡太四段_vs_澤田真吾六段.kif"),
    }
  },
  methods: {
    sidebar_toggle() {
      this.sidebar_p = !this.sidebar_p
    },
  },
  computed: {
    chroma() { return chroma },

    component_class() {
      return {
        sidebar_p: this.sidebar_p,
      }
    },

    style_define() {
      // .is_texture_text .ShogiPlayerCore {
      return `
        // .is_size_none.ShogiPlayer {
        //   font-size: ${this.sp_fsize}vw;
        // }
        .ShogiPlayerWidth {
          width: ${this.screen_width}vw;
        }
        .is_horizontal .Membership {
          min-width: ${this.sp_membership_min_width}vw;
        }
        .is_vertical .Membership {
          min-height: ${this.sp_membership_min_height}vw;
        }
        .MembershipStand .PieceObject {
          width:  ${this.sp_piece_w}vw;
          height: ${this.sp_piece_h}vw;
        }
        .MembershipLocationMark {
          width:  ${this.sp_piece_w * 0.7}vw;
          height: ${this.sp_piece_h * 0.7}vw;
        }
        .ShogiPlayerGround {
          background-color: ${this.bg_color};
        }
        .ShogiPlayerGround {
          --sp_piece_object_count_gap_right: ${this.sp_piece_object_count_gap_right}%;
          --sp_piece_object_count_gap_bottom: ${this.sp_piece_object_count_gap_bottom}%;
          --sp_shadow_offset: ${this.sp_shadow_offset}px;
          --sp_shadow_blur:   ${this.sp_shadow_blur}px;
          --sp_shadow_color:  ${chroma(this.sp_shadow_color).alpha(this.sp_shadow_alpha).css()};
        }
      `
    },
  },
}
</script>

<style lang="sass">
@import "~bulma/sass/utilities/_all"
@import "./components/ShogiPlayer.sass" // Rails 側では sp_assets_dir を変更してから読み込む
.StyleEditor-Sidebar
  .sidebar-content
    width: unquote('max(14rem, 20%)')
    // width: unset
    // a
    //   white-space: nowrap
  .title:first-of-type
    margin-top: 1.5rem
  .title:not(:first-of-type)
    margin-top: 4rem

.StyleEditor
  .sidebar_toggle_button
    position: fixed
    top: 0.5rem
    right: 0.5rem

  &.sidebar_p
    .EditBlock
      +tablet
        width: 80%

  .ShogiPlayerWidth
</style>
