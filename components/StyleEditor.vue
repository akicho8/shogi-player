<template lang="pug">
.StyleEditor(:class="component_class")
  b-sidebar.StyleEditor-Sidebar(fullheight right v-model="sidebar_p" position="fixed")
    .mx-4.my-4
      .is-flex.is-justify-content-start.is-align-items-center
        b-button(@click="sidebar_toggle_handle" icon-left="menu")
        .mx-3.has-text-weight-bold スタイルエディタ

      .my_controls
        .box
          .title.is-5 基本
          b-field(custom-class="is-small" label="コンテナ幅")
            b-slider(v-model="sp_body_max_width" :min="1" :max="100")
          b-field(custom-class="is-small" label="レイアウト")
            b-radio-button(size="is-small" v-model="sp_layout" native-value="is_horizontal") 左右
            b-radio-button(size="is-small" v-model="sp_layout" native-value="is_vertical") 上下
          b-field(custom-class="is-small" label="モード")
            b-radio-button(size="is-small" v-model="sp_run_mode" native-value="view_mode") 再生
            b-radio-button(size="is-small" v-model="sp_run_mode" native-value="play_mode") 操作
            b-radio-button(size="is-small" v-model="sp_run_mode" native-value="edit_mode") 編集
          b-field(custom-class="is-small" label="レイヤー確認")
            b-radio-button(size="is-small" v-model="sp_layer" native-value="is_layer_off") OFF
            b-radio-button(size="is-small" v-model="sp_layer" native-value="is_layer_on") ON
        .box
          .title.is-5 背景

          b-field(custom-class="is-small" label="")
            ColorPicker(v-model="sp_ground_color" :disableAlpha="false")

          ImageUpload(@input="sp_ground_image_input_handle")

          b-field(custom-class="is-small" label="色相")
            b-slider(v-model="sp_ground_hue" :min="-0.5" :max="0.5" :step="0.001")
          b-field(custom-class="is-small" label="彩度")
            b-slider(v-model="sp_ground_saturate" :min="0" :max="4.0" :step="0.001")
          b-field(custom-class="is-small" label="輝度")
            b-slider(v-model="sp_ground_brightness" :min="0" :max="2.0" :step="0.001")
          b-field(custom-class="is-small" label="ぼかし")
            b-slider(v-model="sp_ground_blur" :min="0" :max="30" :step="0.001")
          b-field(custom-class="is-small" label="グレースケール")
            b-slider(v-model="sp_ground_grayscale" :min="0" :max="1.0" :step="0.001")
          b-field(custom-class="is-small" label="コントラスト")
            b-slider(v-model="sp_ground_contrast" :min="0" :max="2.0" :step="0.001")
          b-field(custom-class="is-small" label="反転")
            b-slider(v-model="sp_ground_invert" :min="0" :max="1.0" :step="0.001")
          //- b-field(custom-class="is-small" label="非透輝度")
          //-   b-slider(v-model="sp_ground_opacity" :min="0" :max="1.0" :step="0.001")

        .box
          .title.is-5 盤テクスチャ

          b-field(custom-class="is-small" label="")
            ColorPicker(v-model="sp_board_color")

          b-field.my-4(custom-class="is-small" label="プリセット画像")
            b-select(size="is-small" v-model="sp_bg_variant")
              template(v-for="e in BgVariantInfo.values")
                option(:value="e.key") {{e.name}}

          ImageUpload(@input="sp_board_image_input_handle")

          b-field(custom-class="is-small" label="色相")
            b-slider(v-model="sp_board_hue" :min="-0.5" :max="0.5" :step="0.001")
          b-field(custom-class="is-small" label="彩度")
            b-slider(v-model="sp_board_saturate" :min="0" :max="4.0" :step="0.001")
          b-field(custom-class="is-small" label="輝度")
            b-slider(v-model="sp_board_brightness" :min="0" :max="2.0" :step="0.001")
          b-field(custom-class="is-small" label="ぼかし")
            b-slider(v-model="sp_board_blur" :min="0" :max="30" :step="0.001")
          b-field(custom-class="is-small" label="グレースケール")
            b-slider(v-model="sp_board_grayscale" :min="0" :max="1.0" :step="0.001")
          b-field(custom-class="is-small" label="コントラスト")
            b-slider(v-model="sp_board_contrast" :min="0" :max="2.0" :step="0.001")
          b-field(custom-class="is-small" label="反転")
            b-slider(v-model="sp_board_invert" :min="0" :max="1.0" :step="0.001")
          b-field(custom-class="is-small" label="非透輝度")
            b-slider(v-model="sp_board_opacity" :min="0" :max="1.0" :step="0.001")

        .box
          .title.is-5 盤
          b-field(custom-class="is-small" label="角丸め")
            b-slider(v-model="sp_board_radius" :min="0" :max="50" :step="0.01")
          b-field(custom-class="is-small" label="余白" message="紙面風: 0")
            b-slider(v-model="sp_board_padding" :min="0" :max="10" :step="0.01")
          b-field(custom-class="is-small" label="アスペクト比(縦長度合)" message="初期値: 109.7")
            b-slider(v-model="sp_board_aspect_ratio" :min="0" :max="200" :step="0.1")

        .box
          .title.is-5 盤グリッド
          b-field(custom-class="is-small" label="グリッドカラー")
            ColorPicker(v-model="sp_grid_color")
          b-field(custom-class="is-small" label="グリッド外枠カラー")
            ColorPicker(v-model="sp_grid_outer_color")
          b-field(custom-class="is-small" label="グリッドの太さ")
            b-slider(v-model="sp_grid_stroke" :min="0" :max="5" :step="0.5")
          b-field(custom-class="is-small" label="グリッド外枠の太さ" message="最も細い線はブラウザ依存 Safari: 1.5px, Chrome: 2.0px")
            b-slider(v-model="sp_grid_outer_stroke" :min="0" :max="10" :step="0.5")
          b-field(custom-class="is-small" label="星")
            b-slider(v-model="sp_grid_star" :min="0" :max="100" :step="0.01")

        .box
          .title.is-5 駒
          b-field(custom-class="is-small" label="プリセット" message="画像は拡大で画質がぼやける")
            b-select(size="is-small" v-model="sp_pi_variant")
              template(v-for="e in PiVariantInfo.values")
                option(:value="e.key") {{e.name}}
          b-field(custom-class="is-small" label="盤上のセルに対するテクスチャ領域の割合")
            b-slider(v-model="sp_board_piece_rate" :min="0" :max="100" :step="0.1")
          b-field(custom-class="is-small" label="テクスチャ領域内のマッピンング縦位置(揃える位置)" message="↓にすると駒の底辺が揃う(ただし駒の種類による)")
            b-radio-button(size="is-small" v-model="sp_board_piece_position" native-value="top") ↑
            b-radio-button(size="is-small" v-model="sp_board_piece_position" native-value="center") ・
            b-radio-button(size="is-small" v-model="sp_board_piece_position" native-value="bottom") ↓
          b-field(custom-class="is-small" label="ブレンドモード")
            b-select(size="is-small" v-model="sp_mix_blend_mode")
              template(v-for="e in MixBlendModeInfo.values")
                option(:value="e.key") {{e.name}} - {{e.desc}}

          b-field(custom-class="is-small" label="色相")
            b-slider(v-model="sp_piece_hue" :min="-0.5" :max="0.5" :step="0.001")
          b-field(custom-class="is-small" label="彩度")
            b-slider(v-model="sp_piece_saturate" :min="0" :max="4.0" :step="0.001")
          b-field(custom-class="is-small" label="輝度")
            b-slider(v-model="sp_piece_brightness" :min="0" :max="2.0" :step="0.001")
          b-field(custom-class="is-small" label="ぼかし")
            b-slider(v-model="sp_piece_blur" :min="0" :max="30" :step="0.001")
          b-field(custom-class="is-small" label="グレースケール")
            b-slider(v-model="sp_piece_grayscale" :min="0" :max="1.0" :step="0.001")
          b-field(custom-class="is-small" label="コントラスト")
            b-slider(v-model="sp_piece_contrast" :min="0" :max="2.0" :step="0.001")
          b-field(custom-class="is-small" label="反転")
            b-slider(v-model="sp_piece_invert" :min="0" :max="1.0" :step="0.001")
          b-field(custom-class="is-small" label="非透輝度")
            b-slider(v-model="sp_piece_opacity" :min="0" :max="1.0" :step="0.001")

        .box
          .title.is-5 駒台
          .columns.mt-4
            .column.py-0
              b-field(custom-class="is-small" label="セル(Width)")
                b-slider(v-model="sp_stand_piece_w" :min="1" :max="80" :step="1")
            .column.py-0
              b-field(custom-class="is-small" label="セル(Height)")
                b-slider(v-model="sp_stand_piece_h" :min="1" :max="80" :step="1")
          b-field(custom-class="is-small" label="セル内の駒の大きさ")
            b-slider(v-model="sp_stand_piece_rate" :min="0" :max="100" :step="0.1")
          b-field(custom-class="is-small" label="持駒をhoverさせたときのborder色")
            ColorPicker(v-model="sp_stand_hover_border_color")

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
          b-field(custom-class="is-small" label="盤と駒台への適用方法" message="dropは透明度を継承するので元が透明だと影も薄い")
            b-radio-button(size="is-small" v-model="sp_board_shadow" native-value="is_board_shadow_drop") drop
            b-radio-button(size="is-small" v-model="sp_board_shadow" native-value="is_board_shadow_box") box
            b-radio-button(size="is-small" v-model="sp_board_shadow" native-value="is_board_shadow_none") none

        .box
          .title.is-5 画面位置
          .columns
            .column
              b-field(custom-class="is-small" label="垂直位置" expanded)
                b-radio-button(size="is-small" v-model="sp_vpos" native-value="is_top") ↑
                b-radio-button(size="is-small" v-model="sp_vpos" native-value="is_vcentered") ・
                b-radio-button(size="is-small" v-model="sp_vpos" native-value="is_bottom") ↓
            .column
              b-field(custom-class="is-small" label="水平位置" expanded)
                b-radio-button(size="is-small" v-model="sp_hpos" native-value="is_left") ←
                b-radio-button(size="is-small" v-model="sp_hpos" native-value="is_hcentered") ・
                b-radio-button(size="is-small" v-model="sp_hpos" native-value="is_right") →

          //- .columns.mt-4
          //-   .column.py-0
          //-     b-field(custom-class="is-small" label="持駒画像(W)")
          //-       b-slider(v-model="sp_stand_piece_w" :min="1" :max="80" :step="1")
          //-   .column.py-0
          //-     b-field(custom-class="is-small" label="持駒画像(H)")
          //-       b-slider(v-model="sp_stand_piece_h" :min="1" :max="80" :step="1")

          b-field(custom-class="is-small" label="領域縦幅")
            b-radio-button(size="is-small" v-model="sp_fullheight" native-value="is_fullheight_on") 画面サイズ
            b-radio-button(size="is-small" v-model="sp_fullheight" native-value="is_fullheight_off") none

        .box
          .title.is-5 その他
          b-field(custom-class="is-small" label="共通の隙間")
            b-slider(v-model="sp_common_gap" :min="0" :max="100" :step="0.1")

          b-field(custom-class="is-small" label="プリセット")
            .control
              .buttons
                b-button(@click="force_paper_style" size="is-small") 紙面風

          b-field(custom-class="is-small" label="テキストの視認性を上げる(駒数の背景を適用)")
            b-radio-button(size="is-small" v-model="sp_text_visibility_up" native-value="is_text_visibility_up_off") OFF
            b-radio-button(size="is-small" v-model="sp_text_visibility_up" native-value="is_text_visibility_up_on") ON

          b-field(custom-class="is-small" label="移動先セルの明滅")
            b-radio-button(size="is-small" v-model="sp_blink" native-value="is_blink_off") OFF
            b-radio-button(size="is-small" v-model="sp_blink" native-value="is_blink_on") ON

          b-field(custom-class="is-small" label="視点")
            b-radio-button(size="is-small" v-model="sp_flip" :native-value="false") ☗
            b-radio-button(size="is-small" v-model="sp_flip" :native-value="true") ☖

          b-field(custom-class="is-small" label="モバイル時のプリセットサイズ自動適用")
            b-radio-button(size="is-small" v-model="sp_mobile_style" native-value="is_mobile_style_on") ON
            b-radio-button(size="is-small" v-model="sp_mobile_style" native-value="is_mobile_style_off") OFF

          b-field(custom-class="is-small" label="盤の縦辺のセル数")
            b-slider(v-model="sp_dimension" :min="1" :max="18" :step="1")

          b-field(custom-class="is-small" label="コントローラー表示")
            b-radio-button(size="is-small" v-model="controller_show" :native-value="false") OFF
            b-radio-button(size="is-small" v-model="controller_show" :native-value="true") ON

          b-field(custom-class="is-small" label="スライダー表示")
            b-radio-button(size="is-small" v-model="slider_show" :native-value="false") OFF
            b-radio-button(size="is-small" v-model="slider_show" :native-value="true") ON

          b-field(custom-class="is-small" label="手数表示")
            b-radio-button(size="is-small" v-model="summary_show" :native-value="false") OFF
            b-radio-button(size="is-small" v-model="summary_show" :native-value="true") ON

        .box
          .title.is-5 棋譜
          b-field.my-4(custom-class="is-small" label="プリセット")
            b-select(size="is-small" v-model="kifu_sample_key")
              template(v-for="e in KifuBookInfo.values")
                option(:value="e.key") {{e.name}}
          b-field(custom-class="is-small" label="棋譜")
            b-input(size="is-small" v-model="kifu_body" type="textarea")

        .box
          .title.is-5 対局者情報
          .columns
            .column
              b-field(custom-class="is-small" label="☗")
                b-input(size="is-small" v-model.trim="player_info.black.name" type="text")
            .column
              b-field(custom-class="is-small" label="時間")
                b-input(size="is-small" v-model.trim="player_info.black.time" type="text")
          .columns
            .column
              b-field(custom-class="is-small" label="☖")
                b-input(size="is-small" v-model.trim="player_info.white.name" type="text")
            .column
              b-field(custom-class="is-small" label="時間")
                b-input(size="is-small" v-model.trim="player_info.white.time" type="text")

        .box
          .title.is-5 コンポーネント引数確認
          pre
            | {{sp_params}}
        .box
          .title.is-5 CSS変数確認
          pre
            | {{human_css}}

  b-button.sidebar_toggle_button(@click="sidebar_toggle_handle" icon-left="menu" size="is-medium" type="is-text")

  //- b-navbar(type="is-primary" :mobile-burger="false" wrapper-class="container" spaced)
  //-   template(slot="brand")
  //-     b-navbar-item.has-text-weight-bold 将棋盤エディター
  //-   template(slot="end")
  //-     b-navbar-item(@click="sidebar_toggle_handle")
  //-       b-icon(icon="menu")

  //- .section
  //-   .container.is-fluid
  //-     .buttons
  //-     .columns.is-multiline

  div(is="style" v-text="comment_removed_css")
  ShogiPlayer(v-bind="sp_params")
</template>

<script>
const DEVELOPMENT_P = process.env.NODE_ENV === "development"
const IS_TRANSPARENT = "rgba(0,0,0,0)" // chroma は "transparent" をパースできないため

import chroma from "chroma-js"
import { Slider, Chrome } from "vue-color"

import HumanSideInfo  from "./models/human_side_info.js"
import RunModeInfo    from "./models/run_mode_info.js"
import BgVariantInfo  from "./models/bg_variant_info.js"
import PiVariantInfo  from "./models/pi_variant_info.js"
import KifuBookInfo from "./models/KifuBookInfo.js"
import { MixBlendModeInfo } from "./models/MixBlendModeInfo.js"

import ShogiPlayer from "./ShogiPlayer.vue"
import ColorPicker from "./ColorPicker.vue"
import ImageUpload from "./ImageUpload.vue"

export default {
  name: "StyleEditor",
  components: {
    ShogiPlayer,
    ColorPicker,
    ImageUpload,
  },
  data() {
    return {
      sidebar_p: true,

      ////////////////////////////////////////////////////////////////////////////////
      sp_ground_image: null,
      sp_board_image: null,

      sp_ground_color: "#C6E1B8",
      sp_ground_blur: 0,
      sp_ground_grayscale: 0,
      sp_ground_contrast: 1.0,
      sp_ground_invert: 0,
      sp_ground_hue:        0,
      sp_ground_saturate:   1.0,
      sp_ground_brightness: 1.0,

      sp_piece_blur: 0,
      sp_piece_grayscale: 0,
      sp_piece_contrast: 1.0,
      sp_piece_invert: 0,
      sp_piece_opacity: 1.0,
      sp_piece_hue:        0,
      sp_piece_saturate:   1.0,
      sp_piece_brightness: 1.0,

      sp_board_color: "rgba(0, 0, 0, 0.2)",
      sp_board_blur: 0,
      sp_board_grayscale: 0,
      sp_board_contrast: 1.0,
      sp_board_invert: 0,
      sp_board_opacity: 1.0,
      sp_board_hue:        0,
      sp_board_saturate:   1.0,
      sp_board_brightness: 1.0,

      sp_board_aspect_ratio: 109.7,
      sp_board_piece_rate: 90,
      sp_board_piece_position: "center",
      sp_mix_blend_mode: "normal",
      sp_board_radius: 5,
      sp_board_padding: 1.5,

      sp_hpos: "is_hcentered",
      sp_vpos: "is_vcentered",
      sp_layout: "is_vertical",
      sp_run_mode: "edit_mode",
      sp_body_max_width: 35,
      sp_body_max_width: 35,
      sp_mobile_style: "is_mobile_style_on",

      // 影
      sp_shadow_offset: 2,
      sp_shadow_blur: 3,
      sp_shadow_color: "rgba(0, 0, 0, 0.4)",

      sp_fullheight: "is_fullheight_on",
      sp_text_visibility_up: "is_text_visibility_up_on",

      sp_stand_piece_w: 47,
      sp_stand_piece_h: 50,
      sp_stand_piece_rate: 80,
      sp_stand_hover_border_color: "rgba(0, 0, 0, 0.2)",

      sp_flip: false,
      sp_piece_count_gap_right: 62.0,
      sp_piece_count_gap_bottom: 47.0,
      sp_piece_count_font_size: 8,
      sp_piece_count_font_color:  "rgba(0, 0, 0, 0.75)",
      sp_piece_count_bg_color: "rgba(255, 255, 255, 0.75)",
      sp_piece_count_padding: 2,

      sp_grid_outer_stroke: 1.5,
      sp_grid_outer_color: "rgba(0, 0, 0, 0.5)",
      sp_grid_color: "rgba(0, 0, 0, 0.5)",
      sp_grid_stroke: 1,
      sp_grid_star: 10,

      sp_piece_box_color: "rgba(0, 0, 0, 0.2)",
      sp_piece_box_piece_w: 38,
      sp_piece_box_piece_h: 46,
      sp_piece_box_piece_rate: 90,

      sp_common_gap: 12,
      sp_layer: DEVELOPMENT_P ? "is_layer_off" : "is_layer_off",
      sp_board_shadow: "is_board_shadow_drop",
      sp_blink: "is_blink_on",
      sp_pi_variant: "is_pi_variant_a1by",
      sp_bg_variant: "is_bg_variant_none",
      sp_dimension: 9,
      ////////////////////////////////////////////////////////////////////////////////

      kifu_sample_key: null,

      ////////////////////////////////////////////////////////////////////////////////

      player_info: {
        black: { name: "先手", time: "", },
        white: { name: "後手", time: "", },
      },

      kifu_body: null,

      summary_show: true,
      slider_show: true,
      controller_show: true,
    }
  },

  created() {
    this.kifu_sample_key = this.KifuBookInfo.values[0].key

    if (false) {
      this.player_info = {
        black: { name: "先手", time: "12:34", },
        white: { name: "後手", time: "56:78", },
      }
    }
  },

  watch: {
    kifu_sample_key(v) {
      if (this.kifu_book_info) {
        this.kifu_body = this.kifu_book_info.kifu_body
        this.player_info.black.name = this.kifu_book_info.black
        this.player_info.white.name = this.kifu_book_info.white
      } else {
        this.kifu_body = "position startpos"
      }
    },
  },

  methods: {
    player_info_click_handle(location, player_info) {
      this.$buefy.toast.open({message: `${location.name} ${player_info.name}`, queue: false, type: "is-white"})
    },
    sidebar_toggle_handle() {
      this.sidebar_p = !this.sidebar_p
    },
    sp_ground_image_input_handle(v) {
      this.sp_ground_image = v
    },
    sp_board_image_input_handle(v) {
      this.sp_board_image = v
      this.sp_bg_variant = "is_bg_variant_none" // 背景画像プリセットを選択してない状態に戻しておく
    },
    force_paper_style() {
      this.sp_pi_variant        = "is_pi_variant_b" // 紙面風駒
      this.sp_board_padding     = 0                 // 隙間なし
      this.sp_ground_color      = IS_TRANSPARENT    // 背景透過
      this.sp_board_color       = IS_TRANSPARENT    // 盤透過
      this.sp_grid_stroke       = 1                 // グリッド線(細)
      this.sp_grid_outer_stroke = 1.5               // グリッド枠(細)
    },
    hsla_format(v) {
      return chroma(v).css("hsla")
    },
  },
  computed: {
    HumanSideInfo()  { return HumanSideInfo  },
    RunModeInfo()    { return RunModeInfo    },
    BgVariantInfo()  { return BgVariantInfo  },
    PiVariantInfo()  { return PiVariantInfo  },
    KifuBookInfo() { return KifuBookInfo },
    MixBlendModeInfo() { return MixBlendModeInfo },

    kifu_book_info() {
      if (this.kifu_sample_key) {
        return KifuBookInfo.fetch(this.kifu_sample_key)
      }
    },

    chroma() { return chroma },

    component_class() {
      return {
        sidebar_p: this.sidebar_p,
      }
    },

    sp_board_image_url() {
      if (!this.sp_board_image) {
        return "none"
      }
      return `url(${this.sp_board_image})`
    },

    sp_ground_bg_url() {
      if (!this.sp_ground_image) {
        return "none"
      }
      return `url(${this.sp_ground_image})`
    },

    sp_params() {
      let params = {}
      params.player_info_click_handle = this.player_info_click_handle
      params.sp_layout                = this.sp_layout
      params.sp_blink                 = this.sp_blink
      params.sp_hpos                  = this.sp_hpos
      params.sp_vpos                  = this.sp_vpos
      params.sp_fullheight            = this.sp_fullheight
      params.sp_text_visibility_up    = this.sp_text_visibility_up
      params.sp_layer                 = this.sp_layer
      params.sp_board_shadow                = this.sp_board_shadow
      params.sp_pi_variant            = this.sp_pi_variant
      params.sp_bg_variant            = this.sp_bg_variant
      params.sp_mobile_style          = this.sp_mobile_style
      params.run_mode                 = this.sp_run_mode
      params.flip                     = this.sp_flip
      params.debug_mode_p             = this.false
      params.start_turn               = -1
      params.kifu_body                = this.kifu_body
      params.sound_effect             = true
      params.setting_button_show      = false
      params.summary_show             = this.summary_show
      params.slider_show              = this.slider_show
      params.controller_show          = this.controller_show
      params.player_info              = this.player_info
      return params
    },

    human_css() {
      let s = this.raw_css
      s = s.replace(/url\(.*\)/g, "url(...)")
      s = s.replace(/\s*.StyleEditor.*\n/, "")
      s = s.replace(/\s}\s*\n/, "")
      s = s.replace(/;/g, "")
      s = s.replace(/^\s*/gm, "")
      s = s.replace(/:\s*/g, ": ")
      s = s.replace(/^--/gm, "")
      return s
    },

    comment_removed_css() {
      let s = this.raw_css
      s = s.replace(/^\s*\/\/.*\n/gm, "")
      return s
    },

    raw_css() {
      return `
        .StyleEditor {
          --sp_body_max_width:           ${this.sp_body_max_width}vw;
          --sp_common_gap:               ${this.sp_common_gap}px;
          --sp_dimension:                ${this.sp_dimension};

          // 背景
          --sp_ground_color:             ${this.hsla_format(this.sp_ground_color)};
          --sp_ground_image:             ${this.sp_ground_bg_url};
          --sp_ground_blur:              ${this.sp_ground_blur};
          --sp_ground_grayscale:         ${this.sp_ground_grayscale};
          --sp_ground_contrast:          ${this.sp_ground_contrast};
          --sp_ground_invert:            ${this.sp_ground_invert};

          --sp_ground_hue:               ${this.sp_ground_hue};
          --sp_ground_saturate:          ${this.sp_ground_saturate};
          --sp_ground_brightness:        ${this.sp_ground_brightness};

          // 盤テクスチャ
          --sp_board_color:              ${this.hsla_format(this.sp_board_color)};
          --sp_board_image:              ${this.sp_board_image_url};
          --sp_board_blur:               ${this.sp_board_blur};
          --sp_board_grayscale:          ${this.sp_board_grayscale};
          --sp_board_contrast:           ${this.sp_board_contrast};
          --sp_board_invert:             ${this.sp_board_invert};
          --sp_board_opacity:            ${this.sp_board_opacity};
          --sp_board_hue:                ${this.sp_board_hue};
          --sp_board_saturate:           ${this.sp_board_saturate};
          --sp_board_brightness:         ${this.sp_board_brightness};

          // 盤
          --sp_board_padding:            ${this.sp_board_padding};
          --sp_board_radius:             ${this.sp_board_radius};
          --sp_board_aspect_ratio:       ${this.sp_board_aspect_ratio};
          --sp_board_piece_rate:         ${this.sp_board_piece_rate}%;
          --sp_board_piece_position:     ${this.sp_board_piece_position};
          --sp_mix_blend_mode:           ${this.sp_mix_blend_mode};

          // 盤グリッド
          --sp_grid_color:               ${this.hsla_format(this.sp_grid_color)};
          --sp_grid_outer_color:              ${this.hsla_format(this.sp_grid_outer_color)};
          --sp_grid_stroke:              ${this.sp_grid_stroke};
          --sp_grid_outer_stroke:        ${this.sp_grid_outer_stroke};
          --sp_grid_star:                ${this.sp_grid_star}%;

          // 駒
          --sp_piece_blur:               ${this.sp_piece_blur};
          --sp_piece_grayscale:          ${this.sp_piece_grayscale};
          --sp_piece_contrast:           ${this.sp_piece_contrast};
          --sp_piece_invert:             ${this.sp_piece_invert};
          --sp_piece_opacity:            ${this.sp_piece_opacity};
          --sp_piece_hue:                ${this.sp_piece_hue};
          --sp_piece_saturate:           ${this.sp_piece_saturate};
          --sp_piece_brightness:         ${this.sp_piece_brightness};

          // 駒数
          --sp_piece_count_gap_right:    ${this.sp_piece_count_gap_right}%;
          --sp_piece_count_gap_bottom:   ${this.sp_piece_count_gap_bottom}%;
          --sp_piece_count_font_size:    ${this.sp_piece_count_font_size}px;
          --sp_piece_count_font_color:   ${this.hsla_format(this.sp_piece_count_font_color)};
          --sp_piece_count_bg_color:     ${this.hsla_format(this.sp_piece_count_bg_color)};
          --sp_piece_count_padding:      ${this.sp_piece_count_padding}px;

          // 駒台
          --sp_stand_piece_rate:         ${this.sp_stand_piece_rate}%;
          --sp_stand_hover_border_color: ${this.hsla_format(this.sp_stand_hover_border_color)};
          --sp_stand_piece_w:            ${this.sp_stand_piece_w}px;
          --sp_stand_piece_h:            ${this.sp_stand_piece_h}px;

          // 駒箱
          --sp_piece_box_piece_w:        ${this.sp_piece_box_piece_w}px;
          --sp_piece_box_piece_h:        ${this.sp_piece_box_piece_h}px;
          --sp_piece_box_piece_rate:     ${this.sp_piece_box_piece_rate}%;
          --sp_piece_box_color:          ${this.hsla_format(this.sp_piece_box_color)};

          // 影
          --sp_shadow_offset:            ${this.sp_shadow_offset};
          --sp_shadow_blur:              ${this.sp_shadow_blur};
          --sp_shadow_color:             ${this.hsla_format(this.sp_shadow_color)};
        }
      `
    },
  },
}
</script>

<style lang="sass">
$sidebar_width_desktop: 30%
$sidebar_width_tablet:  40%
$sidebar_width_mobile:  50%

.StyleEditor-Sidebar
  .sidebar-content
    +mobile
      width: $sidebar_width_mobile
    +tablet
      width: $sidebar_width_tablet
    +desktop
      width: $sidebar_width_desktop

  .box
    margin-top: 1rem
    margin-bottom: 0

  .title
    margin-top: 0.4rem
    margin-bottom: 1rem

  .field:not(:last-child)
    margin-bottom: 1.25rem

  .b-slider
    margin: 0 // .help が下すぎるのを防ぐため
    .help
      margin-top: 0.5rem

  pre
    background-color: IS_TRANSPARENT

.StyleEditor
  .sidebar_toggle_button
    position: fixed
    top: 0
    right: 0
    z-index: 1

  &.sidebar_p
    .ShogiPlayer
      +mobile
        width: 100%
      +tablet
        width: unquote("calc(100% - #{$sidebar_width_tablet})")
      +desktop
        width: unquote("calc(100% - #{$sidebar_width_desktop})")
</style>
