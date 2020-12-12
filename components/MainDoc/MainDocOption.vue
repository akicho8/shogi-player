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
        | 動作テスト

  //- この form は prevent が効いているか確認するためのもの
  .section
    .container
      form(action="/")
        .SpWrap
          ShogiPlayer(
            :player_info_click_handle="(location, player_info) => $buefy.toast.open(location.name)"
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
        black: { name: "先手", time: "12:34:56", },
        white: { name: "後手", time: "56:78:90", },
      },

      final_label: null,
      kifu_body: "position sfen lnsgkgsnl/1r7/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1 moves 8c8d 7g7f 7a6b 5g5f 8d8e 8h7g 5c5d 2h5h 6b5c 7i6h 5a4b 5i4h 3a3b 4h3h 4c4d 5f5e 3b4c 5e5d 4c5d 6h5g 5d6e 5g5f 6e7f 5f5e 7f6g+ P*5d 5c6b 5h5f 6g7g 8i7g B*3d 5f6f P*5b 6i7i 8b8d 5e4d 8d7d P*7h 7d5d S*4c 3d4c 4d4c+ 4b4c B*7f 5b5c 7i6h 4c3b 6h5h P*4c 7f5d 5c5d 8g8f B*7i 8f8e P*8b 6f8f 7i3e+ 8e8d S*7b 8f8i 3e4e P*6g 7c7d 9g9f 4e5f 8i8f 5f5e 9f9e 5e6d 8f8i 7d7e 7g8e 5d5e 8e9c+ 8a9c 9e9d P*9h 9i9h 6d6e 8i8f 6e9h 9d9c+ 9a9c R*9a 9h6e 9a9c+ 5e5f 5h4h L*9b 9c8b P*8a N*7g 6e7d 8b9a S*8b 9a8b 8a8b S*6e 7d9f 8f5f 9f7h 7g8e 7h6g P*7c 7b8a P*9c 6c6d P*6h 6g8e 9c9b+ 8a9b 7c7b+ 6a7b 6e5d N*4b 5d5c+ P*5d 5c6b 7b6b L*2f R*6i L*2e N*3a 5f4f S*3d 3g3f 6b5c 2i3g 4c4d 4f5f 2c2d 2e2d P*2c 3f3e 3d3e 2d2c+ 3a2c 2f2c+ 3b2c P*3f 3e2d 5f5i 6i6h+ 1g1f L*3d N*2h 4d4e 5i5h 6h7g 2g2f 1c1d 2f2e 2d1c 3g4e 5c4d S*4f P*2f 4e5c+ L*4e 4f5g 8e7d P*6e 7d6e P*5f 5d5e 4h3g 5e5f 5g4h P*4f 3g4f 4e4f",

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
