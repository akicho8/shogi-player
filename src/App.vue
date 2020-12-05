<template lang="pug">
#app.StyleEditor(:class="component_class")
  b-sidebar.StyleEditor-Sidebar(fullheight right v-model="sidebar_p" position="absolute")
    .mx-4.my-4
      .is-flex.is-justify-content-start.is-align-items-center
        b-button(@click="sidebar_toggle" icon-left="menu")
        .mx-3.has-text-weight-bold 将棋盤スタイルエディタ

      .my_controls
        .box
          .title.is-5 基本
          b-field(custom-class="is-small" label="コンテナ幅")
            b-slider(v-model="sp_body_width" :min="1" :max="100")
          //- b-field(custom-class="is-small" label="サイズ")
          //-   b-radio-button(size="is-small" v-model="sp_size" native-value="is_size_none") none
          //-   b-radio-button(size="is-small" v-model="sp_size" native-value="is_size_s") S
          //-   b-radio-button(size="is-small" v-model="sp_size" native-value="is_size_m") M
          //-   b-radio-button(size="is-small" v-model="sp_size" native-value="is_size_l") L

        .box
          .title.is-5 背景
          b-field(custom-class="is-small" label="")
            ColorPicker(v-model="sp_ground_color" :disableAlpha="true")

          ImageUpload(@input="sp_ground_bg_file_src_input_handle")

        .box
          .title.is-5 盤

          b-field(custom-class="is-small" label="単色")
            ColorPicker(v-model="sp_board_color")

          b-field(custom-class="is-small" label="プリセット画像")
            b-select(size="is-small" v-model="sp_bg_variant")
              option(value="is_bg_variant_none") none
              option(value="is_bg_variant_a") a
              option(value="is_bg_variant_b") b
              option(value="is_bg_variant_c") c
              option(value="is_bg_variant_d") d
              option(value="is_bg_variant_e") e
              option(value="is_bg_variant_f") f
              option(value="is_bg_variant_g") g

          ImageUpload(@input="sp_board_bg_file_src_input_handle")

          b-field(custom-class="is-small" label="共通透明度")
            b-slider(v-model="sp_board_opacity" :min="0" :max="1.0" :step="0.01")

        .box
          .title.is-5 盤 - 装飾

          b-field(custom-class="is-small" label="グリッドカラー")
            ColorPicker(v-model="sp_grid_color")

          b-field(custom-class="is-small" label="角丸め")
            b-slider(v-model="sp_board_radius" :min="0" :max="5" :step="0.01")

          b-field(custom-class="is-small" label="余白")
            b-slider(v-model="sp_board_padding" :min="0" :max="10" :step="0.01")
          b-field(custom-class="is-small" label="外枠の太さ")
            b-slider(v-model="sp_grid_outer_stroke" :min="0" :max="5" :step="0.5")
          b-field(custom-class="is-small" label="星")
            b-slider(v-model="sp_grid_star" :min="0" :max="100" :step="0.01")
          b-field(custom-class="is-small" label="アスペクト比")
            b-slider(v-model="sp_board_aspect_ratio" :min="0" :max="200" :step="0.1")

        .box
          .title.is-5 駒
          b-field(custom-class="is-small" label="駒")
            b-select(size="is-small" v-model="sp_pi_variant")
              option(value="is_pi_variant_none") none
              option(value="is_pi_variant_a") a
              option(value="is_pi_variant_b") b
              option(value="is_pi_variant_c") c
              option(value="is_pi_variant_d") d
              option(value="is_pi_variant_e") e
              option(value="is_pi_variant_f") f
              option(value="is_pi_variant_g") g
          b-field(custom-class="is-small" label="盤上のセルに対する駒の大きさ")
            b-slider(v-model="sp_board_piece_rate" :min="0" :max="100" :step="0.1")
          b-field(custom-class="is-small" label="駒台のセルに対する駒の大きさ")
            b-slider(v-model="sp_stand_piece_rate" :min="0" :max="100" :step="0.1")

        .box
          .title.is-5 盤駒配置
          b-field(grouped)
            b-field(custom-class="is-small" label="垂直位置" expanded)
              b-radio-button(size="is-small" v-model="sp_vpos" native-value="is_top") ↑
              b-radio-button(size="is-small" v-model="sp_vpos" native-value="is_vcentered") ・
              b-radio-button(size="is-small" v-model="sp_vpos" native-value="is_bottom") ↓
            b-field(custom-class="is-small" label="水平位置" expanded)
              b-radio-button(size="is-small" v-model="sp_hpos" native-value="is_left") ←
              b-radio-button(size="is-small" v-model="sp_hpos" native-value="is_centered") ・
              b-radio-button(size="is-small" v-model="sp_hpos" native-value="is_right") →

          //- .columns.mt-4
          //-   .column.py-0
          //-     b-field(custom-class="is-small" label="持駒画像(W)")
          //-       b-slider(v-model="sp_stand_piece_w" :min="1" :max="80" :step="1")
          //-   .column.py-0
          //-     b-field(custom-class="is-small" label="持駒画像(H)")
          //-       b-slider(v-model="sp_stand_piece_h" :min="1" :max="80" :step="1")

          b-field(custom-class="is-small" label="領域縦幅")
            b-radio-button(size="is-small" v-model="sp_is_fullheight" native-value="is_fullheight") 画面サイズ
            b-radio-button(size="is-small" v-model="sp_is_fullheight" native-value="") none

        .box
          .title.is-5 駒台
          b-field(custom-class="is-small" label="駒台配置")
            b-radio-button(size="is-small" v-model="sp_layout" native-value="is_vertical") 上下
            b-radio-button(size="is-small" v-model="sp_layout" native-value="is_horizontal") 左右
          .columns.mt-4
            .column.py-0
              b-field(custom-class="is-small" label="持駒画像(W)")
                b-slider(v-model="sp_stand_piece_w" :min="1" :max="80" :step="1")
            .column.py-0
              b-field(custom-class="is-small" label="持駒画像(H)")
                b-slider(v-model="sp_stand_piece_h" :min="1" :max="80" :step="1")
          .columns
            .column.py-0
              b-field(custom-class="is-small" label="横配置時の最小(W)")
                b-slider(v-model="sp_side_min_w"  :min="0" :max="100" :step="1")
            .column.py-0
              b-field(custom-class="is-small" label="縦配置時の最小(H)")
                b-slider(v-model="sp_side_min_h" :min="0" :max="100" :step="1")

        .box
          .title.is-5 駒数
          b-field(custom-class="is-small" label="サイズ")
            b-slider(v-model="sp_piece_count_font_size" :min="0" :max="20" :step="0.01")
          b-field(custom-class="is-small" label="フォント色")
            ColorPicker(v-model="sp_piece_count_font_color")
          b-field(custom-class="is-small" label="背景")
            ColorPicker(v-model="sp_piece_count_bg_color")
          b-field(custom-class="is-small" label="余白")
            b-slider(v-model="sp_piece_count_padding" :min="0" :max="20" :step="0.01")
          b-field(custom-class="is-small" label="左右レイアウト時の位置")
            b-slider(v-model="sp_piece_count_gap_right" :min="-100" :max="100" :step="0.1" :disabled="sp_layout === 'is_vertical'")
          b-field(custom-class="is-small" label="上下レイアウト時の位置")
            b-slider(v-model="sp_piece_count_gap_bottom" :min="-100" :max="100" :step="0.1" :disabled="sp_layout === 'is_horizontal'")

        .box
          .title.is-5 駒箱
          b-field(custom-class="is-small" label="")
            ColorPicker(v-model="sp_piece_box_color")
          .columns.mt-4
            .column.py-0
              b-field(custom-class="is-small" label="セル(W)")
                b-slider(v-model="sp_piece_box_piece_w" :min="1" :max="80" :step="1")
            .column.py-0
              b-field(custom-class="is-small" label="セル(H)")
                b-slider(v-model="sp_piece_box_piece_h" :min="1" :max="80" :step="1")
          b-field(custom-class="is-small" label="セル内の駒の大きさ(%)")
            b-slider(v-model="sp_piece_box_piece_rate" :min="0" :max="100" :step="0.1")

        .box
          .title.is-5 影
          b-field(custom-class="is-small" label="右下方向へのずれ")
            b-slider(v-model="sp_shadow_offset" :min="-10" :max="10")
          b-field(custom-class="is-small" label="ぶれ度合い")
            b-slider(v-model="sp_shadow_blur" :min="-1" :max="20")
          b-field(custom-class="is-small" label="色")
            ColorPicker(v-model="sp_shadow_color")

        .box
          .title.is-5 その他
          b-field(custom-class="is-small" label="レイヤー確認")
            b-radio-button(size="is-small" v-model="sp_layer" native-value="is_layer_off") OFF
            b-radio-button(size="is-small" v-model="sp_layer" native-value="is_layer_on") ON

          b-field(custom-class="is-small" label="モード")
            b-radio-button(size="is-small" v-model="sp_run_mode" native-value="view_mode") view
            b-radio-button(size="is-small" v-model="sp_run_mode" native-value="play_mode") play
            b-radio-button(size="is-small" v-model="sp_run_mode" native-value="edit_mode") edit

          b-field(custom-class="is-small" label="視点")
            b-radio-button(size="is-small" v-model="sp_flip" :native-value="false") ☗
            b-radio-button(size="is-small" v-model="sp_flip" :native-value="true") ☖

          b-field(custom-class="is-small" label="モバイル時のプリセットサイズ自動適用")
            b-radio-button(size="is-small" v-model="sp_mobile_style" native-value="is_mobile_style") ON
            b-radio-button(size="is-small" v-model="sp_mobile_style" native-value="") OFF

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
      :style_params="{sp_layout, sp_hpos, sp_vpos, sp_is_fullheight, sp_size, sp_layer, sp_pi_variant, sp_bg_variant, sp_mobile_style}"
      :run_mode="sp_run_mode"
      :flip="sp_flip"
      :debug_mode_p="false"
      :start_turn="0"
      :kifu_body="'position sfen 4R1gnk/6+Bsl/5+P1pp/9/9/9/9/9/9 b 99krb3g3s3npR3BG18SN 1 moves 3b2a 3a2a 5a2a+ 1a2a G*3b 2a1a 3b2b 1a2b N*3d 2b1a S*2b'"
      :sound_effect="true"
      :setting_button_show="false"
      :summary_show="false"
      :slider_show="false"
      :controller_show="false"
      :player_info="player_info"
    )

  pre(v-if="false") {{style_define}}
</template>

<script>
import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

import ShogiPlayer from "./components/ShogiPlayer.vue"
import ColorPicker from "./components/ColorPicker.vue"
import ImageUpload from "./components/ImageUpload.vue"

import SideInfo from "./models/side_info"
import RunModeInfo from "./models/run_mode_info"
import ThemeInfo from "./models/theme_info"
import BgVariantInfo from "./models/bg_variant_info"
import PiVariantInfo from "./models/pi_variant_info"
import SizeInfo from "./models/size_info"

import chroma from "chroma-js"

import { Slider, Chrome } from 'vue-color'

export default {
  name: 'app',
  components: {
    ShogiPlayer,
    ColorPicker,
    ImageUpload,
  },
  data() {
    return {
      sp_ground_bg_file_src: null,
      sp_board_bg_file_src: null,

      sidebar_p: true,
      sp_ground_color: "#C6E1B8",

      sp_hpos: "is_centered",
      sp_vpos: "is_vcentered",
      sp_layout: "is_vertical",
      sp_run_mode: "edit_mode",
      sp_body_width: 35,
      sp_mobile_style: "is_mobile_style",

      // 影
      sp_shadow_offset: 2,
      sp_shadow_blur: 3,
      sp_shadow_color: "rgba(0, 0, 0, 0.4)",

      sp_size: "is_size_none",
      sp_is_fullheight: "is_fullheight",
      sp_stand_piece_w: 35,
      sp_stand_piece_h: 44,
      sp_flip: false,
      sp_piece_count_gap_right: 97,
      sp_piece_count_gap_bottom: 47.0,
      sp_piece_count_font_size: 8,
      sp_piece_count_font_color:  "rgba(0, 0, 0, 0.75)",
      sp_piece_count_bg_color: "rgba(255, 255, 255, 0.75)",
      sp_piece_count_padding: 2,

      sp_board_color: "rgba(0, 0, 0, 0.2)",
      sp_board_opacity: 1.0,
      sp_grid_color: "rgba(0, 0, 0, 0.5)",
      sp_board_padding: 2.0,
      sp_grid_outer_stroke: 0,
      sp_grid_star: 10,
      sp_board_radius: 0.5,
      sp_board_aspect_ratio: 109.7,
      sp_board_piece_rate: 90,
      sp_stand_piece_rate: 90,

      sp_piece_box_piece_w: 38,
      sp_piece_box_piece_h: 46,
      sp_piece_box_piece_rate: 90,

      sp_piece_box_color: "rgba(0, 0, 0, 0.2)",

      sp_layer: "is_layer_off",
      sp_pi_variant: "is_pi_variant_d",
      sp_bg_variant: "is_bg_variant_none",
      sp_side_min_w: 0,
      sp_side_min_h: 0,
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
    sp_ground_bg_file_src_input_handle(v) {
      this.sp_ground_bg_file_src = v
    },
    sp_board_bg_file_src_input_handle(v) {
      this.sp_board_bg_file_src = v
    },
  },
  computed: {
    chroma() { return chroma },

    component_class() {
      return {
        sidebar_p: this.sidebar_p,
      }
    },

    sp_board_bg_url() {
      if (!this.sp_board_bg_file_src) {
        return "none"
      }
      return `url(${this.sp_board_bg_file_src})`
    },

    sp_ground_bg_url() {
      if (!this.sp_ground_bg_file_src) {
        return "none"
      }
      return `url(${this.sp_ground_bg_file_src})`
    },

    style_define() {
      return `
        .ShogiPlayerGround {
          --sp_body_width: ${this.sp_body_width}vw;
          --sp_ground_bg_image: ${this.sp_ground_bg_url};

          --sp_ground_color: ${this.sp_ground_color};
          --sp_piece_count_gap_right:  ${this.sp_piece_count_gap_right}%;
          --sp_piece_count_gap_bottom: ${this.sp_piece_count_gap_bottom}%;
          --sp_piece_count_font_size:  ${this.sp_piece_count_font_size}px;
          --sp_piece_count_font_color: ${this.sp_piece_count_font_color};
          --sp_piece_count_bg_color:   ${this.sp_piece_count_bg_color};
          --sp_piece_count_padding: ${this.sp_piece_count_padding}px;

          --sp_board_padding: ${this.sp_board_padding}%;
          --sp_board_color:   ${this.sp_board_color};
          --sp_board_opacity: ${this.sp_board_opacity};
          --sp_board_radius:  ${this.sp_board_radius}%;
          --sp_board_aspect_ratio: ${this.sp_board_aspect_ratio}%;
          --sp_board_bg_image:  ${this.sp_board_bg_url};
          --sp_board_piece_rate: ${this.sp_board_piece_rate}%;
          --sp_stand_piece_rate: ${this.sp_stand_piece_rate}%;

          --sp_piece_box_piece_w: ${this.sp_piece_box_piece_w}px;
          --sp_piece_box_piece_h: ${this.sp_piece_box_piece_h}px;
          --sp_piece_box_piece_rate: ${this.sp_piece_box_piece_rate}%;

          --sp_piece_box_color:   ${this.sp_piece_box_color};

          --sp_grid_color:    ${this.sp_grid_color};
          --sp_grid_outer_stroke: ${this.sp_grid_outer_stroke}px;
          --sp_grid_star: ${this.sp_grid_star}%;

          --sp_shadow_offset: ${this.sp_shadow_offset}px;
          --sp_shadow_blur:   ${this.sp_shadow_blur}px;
          --sp_shadow_color:  ${this.sp_shadow_color};

          --sp_stand_piece_w: ${this.sp_stand_piece_w}px;
          --sp_stand_piece_h: ${this.sp_stand_piece_h}px;

          --sp_side_min_w:  ${this.sp_side_min_w}px;
          --sp_side_min_h: ${this.sp_side_min_h}px;
        }
      `
    },
  },
}
</script>

<style lang="sass">
@import "~bulma/sass/utilities/_all"
@import "./components/ShogiPlayer.sass" // Rails 側では sp_assets_dir を変更してから読み込む

$sidebar_width1: 25%
$sidebar_width2: 50%

.StyleEditor-Sidebar
  .sidebar-content
    +tablet
      width: $sidebar_width1
    +mobile
      width: $sidebar_width2
    // width: unset
    // a
    //   white-space: nowrap
  .box
    margin-top: 1rem
    margin-bottom: 0
  .title
    margin-top: 0.4rem
    margin-bottom: 1rem

  .b-slider
    margin-top: 0.5rem

.StyleEditor
  .sidebar_toggle_button
    position: fixed
    top: 0.5rem
    right: 0.5rem
    z-index: 1

  &.sidebar_p
    .EditBlock
      +tablet
        width: unquote("calc(100% - #{$sidebar_width1})")
      +mobile
        // width: unquote("calc(100% - #{$sidebar_width2})")
        width: 100%

  // .is_size_small
  //   .ShogiPlayerWidth
  //     width: 20%
  //   .ShogiPlayerGround
  //     --sp_grid_outer_stroke: 10px
  // .is_size_small2
  //   .ShogiPlayerWidth
  //     width: 20%
  //   .ShogiPlayerGround
  //     --sp_grid_outer_stroke: 20px
</style>
