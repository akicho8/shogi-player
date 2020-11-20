<template lang="pug">
#app
  .virtual_screen
    .virtual_screen_one
      shogi-player(
        :run_mode="'edit_mode'"
        :debug_mode="false"
        :start_turn="0"
        :kifu_body="'position sfen 4R1gnk/6+Bsl/5+P1pp/9/9/9/9/9/9 b rb3g3s3n2l15pR3BG18SN 1 moves 3b2a 3a2a 5a2a+ 1a2a G*3b 2a1a 3b2b 1a2b N*3d 2b1a S*2b'"
        :theme="'real'"
        :size="'xxx'"
        :flip="false"
        :sound_effect="true"
        :vlayout="true"
        :setting_button_show="true"
        :controller_show="true"
        :player_info="player_info"
      )
    .virtual_screen_one
      shogi-player(
        :run_mode="'edit_mode'"
        :debug_mode="false"
        :start_turn="0"
        :kifu_body="'position sfen 4R1gnk/6+Bsl/5+P1pp/9/9/9/9/9/9 b rb3g3s3n2l15pR3BG18SN 1 moves 3b2a 3a2a 5a2a+ 1a2a G*3b 2a1a 3b2b 1a2b N*3d 2b1a S*2b'"
        :theme="'simple'"
        :size="'xxx'"
        :flip="false"
        :sound_effect="true"
        :vlayout="true"
        :setting_button_show="true"
        :controller_show="true"
        :player_info="player_info"
      )
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import Buefy from 'buefy'

Vue.use(Vuex)
Vue.use(Buefy)

import ShogiPlayer from './components/ShogiPlayer'

import SideInfo from "./models/side_info"
import RunModeInfo from "./models/run_mode_info"
import ThemeInfo from "./models/theme_info"
import BgVariantInfo from "./models/bg_variant_info"
import PieceVariantInfo from "./models/piece_variant_info"
import SizeInfo from "./models/size_info"

export default {
  name: 'app',

  data() {
    return {
      SideInfo,
      RunModeInfo,
      ThemeInfo,
      BgVariantInfo,
      PieceVariantInfo,
      SizeInfo,

      modal_p: false,
      modal_p2: false,

      // カスタマイズ用
      run_mode: "view_mode",   // play_mode
      theme: "real",
      bg_variant: "a",
      piece_variant: "a",
      size: "default",
      start_turn: -1,
      slider_show: true,
      overlay_navi: true,
      controller_show: true,
      sfen_show: true,
      human_side_key: 'both',
      sound_effect: true,
      volume: 0.5,
      key_event_capture: false,
      debug_mode: false,
      hidden_if_piece_stand_blank: false,
      setting_button_show: true,
      summary_show: true,
      operation_disable: false,
      flip: false,
      flip_if_white: false,
      vlayout: false,

      player_info: {
        black: { name: "先手", time: "",        },
        white: { name: "後手", time: "56:78:90" },
      },

      final_label: null,
      kifu_body: require("./極限早繰り銀.kif"),

      trigger_toast_p: false,

      edit_mode_snapshot_sfen: null,
      mediator_snapshot_sfen: null,
      play_mode_advanced_full_moves_sfen: null,
      play_mode_advanced_snapshot_sfen: null,
      play_mode_advanced_last_move: null,
      play_mode_advanced_moves: null,
      turn_offset: null,
      moves_take_turn_offset: null,

      kif_sample1: require("./第11回朝日杯将棋オープン戦本戦.kif"),
      kif_sample2: require("./藤井聡太四段_vs_澤田真吾六段.kif"),
    }
  },

  components: {
    ShogiPlayer,
  },

  methods: {
    board_cell_left_click_user_handle(place, event) {
      this.$buefy.toast.open({message: `${place.kanji_human}のセルをクリック`, queue: false})
      return true
    },
    board_cell_pointerdown_user_handle(place, event) {
      this.$buefy.toast.open({message: `${place.kanji_human}のセルをクリック(押した瞬間)`, queue: false})
      return true
    },

    run_api_random_puton()   { this.$refs.api_sp.api_random_puton()   },
    run_api_retract_a_move() { this.$refs.api_sp.api_retract_a_move() },

    // edit_mode_snapshot_sfen_set(v)            { this.edit_mode_snapshot_sfen            = v },
    // mediator_snapshot_sfen_set(v)             { this.mediator_snapshot_sfen             = v },
    // play_mode_advanced_full_moves_sfen_set(v) { this.play_mode_advanced_full_moves_sfen = v },
    // play_mode_advanced_snapshot_sfen_set(v)   { this.play_mode_advanced_snapshot_sfen   = v },
    // play_mode_advanced_last_move_set(v)       { this.play_mode_advanced_last_move       = v },
    // play_mode_advanced_moves_set(v)           { this.play_mode_advanced_moves           = v },
    // turn_offset_set(v)                        { this.turn_offset                        = v },
    // update_kifu_source(v) {
    //   // this.kifu_body = v
    // },

    trigger_check(key, v) {
      this.$data[key] = v
      if (this.trigger_toast_p) {
        this.$buefy.toast.open({message: `${key} -> ${JSON.stringify(v)}`, queue: false})
      }
    },
  },
}
</script>

<style lang="sass">
// ShogiPlayer.sass のなかで読み込むと親アプリ側で読み込んだ Buefy を干渉してラジオボタンが崩れたりする
@import "~buefy/src/scss/buefy-build.scss"

// Rails から使うとき Rails 側から見た assets へのパスに変更すること (そうしないと assets を参照できない)
$sp_assets_dir: "assets" !default

// Rails 側で sp_assets_dir を変更してから読み込みたいので .vue の中では読まないようにする
@import "./components/ShogiPlayer.sass"

.hero
  &.is-primary
    background-color: transparent !important

  position: relative
  &:after
    position: absolute
    z-index: -1
    content: ""
    background-image: url("./assets/hero.jpg")
    background-position: center
    background-size: cover
    opacity: 1.0
    top: 0
    left: 0
    width: 100%
    height: 100%

.hero-foot
  li
    // background: hsla(0, 0%, 0%, .1)
    // box-shadow: 0 0 10vmin hsla(0, 0%, 0%, 1.0)

// 基本、英単語の途中でも折り返す
.content
  word-break: break-all

// オプションの説明がつっぱらないように横スクロールバー表示
.table_wrap
  overflow-x: auto
  table
    white-space: nowrap

.original
  position: relative
  padding: 3vmin
  &:after
    position: absolute
    z-index: -1
    content: ""
    background-color: hsla(0, 0%, 96%, 1.0)
    // background-image: url("./assets/tatami01-768x480.jpg")
    // border-radius: 1vmin
    // background-position: center
    // background-size: cover
    // opacity: 0.25
    top: 0
    left: 0
    width: 100%
    height: 100%
    // filter: saturate(80%);
    /* filter: contrast(100%)
    /* filter: sepia(100%)
  .CommentBlock
    .message
      margin-left: auto
      margin-right: auto
      max-width: 65ch

pre
  font-family: Osaka-mono, "Osaka-等幅", "ＭＳ ゴシック", "Courier New", Consolas, monospace ! important
  white-space: pre-wrap
  word-break: break-all

html
  +mobile
    font-size: 70%

#app
  .section
    +mobile
      margin: 2em 0em
      margin-bottom: 1em
      padding: 0

  .message-body
    +mobile
      font-size: 75%

  .title
    +mobile
      font-size: 150%

// ここで読み込むとカレントディレクトリが /src 扱いのため components/* から ../assets と参照してもパスが合わない
// main.js で読み込むと .sass のファイル基準になる
// @import "./components/ShogiPlayer.sass"

.virtual_screen
  display: flex
  .virtual_screen_one
    border: 1px dashed change_color($primary, $alpha: 0.5)
    margin: auto
    width: 600px ! important
    height: 100vh
    .Membership
      // border: 1px dashed change_color($primary, $alpha: 0.5)
</style>
