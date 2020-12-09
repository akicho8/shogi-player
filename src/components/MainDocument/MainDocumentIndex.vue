<template lang="pug">
.MainDocumentIndex
  MainDocumentHero
  MainDocumentSummary

  .section
    a(name="examples")
    .container
      .title.is-2 デモ
      hr

      .title.is-3.has-text-left.mt-6 1. 再生モード
      hr
      .columns.is-centered
        MainDocumentSample1.is-10-tablet.is-8-desktop.is-6-widescreen
      .columns.mt-6
        MainDocumentSample2
        MainDocumentSample3
      .columns.mt-6
        MainDocumentSample4
        MainDocumentSample5
      .columns.mt-6
        MainDocumentSousa

      .title.is-3.has-text-left.mt-6 2. 操作モード
      hr

      .columns
        .column
          b-message(type="is-info")
            | 自分で操作できる。戻れば操作をやり直せる

          ShogiPlayer(:kifu_body="'position startpos moves 7g7f 8c8d 2h6h 3c3d 6g6f 7a6b 3i3h 5a4b 4g4f 4b3b 3g3f 2b3c 1g1f 8d8e 8h7g 3b2b 7i7h 5c5d 7h6g 6a5b 2i3g 1a1b 6g5f 5d5e 5f4e 8b8d 3f3e 3d3e 3g2e 3c4d 6f6e 2c2d 6e6d 2d2e 4e4d 4c4d 7g5e N*3b P*3c 2b3c B*4e P*5d 5e6f 3c2b 6f8d 4d4e 6d6c+'" :start_turn="-1" :slider_show="true" :controller_show="true" :theme="'real'" :size="'medium'" :sp_bg_variant="'a'" :sound_effect="true" :volume="0.25" :debug_mode_p="false" :run_mode="'play_mode'")

        .column
          b-message(type="is-info")
            | human_side_key オプションで先手側だけ操作できるようにする

          ShogiPlayer(:kifu_body="'position startpos moves 7g7f 8c8d 2h6h 3c3d 6g6f 7a6b 3i3h 5a4b 4g4f 4b3b 3g3f 2b3c 1g1f 8d8e 8h7g 3b2b 7i7h 5c5d 7h6g 6a5b 2i3g 1a1b 6g5f 5d5e 5f4e 8b8d 3f3e 3d3e 3g2e 3c4d 6f6e 2c2d 6e6d 2d2e 4e4d 4c4d 7g5e N*3b P*3c 2b3c B*4e P*5d 5e6f 3c2b 6f8d 4d4e 6d6c+'" :start_turn="20" :slider_show="true" :controller_show="true" :theme="'real'" :size="'medium'" :sp_bg_variant="'a'" :sound_effect="true" :volume="0.25" :debug_mode_p="false" :run_mode="'play_mode'" :human_side_key="'black'")

      .columns
        .column
          b-message(type="is-info")
            | 駒落ちの場合は後手から始まる
          ShogiPlayer(:kifu_body="`position sfen 4k4/9/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1`" :start_turn="-1" :theme="'simple'" :run_mode="'play_mode'")

        .column
          b-message(type="is-info")
            | 2手目の盤面から開始する場合も後手から始まる
          ShogiPlayer(:kifu_body="`position sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/2P6/PP1PPPPPP/1B5R1/LNSGKGSNL w - 2`" :start_turn="-1" :theme="'simple'" :run_mode="'play_mode'")

      .columns
        .column
          b-message(type="is-info")
            | SFENで72となっていても71手目の局面を表示している(後手番)
          .columns.is-centered
            .column.is-10-tablet.is-8-desktop.is-6-widescreen
              ShogiPlayer(:kifu_body="'position sfen lr4knl/3g2gs1/4ppP2/p4bNpp/2pSsN3/PPPP1P2P/2N1P1G2/2G6/L1K4RL w BPs3p 72'" :start_turn="-1" :theme="'simple'" :run_mode="'play_mode'")

      .columns
        .column
          b-message.has-text-left(type="is-success" title="操作モードについて" :closable="false")
            .content
              ul
                li スライダー等で変更した任意局面から手番側の操作が行えます
                li いちど指すとその手が最終手になります(分岐には対応していません)
                li human_side_key オプションで片側の操作のみに絞れます
                li Emitイベントに反応して、相手側の指し手を追加した棋譜で kifu_body を更新すればCPUとの対戦のようなことができます
                li 再生モードの棋譜とは独立しています(再生モードの棋譜を上書きしません)
                li 指し手を決定したときスライダーがあればスライダーにフォーカスにするのですぐに「←」キーで手を戻すことができます(2019-05-02)

      br
      br
      .title.is-3.has-text-left 3. 編集モード
      hr

      .columns
        .column
          b-message(type="is-info")
            | すべての駒を自由に動かせる

          ShogiPlayer(:kifu_body="'position startpos moves 7g7f 8c8d 2h6h 3c3d 6g6f 7a6b 3i3h 5a4b 4g4f 4b3b 3g3f 2b3c 1g1f 8d8e 8h7g 3b2b 7i7h 5c5d 7h6g 6a5b 2i3g 1a1b 6g5f 5d5e 5f4e 8b8d 3f3e 3d3e 3g2e 3c4d 6f6e 2c2d 6e6d 2d2e 4e4d 4c4d 7g5e N*3b P*3c 2b3c B*4e P*5d 5e6f 3c2b 6f8d 4d4e 6d6c+'" :start_turn="-1" :slider_show="true" :theme="'real'" :size="'medium'" :sp_bg_variant="'a'" :sound_effect="true" :volume="0.25" :debug_mode_p="false" :run_mode="'edit_mode'")

        .column
          b-message(type="is-info")
            | 詰将棋用の初期配置で開始

          ShogiPlayer(:preset_key="'詰将棋'" :slider_show="true" :theme="'real'" :size="'medium'" :sp_bg_variant="'a'" :sound_effect="true" :volume="0.25" :debug_mode_p="false" :run_mode="'edit_mode'")

      .columns.mt-6
        .column
          article.message.is-success.has-text-left
            .message-header
              p 操作方法

            .message-body
              .content
                ul
                  li ダブルタップまたは右クリックで盤上の駒の反転と向きを変更できます(ショートカットキー: v, r, Space)
                  li 修飾キー(shift, option, meta, control キーのいずれか)を押しながら「左クリック」でも変更できます
                  li 駒を持った状態で右クリックすると駒を元に戻せます (ショートカットキー: Escape, q)
                  li 駒台と駒箱をクリックしたことにするショートカットキーがあります(b:先手の駒台 w:後手の駒台 Backspace または t で駒箱)
                  li その際に、修飾キーを押しているとまとめて移動します
                  li たとえば先手の駒箱の歩をクリックしてから shift + w で先手の駒台の歩がすべて後手の駒台に移動します
                  li 駒を持っていない状態で、盤上の駒にカーソルを合わせて w, b, Backspace, t したときは自動的に持ち上げてからそのキーをタイプしたことになります(持ち上げる手間が省略できる)
                  li 駒を持っていない状態で盤上の駒にカーソルを合わせて q をタイプすると駒台から同種の駒を取り出したことになります (factorioのピペットツールのように動作します)
      .columns
        .column
          article.message.is-success.has-text-left
            .message-header
              p 再生モードからのモード切り替えについて

            .message-body
              .content
                ul
                  li 右の<b-icon icon="dots-vertical" size="is-small"></b-icon>をクリックするとモードを切り替えることができます
                  li 棋譜再生モードの途中で「操作」に切り替えると手番側の駒を動かせるようになります。主に検討したいときに使います
                  li 「操作」モードに入るとき SFEN (USI) の場合はそのまま再生モードでの棋譜を保持した状態で始まります。(スライダーで最初の局面に戻せます)
                  li 一方 KIF の場合は都合上<b>現在の局面から</b>の開始になります。(つまりスライダーで最初の局面に戻せません)
                  li (SFENと同様になるようにしようかと思いましたが、「操作」モードにに入ったところを基点(0手目)とするのでわかりやすいというメリットがあることに気づきました)
                  li 手番に関わらず、ただ自由に駒を動かしたいときは「編集」モードになります
                  li 棋譜再生モードの途中で「操作」に切り替えると手番側の駒を動かせるようになります
                  li 再生モードから他のモードに切り替えてから再生モードに戻ったとき、他のモードに切り替える前の状態に復帰します (つまり継盤のような形になります)

  .section
    a(name="modal_in_style")
    .container
      .title.is-3 モーダル内表示の例
      hr
      .columns
        .column
          .buttons
            a.button.is-primary(@click="modal_p = true") 開く

          b-modal(:active.sync="modal_p" has-modal-card)
            .modal-card.is-shogi-player-modal-card
              header.modal-card-head
                p.modal-card-title.is-size-5
                  | モーダル内表示例
                button(class="delete" aria-label="close" @click="modal_p = false")

              section.modal-card-body
                shogi-player(
                  :run_mode="'view_mode'"
                  :debug_mode_p="false"
                  :start_turn="0"
                  :kifu_body="'position sfen 4R1gnk/6+Bsl/5+P1pp/9/9/9/9/9/9 b rb3g3s3n2l15p 1 moves 3b2a 3a2a 5a2a+ 1a2a G*3b 2a1a 3b2b 1a2b N*3d 2b1a S*2b'"
                  :key_event_capture="true"
                  :slider_show="true"
                  :controller_show="true"
                  :theme="'simple'"
                  :size="'default'"
                  :sound_effect="true"
                )

                .box.is-size-6
                  | 1手目と5手詰が重要

              footer.modal-card-foot
                //- b-tooltip(label="この局面から自分で操作")
                //-   b-switch(v-model="sp_run_mode" true-value="play_mode" false-value="view_mode") 継盤
                a.button(@click="modal_p = false") 閉じる
                a.button(@click.prevent.stop="") ボタン2
                a.button(@click.prevent.stop="") ボタン3
  .section
    a(name="usage")
    .container
      .title.is-3 使い方
      hr
      .content(v-html="usage_md")

  .section
    a(name="options")
    .container
      .title.is-2 オプション
      hr
      .columns
        .column
          //- この form は prevent が効いているか確認するためのもの
          form(action="/")
            ShogiPlayer(
              :run_mode.sync="run_mode"
              :kifu_body.sync="kifu_body"
              :start_turn.sync="start_turn"
              :theme.sync="theme"
              :size.sync="size"
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
          hr

      .columns
        .column
          section
            b-field(custom-class="is-small" label="run_mode")
              .block
                template(v-for="e in RunModeInfo.values")
                  b-radio(v-model="run_mode" :native-value="e.key") {{e.name}}({{e.key}})

            .box
              b-field(custom-class="is-small" label="theme")
                .block
                  template(v-for="e in ThemeInfo.values")
                    b-radio(v-model="theme" :native-value="e.key") {{e.name}}({{e.key}})

              b-field(custom-class="is-small" label="sp_bg_variant")
                .block
                  template(v-for="e in BgVariantInfo.values")
                    b-radio(v-model="sp_bg_variant" :native-value="e.key") {{e.name}}

              b-field(custom-class="is-small" label="sp_pi_variant")
                .block
                  template(v-for="e in PiVariantInfo.values")
                    b-radio(v-model="sp_pi_variant" :native-value="e.key") {{e.name}}({{e.key}})

              b-field(custom-class="is-small" label="size")
                .block
                  template(v-for="e in SizeInfo.values")
                    b-radio(v-model="size" :native-value="e.key") {{e.key}}

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

            article.message.is-primary.has-text-left
              .message-header
                p 引数

              .message-body
                | &lt;shogi-player
                | :<b>run_mode</b>="'{{run_mode}}'"
                | :<b>theme</b>="'{{theme}}'"
                | :<b>sp_bg_variant</b>="'{{sp_bg_variant}}'"
                | :<b>sp_pi_variant</b>="'{{sp_pi_variant}}'"
                | :<b>size</b>="'{{size}}'"
                | :<b>start_turn</b>="{{start_turn}}"
                | :<b>slider_show</b>="{{slider_show}}"
                | :<b>controller_show</b>="{{controller_show}}"
                | :<b>sfen_show</b>="{{sfen_show}}"
                | :<b>overlay_navi</b>="{{overlay_navi}}"
                | :<b>human_side_key</b>="'{{human_side_key}}'"
                | :<b>sound_effect</b>="{{sound_effect}}"
                | :<b>volume</b>="{{volume}}"
                | :<b>key_event_capture</b>="{{key_event_capture}}"
                | :<b>debug_mode_p</b>="{{debug_mode_p}}"
                | :<b>hidden_if_piece_stand_blank</b>="{{hidden_if_piece_stand_blank}}"
                | :<b>setting_button_show</b>="{{setting_button_show}}"
                | :<b>summary_show</b>="{{summary_show}}"
                | :<b>operation_disable</b>="{{operation_disable}}"
                | :<b>flip</b>="{{flip}}"
                | :<b>flip_if_white</b>="{{flip_if_white}}"
                | :<b>sp_layout</b>="'{{sp_layout}}'"
                | :<b>final_label</b>="'{{final_label}}'"
                | :<b>player_info</b>="{{player_info}}"
                | :<b>kifu_body</b>="'{{kifu_body}}'"
                | /&gt;

            br
            br
            h4.title 操作モードのイベント受信内容

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

      .table_wrap
        .content(v-html="options_md")

  .section
    a(name="api")
    .container
      .title.is-2 API Methods
      hr
      .columns
        .column
          ShogiPlayer(
            ref="api_sp"
            :summary_show="false"
            :hidden_if_piece_stand_blank="true"
            :board_cell_pointerdown_user_handle="board_cell_pointerdown_user_handle"
            :board_cell_left_click_user_handle="board_cell_left_click_user_handle"
            :overlay_navi="false"
            :debug_mode_p="false"
          )
      .columns
        .column
          .buttons.is-centered
            b-button(label="api_random_puton" @click="run_api_random_puton")
            b-button(label="api_retract_a_move" @click="run_api_retract_a_move")
      .columns
        .column
          .table_wrap
            .content(v-html="api_md")

  MainDocumentCredit
  footer.footer
</template>

<script>
// components
// import ShogiPlayer         from "../ShogiPlayer.vue"
import MainDocumentHero from "./MainDocumentHero.vue"
import MainDocumentSummary from "./MainDocumentSummary.vue"
import MainDocumentSample1 from "./MainDocumentSample1.vue"
import MainDocumentSample2 from "./MainDocumentSample2.vue"
import MainDocumentSample3 from "./MainDocumentSample3.vue"
import MainDocumentSample4 from "./MainDocumentSample4.vue"
import MainDocumentSample5 from "./MainDocumentSample5.vue"
import MainDocumentSousa from "./MainDocumentSousa.vue"
import MainDocumentCredit from "./MainDocumentCredit.vue"

// models
import SideInfo      from "../../models/side_info.js"
import RunModeInfo   from "../../models/run_mode_info.js"
import ThemeInfo     from "../../models/theme_info.js"
import BgVariantInfo from "../../models/bg_variant_info.js"
import PiVariantInfo from "../../models/pi_variant_info.js"
import SizeInfo      from "../../models/size_info.js"

const marked = require('marked')
const renderer = new marked.Renderer()
renderer.table = (header, body) => '<div class="table_wrap"><table>\n' + '<thead>\n' + header + '</thead>\n' + '<tbody>\n' + body + '</tbody>\n' + '</table></div>\n'
marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
})

export default {
  name: "MainDocumentIndex",

  components: {
    MainDocumentHero,
    MainDocumentSummary,
    MainDocumentSample1,
    MainDocumentSample2,
    MainDocumentSample3,
    MainDocumentSample4,
    MainDocumentSample5,
    MainDocumentSousa,
    MainDocumentCredit,
  },

  data() {
    // FIXME: npm run unit で raw-loader が効かない問題を回避している。が、SideInfo.values などがないとテストがこけるので最低限入れとく
    if (process.env.NODE_ENV === "test") {
      return {
        SideInfo,
        RunModeInfo,
        ThemeInfo,
        BgVariantInfo,
        PiVariantInfo,
        SizeInfo,
      }
    }

    return {
      SideInfo,
      RunModeInfo,
      ThemeInfo,
      BgVariantInfo,
      PiVariantInfo,
      SizeInfo,

      modal_p: false,
      modal_p2: false,

      // カスタマイズ用
      run_mode: "view_mode",   // play_mode
      theme: "real",
      sp_bg_variant: "a",
      sp_pi_variant: "a",
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
      kifu_body: require("./kif/極限早繰り銀.kif"),

      trigger_toast_p: false,

      edit_mode_snapshot_sfen: null,
      mediator_snapshot_sfen: null,
      play_mode_advanced_full_moves_sfen: null,
      play_mode_advanced_snapshot_sfen: null,
      play_mode_advanced_last_move: null,
      play_mode_advanced_moves: null,
      turn_offset: null,
      moves_take_turn_offset: null,

      usage_md: marked(require('./usage.md')),
      options_md: marked(require('./options.md')),
      api_md: marked(require('./api.md')),
    }
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
@import "./support.sass"

$sp_assets_dir: "../../assets"
@import "../ShogiPlayer.sass" // Rails 側では sp_assets_dir を変更してから読み込む

.MainDocumentIndex
  +mobile
    font-size: 14px

  .hero-foot
    li
      background-color: change_color($black, $alpha: 0.1)
    li:not(:first-child)
      margin-left: 0.25rem

  // 基本、英単語の途中でも折り返す
  .content
    word-break: break-all

  // オプションの説明がつっぱらないように横スクロールバー表示
  .table_wrap
    overflow-x: auto
    table
      white-space: nowrap

  // .main_sp
  //   // background-color: blue
  //   // display: flex
  //   // justify-content: center
  //   // align-items: center
  //   .ShogiPlayerWidth
  //     max-width: 50%

  // .CommentBlock
  //   .message
  //     margin-left: auto
  //     margin-right: auto
  //     max-width: 65ch

  pre
    font-family: Osaka-mono, "Osaka-等幅", "ＭＳ ゴシック", "Courier New", Consolas, monospace ! important
    white-space: pre-wrap
    word-break: break-all

  .section
    +mobile
      margin: 2em 0em
      margin-bottom: 1em
      padding: 0

  .is_book_like
    .ShogiPlayerGround
      --sp_grid_outer_stroke: 1
      --sp_board_padding: 0
      --sp_board_color: inherit

  .first_sp
    .ShogiPlayerGround
      border: 1px dashed change_color($primary, $alpha: 0.5)
      .ShogiPlayerGroundTexture
        border: 1px dashed change_color($danger, $alpha: 0.5)

  // .title, .subtitle
  //   display: flex
  //   justify-content: center
  //   align-items: center
</style>
