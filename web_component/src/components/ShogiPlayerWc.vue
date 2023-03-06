<template lang="pug">
//- ← Web Components のCSSはここに定義されるので
.ShogiPlayerWc(part="root")
  //- ↑ここに対して利用者が定義したCSSはなんでも上書きできる？ → できない
  // CSS変数を定義することはできるが scss のようには書けない (というか書けては困る)
  ShogiPlayer(v-bind="bind_props" v-on="event_chain")
  pre.ShogiPlayerWcInspector(v-if="development_p")
    | $props: {{JSON.stringify($props)}}
    | $attrs: {{JSON.stringify($attrs)}}
    | bind_props: {{JSON.stringify(bind_props)}}
</template>

<script>
import JSON5 from "json5"

// Buefy
import Vue from "vue"
import Buefy from "buefy"
// // import "buefy/dist/buefy.css"
Vue.use(Buefy)

// shogi-player 本体
// import "shogi-player/components/stylesheets/all"
// import "shogi-player/components/ShogiPlayer.sass"
import ShogiPlayer from "shogi-player/components/ShogiPlayer.vue"

import { EventList } from "shogi-player/components/models/event_list.js"

const MDI_CSS_URL = "https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css"
const UNIQUE_ID   = "bdf2da9503326784806e006ec9c11bcf"

export default {
  name: "ShogiPlayerWc",
  components: { ShogiPlayer },

  props: {
    // Web Components で使えるのは String, Boolean, Number のみ
    // なので本来 Object だったり Function だったりするするものは String から変換しないといけない

    spPassProps: { type: String }, // Vue 3 用

    ////////////////////////////////////////////////////////////////////////////////
    sp_pass_style:                     { type: String,  },
    sp_pass_css:                       { type: String,  },

    sp_mode:                           { type: String,  }, // モード
    sp_body:                           { type: String,  }, // 棋譜 KIF or SFEN
    sp_preset:                         { type: String,  }, // 手合割(初期配置)
    sp_mounted_focus_to_slider:        { type: Boolean, }, // mountedしたらスライダーにフォーカスする？
    sp_turn_show:                      { type: Boolean, }, // 手数や結果の表示(再生モード時) (true false)
    sp_slider:                         { type: Boolean, }, // スライダー表示
    sp_dev_tools:                      { type: Boolean, }, // 設定ボタンの表示
    sp_dev_tools_position:             { type: String,  },
    sp_dev_tools_group:                { type: String,  },
    sp_controller:                     { type: Boolean, }, // コントローラー表示
    sp_viewpoint:                      { type: String,  }, // 視点
    sp_operation_disabled:             { type: Boolean, }, // 全体の操作を無効化
    sp_piece_stand_blank_then_hidden:  { type: Boolean, }, // 駒がないときは駒台側を非表示
    sp_active_side_viewpoint:          { type: Boolean, }, // 最初に表示した局面が△なら反転
    sp_key_event_capture:              { type: Boolean, }, // スライダーにフォーカスしていなくても左右キーで手数を動かす
    sp_shift_key_mag:                  { type: Number,  }, // キーで左右するとき shift を押したときの倍率
    sp_system_key_mag:                 { type: Number,  }, // キーで左右するとき command などを押したときの倍率
    sp_layout:                         { type: String,  }, // レイアウト is_(vertical\|horizontal)
    sp_balloon:                        { type: Boolean, }, // 対局者名の下に駒数スタイルと同じ背景色を置く
    sp_layer:                          { type: Boolean, }, // レイヤー確認(デバッグ用)
    sp_piece_variant:                  { type: String,  }, // 駒の種類
    sp_board_variant:                  { type: String,  }, // 盤の種類
    sp_mobile_vertical:                { type: Boolean, }, // モバイル時に自動的に縦配置に切り替える
    sp_location_click_behavior:        { type: String,  }, // ☗☖をタップしたとき視点を切り替える
    sp_debug:                          { type: Boolean, }, // デバッグモード
    sp_event_log:                      { type: Boolean, }, // イベントのログを開発コンソールに表示する
    sp_sfen_show:                      { type: Boolean, }, // SFENを下に表示する
    sp_overlay_nav:                    { type: Boolean, }, // view のとき盤の左右で手数変更(falseなら駒を動かせる)
    sp_coordinate:                     { type: Boolean, }, // 座標の表示
    sp_coordinate_variant_v:             { type: String,  }, // 座標の表記
    sp_stand_gravity:                  { type: String,  }, // 駒台の位置
    sp_name_direction:                 { type: String,  }, // 名前の縦横書き切り替え(縦は横配置時のみ有効)
    sp_turn:                           { type: Number,  }, // 局面(手数)
    sp_comment:                        { type: Boolean, }, // KIFのコメントを表示する
    sp_human_side:                     { type: String,  }, // 含まれる側だけ操作できるようにする
    sp_device:                         { type: String,  }, // デバイスを強制的に指定する
    sp_illegal_validate:               { type: Boolean, }, // play で「二歩・王手放置・駒ワープ・死に駒」の判定をするか？
    sp_illegal_cancel:                 { type: Boolean, }, // 判定で反則だったら emit して抜けるか？(true: 初心者向け)
    sp_legal_move_only:                { type: Boolean, }, // play で合法手のみに絞る
    sp_piece_auto_promote:             { type: Boolean, }, // play で死に駒になるときは自動的に成る
    sp_my_piece_only_move:             { type: Boolean, }, // play では自分手番とき自分の駒しか動かせないようにする
    sp_my_piece_kill_disabled:         { type: Boolean, }, // play では自分の駒で同じ仲間の駒を取れないようにする
    sp_double_click_threshold_ms:      { type: Number,  }, // edit で駒を反転するときのダブルクリックと認識する時間(ms)
    sp_lift_cancel_action:             { type: String,  }, // standard: (死に駒セルを除き)移動できないセルに移動したとき持った状態をキャンセルする。reality: (盤上の駒に限り)キャンセルは元の位置をタップ。rehold: (盤上の駒に限り)キャンセルと同時に盤上の駒を持つ
    sp_view_mode_piece_movable:        { type: Boolean, }, // view でも駒を動かせる(ただし本筋は破壊しない)
    sp_board_cell_left_click_disabled: { type: Boolean, }, // 盤上セルタップ時の通常処理の無効化
    // 本当は Object
    sp_player_info:                    { type: String,  }, // 対局者名と時間
    // 本当は Function
    sp_board_cell_class_fn:            { type: String,  }, // セルのクラスを決める処理
  },
  beforeMount() {
    if (!document.getElementById(UNIQUE_ID)) {
      const template = document.createElement("template")
      template.innerHTML = `<link crossorigin="anonymous" href="${MDI_CSS_URL}" rel="stylesheet" id="${UNIQUE_ID}">`
      const el = document.querySelector("head") // body でも良い
      el.appendChild(template.content.cloneNode(true))
    }
    if (this.development_p) {
      this.inspect_print()
    }
  },
  methods: {
    inspect_print() {
      console.log("NODE_ENV", process.env.NODE_ENV)
      console.log("$attrs", this.$attrs)
      console.log("$props", this.$props)
      console.log("spPassProps", this.spPassProps)
      // console.log("sp_pass_style_native", this.sp_pass_style_native)
      console.log("bind_props", this.bind_props)
      console.log("EventList", EventList)
      console.log("event_chain", this.event_chain)
      // console.log("dataset", this.$el.dataset)
    },
    debug_log(...args) {
      if (this.development_p) {
        console.debug(...args)
      }
    },
    lookup_var(name) {
      if (this.sp_pass_props_native) {
        if (name in this.sp_pass_props_native) {
          return this.sp_pass_props_native[name]
        }
      }
      return this[name]
    },
  },
  computed: {
    // 開発モードか？
    development_p: () => process.env.NODE_ENV === "development",

    sp_pass_props_native() {
      const v = this.spPassProps
      if (v) {
        return JSON5.parse(v)
      }
    },

    // v-bind ですべて渡すもの
    bind_props() {
      return {
        ...this.$props,
        ...this.sp_pass_props_native,
        ...this.override_props,
      }
    },

    // Vue.js スコープで有効な型に変換したものたち
    override_props() {
      return {
        sp_player_info:         this.sp_player_info_native,
        sp_board_cell_class_fn: this.sp_board_cell_class_fn_native,
      }
    },

    // sp_player_info の Hash 化
    sp_player_info_native() {
      const v = this.lookup_var("sp_player_info")
      if (v != null) {
        return JSON5.parse(v)
      }
    },

    // sp_board_cell_class_fn の Function 化
    sp_board_cell_class_fn_native() {
      const v = this.lookup_var("sp_board_cell_class_fn")
      if (v != null) {
        return eval(v)
      }
    },

    // host 自身から emit しないと外には届かないためこうなっている
    event_chain() {
      return EventList.reduce((a, m) => ({...a, [m]: (...args) => this.$emit(m, ...args)}), {})
    },
  },
}
</script>

<style lang="sass">
@import "shogi-player/assets/sass/application.sass"

// Shadow DOM 内で読み込むとフォントが読み込まれないがその他の部分は適用する必要があるため読み込む
@import url("https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css")
</style>

<style>
/* https://web.dev/custom-elements-best-practices/ */
/* Web Components 全般のいまいちな仕様として display の初期値が inline になっている。*/
/* なのでサイズが効かずにはまりがち。サイズを効かせるためには block や inline-block に変更しないといけない。*/
/* これに関しては Web Components 側で指定できる */
:host {
  display: block;
}
</style>
