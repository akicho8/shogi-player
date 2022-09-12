<template lang="pug">
.MainDocOption(:class="component_class")
  b-sidebar.MainDocOption-Sidebar(fullheight right v-model="sidebar_p" position="fixed" open)
    .mx-4.my-4
      .is-flex.is-justify-content-start.is-align-items-center
        b-button(@click="sidebar_toggle" icon-left="close")
        //- .mx-3.has-text-weight-bold オプション

      .my_controls
        .box
          b-field(custom-class="is-small" label="sp_run_mode")
            template(v-for="e in RunModeInfo.values")
              b-radio-button(size="is-small" v-model="sp_run_mode" :native-value="e.key") {{e.name}}

        .box
          .title.is-5 棋譜
          b-field(custom-class="is-small" label="sp_body")
            b-input(size="is-small" v-model="sp_body" type="textarea")
          b-field(custom-class="is-small" label="sp_turn")
            //- b-slider(v-model="sp_turn" :min="-1" :max="256" step="1")
            b-input(size="is-small" v-model.number="sp_turn" type="number")
          b-field(custom-class="is-small" label="棋譜変更")
            b-button(size="is-small" @click="sp_body = KifuBookInfo.fetch('foul_check').sp_body") 反則確認用

        .box
          .title.is-5 対局者情報
          b-field(custom-class="is-small" label="sp_player_info.black.name")
            b-input(size="is-small" v-model.trim="sp_player_info.black.name" type="text")
          b-field(custom-class="is-small" label="sp_player_info.white.name")
            b-input(size="is-small" v-model.trim="sp_player_info.white.name" type="text")

        .box
          .title.is-5 レイアウト
          b-field(custom-class="is-small" label="手数表示")
            b-radio-button(size="is-small" v-model="sp_summary" native-value="is_summary_off") OFF
            b-radio-button(size="is-small" v-model="sp_summary" native-value="is_summary_on") ON

          b-field(custom-class="is-small" label="スライダー表示")
            b-radio-button(size="is-small" v-model="sp_slider" native-value="is_slider_off") OFF
            b-radio-button(size="is-small" v-model="sp_slider" native-value="is_slider_on") ON

          b-field(custom-class="is-small" label="SFEN表示")
            b-radio-button(size="is-small" v-model="sp_sfen_show" native-value="is_sfen_show_off") OFF
            b-radio-button(size="is-small" v-model="sp_sfen_show" native-value="is_sfen_show_on") ON

          b-field(custom-class="is-small" label="設定ボタン表示")
            b-radio-button(size="is-small" v-model="sp_setting" native-value="is_setting_off") OFF
            b-radio-button(size="is-small" v-model="sp_setting" native-value="is_setting_on") ON

          b-field(custom-class="is-small" label="コントローラー表示")
            b-radio-button(size="is-small" v-model="sp_controller" native-value="is_controller_off") OFF
            b-radio-button(size="is-small" v-model="sp_controller" native-value="is_controller_on") ON

          b-field(custom-class="is-small" label="視点")
            b-radio-button(size="is-small" v-model="sp_viewpoint" native-value="black") ☗
            b-radio-button(size="is-small" v-model="sp_viewpoint" native-value="white") ☖

          b-field(custom-class="is-small" label="表示局面が☖なら反転")
            b-radio-button(size="is-small" v-model="sp_flip_if_white" :native-value="false") OFF
            b-radio-button(size="is-small" v-model="sp_flip_if_white" :native-value="true") ON

          b-field(custom-class="is-small" label="持駒が空なら駒台を表示しない")
            b-radio-button(size="is-small" v-model="sp_hidden_if_piece_stand_blank" :native-value="false") OFF
            b-radio-button(size="is-small" v-model="sp_hidden_if_piece_stand_blank" :native-value="true") ON

        .box
          .title.is-5 音

          b-field(custom-class="is-small" label="効果音")
            b-radio-button(size="is-small" v-model="sp_sound_enabled" :native-value="false") OFF
            b-radio-button(size="is-small" v-model="sp_sound_enabled" :native-value="true") ON

          b-field(custom-class="is-small" label="ボリューム")
            b-slider(v-model="sp_sound_volume" :min="0" :max="1.0" :step="0.01")

        .box
          .title.is-5 反則判定

          b-field(custom-class="is-small" label="反則判定" message="OFFなら気持ち程度処理も軽くなる")
            b-radio-button(size="is-small" v-model="sp_play_mode_foul_check_p" :native-value="false") OFF
            b-radio-button(size="is-small" v-model="sp_play_mode_foul_check_p" :native-value="true") ON

          b-field(custom-class="is-small" label="操作無効" message="ONは初心者向けで判定にひっかかったら操作を無効にする")
            b-radio-button(size="is-small" v-model="sp_play_mode_foul_break_p" :native-value="false") OFF
            b-radio-button(size="is-small" v-model="sp_play_mode_foul_break_p" :native-value="true") ON

        .box
          .title.is-5 その他
          MainDocSwitch(v-model="sp_key_event_capture_enabled" label="sp_key_event_capture_enabled")

          b-field(custom-class="is-small" label="デバッグモード")
            b-radio-button(size="is-small" v-model="sp_debug_mode" native-value="is_debug_mode_off") OFF
            b-radio-button(size="is-small" v-model="sp_debug_mode" native-value="is_debug_mode_on") ON

          b-field(custom-class="is-small" label="盤の上でも再生操作")
            b-radio-button(size="is-small" v-model="sp_overlay_nav" native-value="is_overlay_nav_off") OFF
            b-radio-button(size="is-small" v-model="sp_overlay_nav" native-value="is_overlay_nav_on") ON

          b-field(custom-class="is-small" label="操作禁止")
            b-radio-button(size="is-small" v-model="sp_op_disabled" :native-value="false") OFF
            b-radio-button(size="is-small" v-model="sp_op_disabled" :native-value="true") ON

          b-field(custom-class="is-small" label="sp_human_side")
            template(v-for="e in HumanSideInfo.values")
              b-radio-button(size="is-small" v-model="sp_human_side" :native-value="e.key") {{e.name}}

        .box
          .title.is-5 操作モードのイベント受信内容

          MainDocSwitch(v-model="trigger_toast_p" label="イベント確認")

          b-field(custom-class="is-small" label="@update:play_mode_advanced_full_moves_sfen: 操作モードで指した直後の局面を発行(movesあり)")
            b-input(size="is-small" :value="JSON.stringify(play_mode_advanced_full_moves_sfen)" readonly type="textarea" rows="1")

          b-field(custom-class="is-small" label="@update:play_mode_advanced_short_sfen: 操作モードで指した直後の局面を発行(movesなし)")
            b-input(size="is-small" :value="JSON.stringify(play_mode_advanced_short_sfen)" readonly type="textarea")

          //- b-field(custom-class="is-small" label="@update:play_mode_advanced_last_move: 操作モードで指した手(sfenのmovesの最後の1つ)")
          //-   b-input(size="is-small" :value="JSON.stringify(play_mode_advanced_last_move)" readonly type="textarea")

          b-field(custom-class="is-small" label="@update:play_mode_advanced_moves: 操作モードで指した手を含むmoves配列")
            b-input(size="is-small" :value="JSON.stringify(play_mode_advanced_moves)" readonly type="textarea")

          b-field(custom-class="is-small" label="@update:short_sfen: 操作モード(または再生モード)で盤面が変化したとき(常に更新)")
            b-input(size="is-small" :value="JSON.stringify(short_sfen)" readonly type="textarea")

          b-field(custom-class="is-small" label="@update:edit_mode_short_sfen: 編集モードで盤面が変化したとき")
            b-input(size="is-small" :value="JSON.stringify(edit_mode_short_sfen)" readonly type="textarea")

          b-field(custom-class="is-small" label="@update:turn_offset: 手数が変化したとき")
            b-input(size="is-small" :value="JSON.stringify(turn_offset)" readonly type="text")

          b-field(custom-class="is-small" label="@update:moves_take_turn_offset: 操作モードでmovesをturn_offsetでtakeしたもの")
            b-input(size="is-small" :value="JSON.stringify(moves_take_turn_offset)" readonly type="text")

          b-field(custom-class="is-small" label="@foul_accident: 反則があって無効化したとき")
            b-input(size="is-small" :value="JSON.stringify(foul_accident)" readonly type="textarea")

  MainDocMainNavbar
    template(slot="brand")
      MainDocNavbarItemHome
      b-navbar-item(tag="div").has-text-weight-bold 引数とイベントチェック
    template(slot="end")
      b-navbar-item.has-text-weight-bold(@click="sidebar_toggle")
        | 動作テスト

  //- この form は prevent が効いているか確認するためのもの
  .section
    .container
      form(action="/")
        .SpWrap
          //- @player_info_click="(location, sp_player_info) => $buefy.toast.open(location.name)"
          ShogiPlayer(
            :sp_player_click_handle="(location, sp_player_info) => $buefy.toast.open(location.name)"
            :sp_location_click_handle="(location) => $buefy.toast.open(location.name)"
            :sp_run_mode.sync="sp_run_mode"
            :sp_body.sync="sp_body"
            :sp_turn.sync="sp_turn"
            :sp_summary="sp_summary"
            :sp_slider="sp_slider"
            :sp_debug_mode.sync="sp_debug_mode"
            :sp_hidden_if_piece_stand_blank="sp_hidden_if_piece_stand_blank"
            :sp_setting="sp_setting"
            :sp_op_disabled="sp_op_disabled"
            :sp_viewpoint.sync="sp_viewpoint"
            :sp_flip_if_white="sp_flip_if_white"
            :sp_player_info="sp_player_info"
            :sp_key_event_capture_enabled="sp_key_event_capture_enabled"
            :sp_controller="sp_controller"
            :sp_sfen_show="sp_sfen_show"
            :sp_overlay_nav="sp_overlay_nav"
            :sp_sound_enabled="sp_sound_enabled"
            :sp_sound_volume="sp_sound_volume"
            :sp_human_side="sp_human_side"

            @update:edit_mode_short_sfen="            e => trigger_check('edit_mode_short_sfen', e)"
            @update:short_sfen="             e => trigger_check('short_sfen', e)"
            @update:play_mode_advanced_full_moves_sfen=" e => trigger_check('play_mode_advanced_full_moves_sfen', e)"
            @update:play_mode_advanced_short_sfen="   e => trigger_check('play_mode_advanced_short_sfen', e)"
            @update:play_mode_advanced_moves="           e => trigger_check('play_mode_advanced_moves', e)"
            @update:turn_offset="                        e => trigger_check('turn_offset', e)"
            @update:turn_offset_max="                    e => trigger_check('turn_offset_max', e)"
            @update:moves_take_turn_offset="             e => trigger_check('moves_take_turn_offset', e)"
            @foul_accident="                             e => trigger_check('foul_accident', e)"

            :sp_play_mode_foul_check_p="sp_play_mode_foul_check_p"
            :sp_play_mode_foul_break_p="sp_play_mode_foul_break_p"
            )
            //- @update:play_mode_advanced_last_move="       e => trigger_check('play_mode_advanced_last_move', e)"
            //- @click.native="() => $buefy.toast.open({message: '全体のどこかをクリック', queue: false})"

  .section
    .container

      .columns
        .column
          section

            b-message.shogi_player_params(:closable="false" type="is-primary" title="引数")
              pre.is-size-6
                | ShogiPlayer(
                |   sp_run_mode="{{sp_run_mode}}"
                |   sp_slider="{{sp_slider}}"
                |   sp_debug_mode="{{sp_debug_mode}}"
                |   sp_summary="{{sp_summary}}"
                |   sp_sfen_show="{{sp_sfen_show}}"
                |   sp_overlay_nav="{{sp_overlay_nav}}"
                |   sp_setting="{{sp_setting}}"
                |   :sp_op_disabled="{{sp_op_disabled}}"
                |   sp_controller="{{sp_controller}}"
                |   sp_human_side="{{sp_human_side}}"
                |   sp_viewpoint="{{sp_viewpoint}}"
                |   :sp_turn="{{sp_turn}}"
                |   :sp_sound_enabled="{{sp_sound_enabled}}"
                |   :sp_sound_volume="{{sp_sound_volume}}"
                |   :sp_key_event_capture_enabled="{{sp_key_event_capture_enabled}}"
                |   :sp_hidden_if_piece_stand_blank="{{sp_hidden_if_piece_stand_blank}}"
                |   :sp_flip_if_white="{{sp_flip_if_white}}"
                |   :sp_player_info='{{JSON.stringify(sp_player_info)}}'
                |   :sp_play_mode_foul_check_p="{{sp_play_mode_foul_check_p}}"
                |   :sp_play_mode_foul_break_p="{{sp_play_mode_foul_break_p}}"
                |   sp_body="{{sp_body}}"

      MainDocMd(:body="options_md")
      MainDocEditDesc2
</template>

<script>
import options_md from "./options.md"

import { HumanSideInfo } from "../models/human_side_info.js"
import { RunModeInfo } from "../models/run_mode_info.js"
import { BgVariantInfo } from "../models/bg_variant_info.js"
import { PiVariantInfo } from "../models/pi_variant_info.js"
import { KifuBookInfo } from "../models/kifu_book_info.js"

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
      sp_body_max_width: 0,

      // カスタマイズ用
      sp_run_mode: "view_mode",
      sp_turn: -1,
      sp_slider: "is_slider_off",
      sp_overlay_nav: "is_overlay_nav_off",
      sp_controller: "is_controller_off",
      sp_sfen_show: "is_sfen_show_off",
      sp_human_side: 'both',
      sp_sound_enabled: true,
      sp_sound_volume: 0.5,
      sp_key_event_capture_enabled: false,
      sp_debug_mode: "is_debug_mode_off",
      sp_hidden_if_piece_stand_blank: false,
      sp_setting: "is_setting_off",
      sp_summary: "is_summary_on",
      sp_op_disabled: false,
      sp_viewpoint: "black",
      sp_flip_if_white: false,

      // 反則判定用
      sp_play_mode_foul_check_p: true,
      sp_play_mode_foul_break_p: false,
      foul_accident: null,

      sp_player_info: {
        black: { name: "先手", time: "12:34", },
        white: { name: "後手", time: "56:78", },
      },

      sp_body: KifuBookInfo.fetch("SFEN_15733").sp_body,

      trigger_toast_p: false,

      edit_mode_short_sfen: null,
      short_sfen: null,
      play_mode_advanced_full_moves_sfen: null,
      play_mode_advanced_short_sfen: null,
      // play_mode_advanced_last_move: null,
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
    KifuBookInfo() { return KifuBookInfo },
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
