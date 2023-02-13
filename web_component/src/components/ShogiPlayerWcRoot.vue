<template lang="pug">
.ShogiPlayerWcRoot(part="__root__")
  // CSS変数の初期値はここに定義する
  // __root__ は確認のためにつけているだけなので使うな
  .ShogiPlayerWcStyleScope(part="spwc_style_scope")
    // 上書きする場合のCSS変数は shogi-player-wc::part(spwc_style_scope) {} でここに定義してもらう
    // .ShogiPlayerWcRoot でも上書きできたが詳細度が曖昧になるため明確に階層化している
    .ShogiPlayerWcStyleHash(:style="spwc_style_hash_native")
      // ここに定義すると shogi-player-wc::part(spwc_style_scope) {} に勝つ
      // 例: spwc_style_hash="{'--sp_controller_width':0.8}"
      ShogiPlayer(v-bind="props_native" v-on="event_chain")
      // CDN版で dist/development/shogi-player-wc.min.js とすると表示する(いらない？)
      pre.ShogiPlayerWcInspector(v-if="development_p")
        | $props: {{JSON.stringify($props)}}
        | $attrs: {{JSON.stringify($attrs)}}
</template>

<script>
import JSON5 from "json5"

// Buefy
// これは全体で使うことになるので本当は index.js で読み込んだ方がよい
import Vue from "vue"
import Buefy from "buefy"
// import "buefy/dist/buefy.css"
Vue.use(Buefy)

// shogi-player 本体
// import "shogi-player/components/stylesheets/all"
// import "shogi-player/components/ShogiPlayer.sass"
import ShogiPlayer from "shogi-player/components/ShogiPlayer.vue"

import { EventList } from "shogi-player/components/models/event_list.js"

export default {
  name: "ShogiPlayerWcRoot",
  components: { ShogiPlayer },

  // true のままだと Shadow Host に意味のない属性が入ってしまう
  // 普通なら props で定義しているものが省かれる
  // ビルドツールの不具合なのかわからないが Web Components が絡むと省かれなかった
  // ↑関係ない？
  // inheritAttrs: false,

  props: {
    // ここで style を受けていると v-bind="$props" でそのまま渡すことができるの裏技的に入れておく
    // としていたもののこれは development だと警告がでているのでやめ
    // style: { type: String, },

    ////////////////////////////////////////////////////////////////////////////////
    spwc_style_hash: { type: String, },

    // Web Components で使えるのは String, Boolean, Number のみ
    // なので本来 Object だったり Function だったりするするものは String から変換しないといけない
    sp_turn_slider_focus:                        { type: String,  }, // mountedしたらスライダーにフォーカスする？
    sp_turn_show:                                { type: String,  }, // 手数や結果の表示(再生モード時) (is_turn_show_on is_turn_show_off)
    sp_slider:                                   { type: String,  }, // スライダー表示
    sp_setting:                                  { type: String,  }, // 設定ボタンの表示
    sp_controller:                               { type: String,  }, // コントローラー表示
    sp_viewpoint:                                { type: String,  }, // 視点
    sp_operation_disabled:                       { type: Boolean, }, // 全体の操作を無効化
    sp_hidden_if_piece_stand_blank:              { type: Boolean, }, // 駒がないときは駒台側を非表示
    sp_flip_if_white:                            { type: Boolean, }, // 最初に表示した局面が△なら反転
    sp_key_event_capture_enabled:                { type: Boolean, }, // スライダーにフォーカスしていなくても左右キーで手数を動かす
    sp_shift_key_mag:                            { type: Number,  }, // キーで左右するとき shift を押したときの倍率
    sp_system_key_mag:                           { type: Number,  }, // キーで左右するとき command などを押したときの倍率
    sp_layout:                                   { type: String,  }, // レイアウト is_(vertical\|horizontal)
    sp_balloon:                                  { type: String,  }, // 対局者名の下に駒数スタイルと同じ背景色を置く
    sp_layer:                                    { type: String,  }, // レイヤー確認(デバッグ用)
    sp_piece_variant:                            { type: String,  }, // 駒の種類
    sp_bg_variant:                               { type: String,  }, // 盤の種類
    sp_mobile_vertical:                          { type: String,  }, // モバイル時に自動的に縦配置に切り替える
    sp_location_behavior:                        { type: String,  }, // ☗☖をタップしたとき視点を切り替える
    sp_debug_mode:                               { type: String,  }, // デバッグモード
    sp_event_log:                                { type: Boolean, }, // イベントのログを開発コンソールに表示する
    sp_sfen_show:                                { type: String,  }, // SFENを下に表示する
    sp_overlay_nav:                              { type: String,  }, // view_mode のとき盤の左右で手数変更(falseなら駒を動かせる)
    sp_digit_label:                              { type: String,  }, // 座標の表示
    sp_digit_label_variant:                      { type: String,  }, // 座標の表記
    sp_stand_gravity:                            { type: String,  }, // 駒台の位置
    sp_player_name_direction:                    { type: String,  }, // 名前の縦横書き切り替え(縦は横配置時のみ有効)
    sp_turn:                                     { type: Number,  }, // 局面(手数)
    sp_run_mode:                                 { type: String,  }, // モード
    sp_body:                                     { type: String,  }, // 棋譜 KIF or SFEN
    sp_preset_key:                               { type: String,  }, // 手合割(初期配置)
    sp_comment:                                  { type: String,  }, // KIFのコメントを表示する
    sp_human_side:                               { type: String,  }, // 含まれる側だけ操作できるようにする
    sp_device:                                   { type: String,  }, // デバイスを強制的に指定する
    sp_foul_check:                   { type: Boolean, }, // play_mode で「二歩・王手放置・駒ワープ・死に駒」の判定をするか？
    sp_foul_break:                   { type: Boolean, }, // 判定で反則だったら emit して抜けるか？(true: 初心者向け)
    sp_legal_move_only:                { type: Boolean, }, // play_mode で合法手のみに絞る
    sp_piece_auto_promote:                   { type: Boolean, }, // play_mode で死に駒になるときは自動的に成る
    sp_my_piece_only_move:         { type: Boolean, }, // play_mode では自分手番とき自分の駒しか動かせないようにする
    sp_same_group_kill_disabled: { type: Boolean, }, // play_mode では自分の駒で同じ仲間の駒を取れないようにする
    sp_double_click_threshold_ms:           { type: Number,  }, // edit_mode で駒を反転するときのダブルクリックと認識する時間(ms)
    sp_move_cancel:                              { type: String,  }, // is_move_cancel_standard: (死に駒セルを除き)移動できないセルに移動したとき持った状態をキャンセルする。is_move_cancel_reality: (盤上の駒に限り)キャンセルは元の位置をタップ。is_move_cancel_rehold: (盤上の駒に限り)キャンセルと同時に盤上の駒を持つ
    sp_view_mode_soldier_movable:                { type: Boolean, }, // view_mode でも駒を動かせる(ただし本筋は破壊しない)
    sp_board_cell_left_click_disabled:           { type: Boolean, }, // 盤上セルタップ時の通常処理の無効化
    // 本当は Object
    sp_player_info:                              { type: String,  }, // 対局者名と時間
    // 本当は Function
    sp_board_cell_class_fn:                      { type: String,  }, // セルのクラスを決める処理
  },
  mounted() {
    if (this.development_p) {
      this.inspect_print()
    }
  },
  methods: {
    inspect_print() {
      console.log("NODE_ENV", process.env.NODE_ENV)
      console.log("$attrs", this.$attrs)
      console.log("$props", this.$props)
      console.log("spwc_style_hash_native", this.spwc_style_hash_native)
      console.log("props_native", this.props_native)
      console.log("EventList", EventList)
      console.log("event_chain", this.event_chain)
    },
  },
  computed: {
    // 開発モードか？
    development_p: () => process.env.NODE_ENV === "development",

    // spwc_style_hash の Hash 化
    spwc_style_hash_native() {
      const v = this.spwc_style_hash
      if (v) {
        return JSON5.parse(v)
      }
    },

    // v-bind ですべて渡すもの
    props_native() {
      // delete hash.spwc_style_hash としても良いが別に消さなくてもいいのでやらない
      return {...this.$props, ...this.override_props}
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
      const v = this.sp_player_info
      if (v != null) {
        return JSON5.parse(v)
      }
    },

    // sp_board_cell_class_fn の Function 化
    sp_board_cell_class_fn_native() {
      const v = this.sp_board_cell_class_fn
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
// Shadow DOM 内で読み込むと i タグに適用されるが「×」の状態になる
// どこが問題なのかよくわかっていないが外側でもさらに読み込むと「×」が解消される
@import url("https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css")

// @import "@mdi/font/css/materialdesignicons.min.css"

// ShogiPlayer のスタイルを読み込む
//
// この場所から assets への相対パスを指定する
// ShogiPlayer.sass はそれを見て assets の場所がわかる
// $sp_assets_dir: "shogi-player/assets"
// $sp_css_root: ".ShogiPlayerWcRoot2"
// // // // Web Components にした場合 html 内に定義しても shadow-root の中に届かない
// // // // なので Web Components 内に初期値を適用する
@import "shogi-player/components/ShogiPlayer.sass"

// CSS側で読み込むと Web Components 内に含まれる
@import "buefy/dist/buefy.css"

// このあとで +mobile などを使いたいため
// @import "~bulma/sass/utilities/_all"

// .ShogiPlayerWcRoot
//   width: 100%
</style>
