<template lang="pug">
#app
  //- .has-background-black-ter
  .section
    .container.is-fluid
      .columns.is-multiline
        .column.is-2
          b-field(custom-class="is-small" label="横時駒台(min-w)")
            b-slider(v-model="sp_membership_min_width" :min="1" :max="20" :step="0.05")
          b-field(custom-class="is-small" label="縦時駒台(min-h)")
            b-slider(v-model="sp_membership_min_height" :min="1" :max="20" :step="0.05")
        .column.is-2
          b-field(custom-class="is-small" label="持駒画像w")
            b-slider(v-model="sp_piece_w" :min="1" :max="10" :step="0.05")
          b-field(custom-class="is-small" label="持駒画像h")
            b-slider(v-model="sp_piece_h" :min="1" :max="10" :step="0.05")
        .column.is-2
          b-field(custom-class="is-small" label="横幅(vw)")
            b-slider(v-model="screen_width" :min="1" :max="100")
        .column.is-2
          b-field(custom-class="is-small" label="縦時駒数位置")
            b-slider(v-model="sp_piece_object_count_gap_bottom" :min="-50" :max="150")
          b-field(custom-class="is-small" label="横時駒数位置")
            b-slider(v-model="sp_piece_object_count_gap_right" :min="-50" :max="150")
        //- .column
        //-   b-field(custom-class="is-small" label="文字(vw)")
        //-     b-slider(v-model="sp_fsize" :min="0" :max="100.0 / 9" :step="0.1")
        //- .column
        //-   b-field(custom-class="is-small" label="文字サイズ(規定)")
        //-     b-radio-button(v-model="sp_fsize_class" native-value="is_size_small") S
        //-     b-radio-button(v-model="sp_fsize_class" native-value="is_size_medium") M
        //-     b-radio-button(v-model="sp_fsize_class" native-value="is_size_large") L
        //-     b-radio-button(v-model="sp_fsize_class" native-value="is_size_none") none
        .column
          b-field(custom-class="is-small" label="テクスチャ")
            b-radio-button(v-model="sp_texture" native-value="is_texture_image") 画像
            b-radio-button(v-model="sp_texture" native-value="is_texture_text") 文字
            b-radio-button(v-model="sp_texture" native-value="is_texture_none") none
        .column
          b-field(custom-class="is-small" label="並び")
            b-radio-button(v-model="sp_layout" native-value="is_vertical") 縦
            b-radio-button(v-model="sp_layout" native-value="is_horizontal") 横
        .column
          b-field(custom-class="is-small" label="水平位置")
            b-radio-button(v-model="sp_hpos" native-value="is_left") ←
            b-radio-button(v-model="sp_hpos" native-value="is_centered") ・
            b-radio-button(v-model="sp_hpos" native-value="is_right") →
        .column
          b-field(custom-class="is-small" label="垂直位置")
            b-radio-button(v-model="sp_vpos" native-value="is_top") ↑
            b-radio-button(v-model="sp_vpos" native-value="is_vcentered") ・
            b-radio-button(v-model="sp_vpos" native-value="is_bottom") ↓
        .column
          b-field(custom-class="is-small" label="垂直領域")
            b-radio-button(v-model="sp_is_fullheight" native-value="is_fullheight") 全
            b-radio-button(v-model="sp_is_fullheight" native-value="") なし
        .column
          b-field(custom-class="is-small" label="レイヤー確認")
            b-radio-button(v-model="sp_layer" native-value="is_layer_on") ON
            b-radio-button(v-model="sp_layer" native-value="is_layer_off") OFF
        .column
          b-field(custom-class="is-small" label="駒種類")
            b-radio-button(v-model="sp_pi_variant" native-value="is_pi_variant_a") a
            b-radio-button(v-model="sp_pi_variant" native-value="is_pi_variant_b") b
            b-radio-button(v-model="sp_pi_variant" native-value="is_pi_variant_c") c
            b-radio-button(v-model="sp_pi_variant" native-value="is_pi_variant_d") d
            b-radio-button(v-model="sp_pi_variant" native-value="is_pi_variant_none") none
        .column
          b-field(custom-class="is-small" label="盤種類")
            b-radio-button(v-model="sp_bg_variant" native-value="is_bg_variant_a") a
            b-radio-button(v-model="sp_bg_variant" native-value="is_bg_variant_b") b
            b-radio-button(v-model="sp_bg_variant" native-value="is_bg_variant_c") c
            b-radio-button(v-model="sp_bg_variant" native-value="is_bg_variant_d") d
            b-radio-button(v-model="sp_bg_variant" native-value="is_bg_variant_e") e
            b-radio-button(v-model="sp_bg_variant" native-value="is_bg_variant_f") f
            b-radio-button(v-model="sp_bg_variant" native-value="is_bg_variant_none") none
        .column
          b-field(custom-class="is-small" label="視点")
            b-radio-button(v-model="sp_flip" :native-value="false") ☗
            b-radio-button(v-model="sp_flip" :native-value="true") ☖

  div(is="style" v-text="style_define")

  ShogiPlayer(
    :style_params="{sp_texture, sp_layout, sp_hpos, sp_vpos, sp_is_fullheight, sp_fsize_class, sp_layer, sp_pi_variant, sp_bg_variant}"
    :run_mode="'play_mode'"
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

export default {
  name: 'app',
  components: {
    ShogiPlayer,
  },
  data() {
    return {
      sp_hpos: "is_centered",
      sp_vpos: "is_vcentered",
      sp_layout: "is_vertical",
      sp_texture: "is_texture_image",
      sp_fsize: 2.0,
      screen_width: 30,
      sp_fsize_class: "is_size_none",
      sp_is_fullheight: "",
      sp_piece_w: 2.4,
      sp_piece_h: 2.95,
      sp_flip: false,
      sp_piece_object_count_gap_right: 84,
      sp_piece_object_count_gap_bottom: 84,
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
  computed: {
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
          --sp_piece_object_count_gap_right: ${this.sp_piece_object_count_gap_right}%;
          --sp_piece_object_count_gap_bottom: ${this.sp_piece_object_count_gap_bottom}%;
        }
      `
    },
  },
}
</script>

<style lang="sass">
@import "~bulma/sass/utilities/_all"
@import "./components/ShogiPlayer.sass" // Rails 側では sp_assets_dir を変更してから読み込む
#app
  .ShogiPlayerWidth
</style>
