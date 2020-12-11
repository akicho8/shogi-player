<template lang="pug">
.MainDocOption(:class="component_class")
  b-sidebar.MainDocOption-Sidebar(fullheight right v-model="sidebar_p" position="fixed" open)
    .mx-4.my-4
      .is-flex.is-justify-content-start.is-align-items-center
        b-button(@click="sidebar_toggle" icon-left="close")
        //- .mx-3.has-text-weight-bold オプション

      .my_controls
        .box
          b-field(custom-class="is-small" label="run_mode")
            template(v-for="e in RunModeInfo.values")
              b-radio-button(size="is-small" v-model="run_mode" :native-value="e.key") {{e.name}}

        .box
          .title.is-5 棋譜
          b-field(custom-class="is-small" label="kifu_body")
            b-input(size="is-small" v-model="kifu_body" type="textarea")
          b-field(custom-class="is-small" label="start_turn")
            //- b-slider(v-model="start_turn" :min="-1" :max="256" step="1")
            b-input(size="is-small" v-model="start_turn" type="number")

        .box
          .title.is-5 対局者情報
          b-field(custom-class="is-small" label="player_info.black.name")
            b-input(size="is-small" v-model.trim="player_info.black.name" type="text")
          b-field(custom-class="is-small" label="player_info.white.name")
            b-input(size="is-small" v-model.trim="player_info.white.name" type="text")

        .box
          .title.is-5 レイアウト
          b-field(custom-class="is-small" label="配置")
            b-radio-button(size="is-small" v-model="sp_layout" native-value="is_vertical") 上下
            b-radio-button(size="is-small" v-model="sp_layout" native-value="is_horizontal") 左右
          MainDocSwitch(v-model="setting_button_show" label="setting_button_show")
          MainDocSwitch(v-model="summary_show" label="summary_show")
          MainDocSwitch(v-model="slider_show" label="slider_show")
          MainDocSwitch(v-model="controller_show" label="controller_show")
          MainDocSwitch(v-model="sfen_show" label="sfen_show")
          MainDocSwitch(v-model="flip" label="flip")
          MainDocSwitch(v-model="flip_if_white" label="flip_if_white")
          MainDocSwitch(v-model="hidden_if_piece_stand_blank" label="hidden_if_piece_stand_blank")

        .box
          .title.is-5 効果音
          MainDocSwitch(v-model="sound_effect" label="sound_effect")
          b-field(custom-class="is-small" label="volume")
            b-slider(v-model="volume" :min="0" :max="1.0" step="0.01")

        .box
          .title.is-5 テクスチャ
          b-field(custom-class="is-small" label="sp_bg_variant")
            b-select(size="is-small" v-model="sp_bg_variant")
              template(v-for="e in BgVariantInfo.values")
                option(:value="e.key") {{e.name}}

          b-field(custom-class="is-small" label="sp_pi_variant")
            b-select(size="is-small" v-model="sp_pi_variant")
              template(v-for="e in PiVariantInfo.values")
                option(:value="e.key") {{e.name}}

        .box
          .title.is-5 その他
          b-field(custom-class="is-small" label="final_label")
            b-input(size="is-small" v-model.trim="final_label" type="text")
          MainDocSwitch(v-model="overlay_navi" label="overlay_navi")
          MainDocSwitch(v-model="key_event_capture" label="key_event_capture")
          MainDocSwitch(v-model="debug_mode_p" label="debug_mode_p")
          MainDocSwitch(v-model="operation_disable" label="operation_disable")
          b-field(custom-class="is-small" label="human_side_key")
            template(v-for="e in HumanSideInfo.values")
              b-radio-button(size="is-small" v-model="human_side_key" :native-value="e.key") {{e.name}}

        .box
          .title.is-5 操作モードのイベント受信内容

          MainDocSwitch(v-model="trigger_toast_p" label="イベント確認")

          b-field(custom-class="is-small" label="@update:play_mode_advanced_full_moves_sfen: 操作モードで指した直後の局面を発行(movesあり)")
            b-input(size="is-small" :value="JSON.stringify(play_mode_advanced_full_moves_sfen)" readonly type="textarea" rows="1")

          b-field(custom-class="is-small" label="@update:play_mode_advanced_snapshot_sfen: 操作モードで指した直後の局面を発行(movesなし)")
            b-input(size="is-small" :value="JSON.stringify(play_mode_advanced_snapshot_sfen)" readonly type="textarea")

          b-field(custom-class="is-small" label="@update:play_mode_advanced_last_move: 操作モードで指した手(sfenのmovesの最後の1つ)")
            b-input(size="is-small" :value="JSON.stringify(play_mode_advanced_last_move)" readonly type="textarea")

          b-field(custom-class="is-small" label="@update:play_mode_advanced_moves: 操作モードで指した手を含むmoves配列")
            b-input(size="is-small" :value="JSON.stringify(play_mode_advanced_moves)" readonly type="textarea")

          b-field(custom-class="is-small" label="@update:mediator_snapshot_sfen: 操作モード(または再生モード)で盤面が変化したとき(常に更新)")
            b-input(size="is-small" :value="JSON.stringify(mediator_snapshot_sfen)" readonly type="textarea")

          b-field(custom-class="is-small" label="@update:edit_mode_snapshot_sfen: 編集モードで盤面が変化したとき")
            b-input(size="is-small" :value="JSON.stringify(edit_mode_snapshot_sfen)" readonly type="textarea")

          b-field(custom-class="is-small" label="@update:turn_offset: 手数が変化したとき")
            b-input(size="is-small" :value="JSON.stringify(turn_offset)" readonly type="text")

          b-field(custom-class="is-small" label="@update:moves_take_turn_offset: 操作モードでmovesをturn_offsetでtakeしたもの")
            b-input(size="is-small" :value="JSON.stringify(moves_take_turn_offset)" readonly type="text")

  MainDocMainNavbar
    template(slot="brand")
      MainDocNavbarItemHome
      b-navbar-item(tag="div").has-text-weight-bold オプション
    template(slot="end")
      b-navbar-item.has-text-weight-bold(@click="sidebar_toggle")
        | テスト

  //- この form は prevent が効いているか確認するためのもの
  .section
    .container
      form(action="/")
        .SpWrap
          ShogiPlayer(
            :run_mode.sync="run_mode"
            :kifu_body.sync="kifu_body"
            :start_turn.sync="start_turn"
            :sp_bg_variant.sync="sp_bg_variant"
            :sp_pi_variant.sync="sp_pi_variant"
            :sp_layout="sp_layout"
            :debug_mode_p.sync="debug_mode_p"
            :hidden_if_piece_stand_blank="hidden_if_piece_stand_blank"
            :setting_button_show="setting_button_show"
            :summary_show="summary_show"
            :operation_disable="operation_disable"
            :flip.sync="flip"
            :flip_if_white="flip_if_white"
            :final_label="final_label"
            :player_info="player_info"
            :key_event_capture="key_event_capture"
            :slider_show="slider_show"
            :controller_show="controller_show"
            :sfen_show="sfen_show"
            :overlay_navi="overlay_navi"
            :sound_effect="sound_effect"
            :volume="volume"
            :human_side_key="human_side_key"

            @update:edit_mode_snapshot_sfen="            e => trigger_check('edit_mode_snapshot_sfen', e)"
            @update:mediator_snapshot_sfen="             e => trigger_check('mediator_snapshot_sfen', e)"
            @update:play_mode_advanced_full_moves_sfen=" e => trigger_check('play_mode_advanced_full_moves_sfen', e)"
            @update:play_mode_advanced_snapshot_sfen="   e => trigger_check('play_mode_advanced_snapshot_sfen', e)"
            @update:play_mode_advanced_last_move="       e => trigger_check('play_mode_advanced_last_move', e)"
            @update:play_mode_advanced_moves="           e => trigger_check('play_mode_advanced_moves', e)"
            @update:turn_offset="                        e => trigger_check('turn_offset', e)"
            @update:turn_offset_max="                    e => trigger_check('turn_offset_max', e)"
            @update:moves_take_turn_offset="             e => trigger_check('moves_take_turn_offset', e)"

            @click.native="() => $buefy.toast.open({message: '全体のどこかをクリック', queue: false})"
            )

  .section
    .container

      .columns
        .column
          section

            b-message.shogi_player_params(:closable="false" type="is-primary" title="引数")
              pre.is-size-6
                | ShogiPlayer(
                |   :run_mode="'{{run_mode}}'"
                |   :sp_bg_variant="'{{sp_bg_variant}}'"
                |   :sp_pi_variant="'{{sp_pi_variant}}'"
                |   :start_turn="{{start_turn}}"
                |   :slider_show="{{slider_show}}"
                |   :controller_show="{{controller_show}}"
                |   :sfen_show="{{sfen_show}}"
                |   :overlay_navi="{{overlay_navi}}"
                |   :human_side_key="'{{human_side_key}}'"
                |   :sound_effect="{{sound_effect}}"
                |   :volume="{{volume}}"
                |   :key_event_capture="{{key_event_capture}}"
                |   :debug_mode_p="{{debug_mode_p}}"
                |   :hidden_if_piece_stand_blank="{{hidden_if_piece_stand_blank}}"
                |   :setting_button_show="{{setting_button_show}}"
                |   :summary_show="{{summary_show}}"
                |   :operation_disable="{{operation_disable}}"
                |   :flip="{{flip}}"
                |   :flip_if_white="{{flip_if_white}}"
                |   :sp_layout="'{{sp_layout}}'"
                |   :final_label="'{{final_label}}'"
                |   :player_info='{{JSON.stringify(player_info)}}'
                |   :kifu_body="'{{kifu_body}}'"

      MainDocMd(:body="options_md")
      MainDocEditDesc2
</template>

<script>
import options_md from "./options.md"

import HumanSideInfo      from "../models/human_side_info.js"
import RunModeInfo   from "../models/run_mode_info.js"
import BgVariantInfo from "../models/bg_variant_info.js"
import PiVariantInfo from "../models/pi_variant_info.js"

export default {
  name: "MainDocOption",
  data() {
    return {
      options_md,

      HumanSideInfo,
      RunModeInfo,
      BgVariantInfo,
      PiVariantInfo,

      sidebar_p: true,
      sp_body_width: 0,

      // カスタマイズ用
      run_mode: "view_mode",   // play_mode
      sp_bg_variant: "is_bg_variant_a",
      sp_pi_variant: "is_pi_variant_a",
      start_turn: -1,
      slider_show: false,
      overlay_navi: true,
      controller_show: false,
      sfen_show: false,
      human_side_key: 'both',
      sound_effect: true,
      volume: 0.5,
      key_event_capture: false,
      debug_mode_p: false,
      hidden_if_piece_stand_blank: false,
      setting_button_show: false,
      summary_show: true,
      operation_disable: false,
      flip: false,
      flip_if_white: false,
      sp_layout: "is_horizontal",

      player_info: {
        black: { name: "先手", time: "",        },
        white: { name: "後手", time: "56:78:90" },
      },

      final_label: null,
      kifu_body: "position startpos moves 2g2f 3c3d 2f2e 2b3c",

      trigger_toast_p: false,

      edit_mode_snapshot_sfen: null,
      mediator_snapshot_sfen: null,
      play_mode_advanced_full_moves_sfen: null,
      play_mode_advanced_snapshot_sfen: null,
      play_mode_advanced_last_move: null,
      play_mode_advanced_moves: null,
      turn_offset: null,
      moves_take_turn_offset: null,
    }
  },
  methods: {
    sidebar_toggle() {
      this.sidebar_p = !this.sidebar_p
    },
    trigger_check(key, v) {
      this.$data[key] = v
      if (this.trigger_toast_p) {
        this.$buefy.toast.open({message: `${key} -> ${JSON.stringify(v)}`, queue: false})
      }
    },
  },
  computed: {
    component_class() {
      return {
        sidebar_p: this.sidebar_p,
      }
    },
  },
}
</script>

<style lang="sass">
@import "./support.sass"

html
  +mobile
    --main_doc_option_sidebar_width: 60%
  +tablet
    --main_doc_option_sidebar_width: 50%
  +desktop
    --main_doc_option_sidebar_width: 40%

.MainDocOption-Sidebar
  .sidebar-content
    width: var(--main_doc_option_sidebar_width)
  .box
    margin-top: 1rem
    margin-bottom: 0
  .title
    margin-top: 0.4rem
    margin-bottom: 1rem
  .b-slider
    margin-top: 0.5rem

.MainDocOption
  .shogi_player_params
    pre
      background-color: transparent
      white-space: pre-wrap
      word-break: break-all

  .SpWrap
    +desktop
      width: unquote("min(100%, 512px)")
  &.sidebar_p
    .SpWrap
      width: unquote("min(calc(100% - var(--main_doc_option_sidebar_width)), 512px)")
</style>
