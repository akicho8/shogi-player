<template lang="pug">
.MainDocOption.section
  b-sidebar.StyleEditor-Sidebar(fullheight right v-model="sidebar_p" position="fixed" open)
    .mx-4.my-4
      .is-flex.is-justify-content-start.is-align-items-center
        b-button(@click="sidebar_toggle" icon-left="menu")
        .mx-3.has-text-weight-bold 将棋盤スタイルエディター

      .my_controls
        .box
          .title.is-5 基本
          b-field(custom-class="is-small" label="コンテナ幅")
            b-slider(v-model="sp_body_width" :min="1" :max="100")
        .box
          .title.is-5 基本
          b-field(custom-class="is-small" label="コンテナ幅")
            b-slider(v-model="sp_body_width" :min="1" :max="100")
        .box
          .title.is-5 基本
          b-field(custom-class="is-small" label="コンテナ幅")
            b-slider(v-model="sp_body_width" :min="1" :max="100")
        .box
          .title.is-5 基本
          b-field(custom-class="is-small" label="コンテナ幅")
            b-slider(v-model="sp_body_width" :min="1" :max="100")
        .box
          .title.is-5 基本
          b-field(custom-class="is-small" label="コンテナ幅")
            b-slider(v-model="sp_body_width" :min="1" :max="100")
        .box
          .title.is-5 基本
          b-field(custom-class="is-small" label="コンテナ幅")
            b-slider(v-model="sp_body_width" :min="1" :max="100")
        .box
          .title.is-5 基本
          b-field(custom-class="is-small" label="コンテナ幅")
            b-slider(v-model="sp_body_width" :min="1" :max="100")
        .box
          .title.is-5 基本
          b-field(custom-class="is-small" label="コンテナ幅")
            b-slider(v-model="sp_body_width" :min="1" :max="100")

  a(name="options")
  .container
    .title.is-3 オプション
    b-button.sidebar_toggle_button(@click="sidebar_toggle" icon-left="menu")
    hr
    .columns.is-centered
      .column.is-10-tablet.is-8-desktop.is-6-widescreen
        //- この form は prevent が効いているか確認するためのもの
        form(action="/")
          ShogiPlayer(
            :run_mode.sync="run_mode"
            :kifu_body.sync="kifu_body"
            :start_turn.sync="start_turn"
            :sp_bg_variant.sync="sp_bg_variant"
            :sp_pi_variant.sync="sp_pi_variant"
            :debug_mode_p.sync="debug_mode_p"
            :hidden_if_piece_stand_blank="hidden_if_piece_stand_blank"
            :setting_button_show="setting_button_show"
            :summary_show="summary_show"
            :operation_disable="operation_disable"
            :flip.sync="flip"
            :flip_if_white="flip_if_white"
            :sp_layout="sp_layout"
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

    .columns
      .column
        section
          b-field(custom-class="is-small" label="run_mode")
            .block
              template(v-for="e in RunModeInfo.values")
                b-radio(v-model="run_mode" :native-value="e.key") {{e.name}}({{e.key}})

          .box
            b-field(custom-class="is-small" label="sp_bg_variant")
              .block
                template(v-for="e in BgVariantInfo.values")
                  b-radio(v-model="sp_bg_variant" :native-value="e.key") {{e.name}}

            b-field(custom-class="is-small" label="sp_pi_variant")
              .block
                template(v-for="e in PiVariantInfo.values")
                  b-radio(v-model="sp_pi_variant" :native-value="e.key") {{e.name}}({{e.key}})

          .box
            b-field(grouped group-multiline)
              b-field(custom-class="is-small" label="sound_effect")
                b-switch(v-model="sound_effect")

              b-field(custom-class="is-small" label="volume")
                .block
                  input(v-model.number="volume" type="range" min="0" max="1.0" step="0.01")
                  | {{volume}}

          b-field(grouped group-multiline)
            b-field(custom-class="is-small" label="start_turn")
              b-input(v-model="start_turn" type="number")

            b-field(custom-class="is-small" label="final_label")
              b-input(v-model.trim="final_label" type="text")

          b-field(grouped group-multiline)
            b-field(custom-class="is-small" label="player_info.black.name")
              b-input(v-model.trim="player_info.black.name" type="text")
            b-field(custom-class="is-small" label="player_info.white.name")
              b-input(v-model.trim="player_info.white.name" type="text")

          b-field(grouped group-multiline)
            b-field(custom-class="is-small" label="slider_show")
              b-switch(v-model="slider_show")

            b-field(custom-class="is-small" label="controller_show")
              b-switch(v-model="controller_show")

            b-field(custom-class="is-small" label="sfen_show")
              b-switch(v-model="sfen_show")

            b-field(custom-class="is-small" label="overlay_navi")
              b-switch(v-model="overlay_navi")

            b-field(custom-class="is-small" label="key_event_capture")
              b-switch(v-model="key_event_capture")

            b-field(custom-class="is-small" label="flip")
              b-switch(v-model="flip")

            b-field(custom-class="is-small" label="flip_if_white")
              b-switch(v-model="flip_if_white")

            b-field(custom-class="is-small" label="配置")
              b-radio-button(size="is-small" v-model="sp_layout" native-value="is_vertical") 上下
              b-radio-button(size="is-small" v-model="sp_layout" native-value="is_horizontal") 左右

            b-field(custom-class="is-small" label="debug_mode_p")
              b-switch(v-model="debug_mode_p")

            b-field(custom-class="is-small" label="hidden_if_piece_stand_blank")
              b-switch(v-model="hidden_if_piece_stand_blank")

            b-field(custom-class="is-small" label="setting_button_show")
              b-switch(v-model="setting_button_show")

            b-field(custom-class="is-small" label="summary_show")
              b-switch(v-model="summary_show")

            b-field(custom-class="is-small" label="operation_disable")
              b-switch(v-model="operation_disable")

          b-field(custom-class="is-small" label="human_side_key")
            .block
              template(v-for="e in SideInfo.values")
                b-radio(v-model="human_side_key" :native-value="e.key") {{e.key}}

          b-field(custom-class="is-small" label="kifu_body (KIF or USI(sfen)形式")
            b-input(v-model="kifu_body" type="textarea")

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

          .title.is-4 操作モードのイベント受信内容

          b-field(custom-class="is-small" label="イベント確認(buefy.toast)")
            b-switch(v-model="trigger_toast_p")

          b-field(custom-class="is-small" label="@update:play_mode_advanced_full_moves_sfen: 操作モードで指した直後の局面を発行(movesあり)")
            b-input(:value="JSON.stringify(play_mode_advanced_full_moves_sfen)" readonly type="textarea" rows="1")

          b-field(custom-class="is-small" label="@update:play_mode_advanced_snapshot_sfen: 操作モードで指した直後の局面を発行(movesなし)")
            b-input(:value="JSON.stringify(play_mode_advanced_snapshot_sfen)" readonly type="text")

          b-field(custom-class="is-small" label="@update:play_mode_advanced_last_move: 操作モードで指した手(sfenのmovesの最後の1つ)")
            b-input(:value="JSON.stringify(play_mode_advanced_last_move)" readonly type="text")

          b-field(custom-class="is-small" label="@update:play_mode_advanced_moves: 操作モードで指した手を含むmoves配列")
            b-input(:value="JSON.stringify(play_mode_advanced_moves)" readonly type="text")

          b-field(custom-class="is-small" label="@update:mediator_snapshot_sfen: 操作モード(または再生モード)で盤面が変化したとき(常に更新)")
            b-input(:value="JSON.stringify(mediator_snapshot_sfen)" readonly type="text")

          b-field(custom-class="is-small" label="@update:edit_mode_snapshot_sfen: 編集モードで盤面が変化したとき")
            b-input(:value="JSON.stringify(edit_mode_snapshot_sfen)" readonly type="text")

          b-field(custom-class="is-small" label="@update:turn_offset: 手数が変化したとき")
            b-input(:value="JSON.stringify(turn_offset)" readonly type="text")

          b-field(custom-class="is-small" label="@update:moves_take_turn_offset: 操作モードでmovesをturn_offsetでtakeしたもの")
            b-input(:value="JSON.stringify(moves_take_turn_offset)" readonly type="text")
          br

    MainDocMd(:body="options_md")
</template>

<script>
import options_md from "./options.md"

import SideInfo      from "../models/side_info.js"
import RunModeInfo   from "../models/run_mode_info.js"
import BgVariantInfo from "../models/bg_variant_info.js"
import PiVariantInfo from "../models/pi_variant_info.js"

export default {
  name: "MainDocOption",
  data() {
    return {
      options_md,

      SideInfo,
      RunModeInfo,
      BgVariantInfo,
      PiVariantInfo,

      modal_p: false,
      modal_p2: false,
      sidebar_p: true,
      sp_body_width: 0,

      // カスタマイズ用
      run_mode: "view_mode",   // play_mode
      sp_bg_variant: "is_bg_variant_a",
      sp_pi_variant: "is_pi_variant_a",
      start_turn: -1,
      slider_show: true,
      overlay_navi: true,
      controller_show: true,
      sfen_show: true,
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
      kifu_body: "position startpos moves 2g2f 3c3d 2f2e 2b3c 7g7f 3a2b 3i4h 4a3b 3g3f 7a6b 4h3g 5a4a 3g4f 6a5b 3f3e 3d3e 4f3e 5c5d P*3d 3c4b 2e2d 2c2d 3e2d 4b6d P*2c 2b2c 2d2c+ 6d2h+ 2c3b 4a3b 8h1a+ S*2b 1a2a 3b2a S*3c B*1e L*3g P*3b N*2d",

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
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocOption
  .shogi_player_params
    pre
      background-color: transparent
      white-space: pre-wrap
      word-break: break-all
</style>
