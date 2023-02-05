<template lang="pug">
.ShogiPlayerWcRoot(part="__root__")
  // CSS変数の初期値はここに定義する
  // __root__ は確認のためにつけているだけなので使うな
  .ShogiPlayerCssVariablesOverride1(part="sp_css_variables")
    // 上書きする場合のCSS変数は shogi-player-wc::part(sp_css_variables) {} でここに定義してもらう
    // ShogiPlayerWcRoot でも上書きできたが優先度が曖昧なため階層化している
    .ShogiPlayerCssVariablesOverride2(:style="sp_css_variables_hash")
      // ここに定義すると shogi-player-wc::part(sp_css_variables) {} に勝つ
      // 例: sp_css_variables="{'--sp_controller_width':0.8}"
      //- @update:sp_turn="(...e) => $emit('update:sp_turn', e)"
      ShogiPlayer(
        v-bind="$props"
        v-on="$listeners"
        @update:short_sfen="                         (...args) => $emit('update:short_sfen', ...args)"
        @update:play_mode_advanced_full_moves_sfen=" (...args) => $emit('update:play_mode_advanced_full_moves_sfen', ...args)"
        @update:play_mode_advanced_short_sfen="      (...args) => $emit('update:play_mode_advanced_short_sfen', ...args)"
        @update:play_mode_advanced_moves="           (...args) => $emit('update:play_mode_advanced_moves', ...args)"
        @update:moves_take_turn_offset="             (...args) => $emit('update:moves_take_turn_offset', ...args)"
        @update:edit_mode_short_sfen="               (...args) => $emit('update:edit_mode_short_sfen', ...args)"
        @update:sp_turn="                            (...args) => $emit('update:sp_turn', ...args)"
        @user_piece_put="                            (...args) => $emit('user_piece_put', ...args)"
        @user_viewpoint_flip="                       (...args) => $emit('user_viewpoint_flip', ...args)"
        @user_turn_change="                          (...args) => $emit('user_turn_change', ...args)"
        @user_piece_lift="                           (...args) => $emit('user_piece_lift', ...args)"
        @user_piece_cancel="                         (...args) => $emit('user_piece_cancel', ...args)"
        @update:turn_offset="                        (...args) => $emit('update:turn_offset', ...args)"
        @update:turn_offset_max="                    (...args) => $emit('update:turn_offset_max', ...args)"
        @update:sp_run_mode="                        (...args) => $emit('update:sp_run_mode', ...args)"
        @update:sp_body="                            (...args) => $emit('update:sp_body', ...args)"
        @update:sp_debug_mode="                      (...args) => $emit('update:sp_debug_mode', ...args)"
        @update:sp_viewpoint="                       (...args) => $emit('update:sp_viewpoint', ...args)"
        @update:sp_layout="                          (...args) => $emit('update:sp_layout', ...args)"
        @update:sp_bg_variant="                      (...args) => $emit('update:sp_bg_variant', ...args)"
        @update:sp_pi_variant="                      (...args) => $emit('update:sp_pi_variant', ...args)"
        @board_cell_pointerdown="                    (...args) => $emit('board_cell_pointerdown', ...args)"
        @operation_invalid1="                        (...args) => $emit('operation_invalid1', ...args)"
        @operation_invalid2="                        (...args) => $emit('operation_invalid2', ...args)"
        @foul_accident="                             (...args) => $emit('foul_accident', ...args)"

        @player_info_click="                         (...args) => $emit('player_info_click', ...args)"
      )
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
// import "./foo.sass"
// import "shogi-player/components/stylesheets/all"
// import "shogi-player/components/ShogiPlayer.sass"
import ShogiPlayer from "shogi-player/components/ShogiPlayer.vue"

export default {
  name: "ShogiPlayerWcRoot",
  components: { ShogiPlayer },
  inheritAttrs: false,
  props: {
    // ここで style を受けていると v-bind="$props" でそのまま渡すことができる
    // が、ちょっとわかりづらい
    // 裏技的に入れておく
    style: { type: String, },

    ////////////////////////////////////////////////////////////////////////////////
    sp_css_variables: { type: String, },

    ////////////////////////////////////////////////////////////////////////////////
    // sp_layout:     { type: String, },
    // sp_slider:     { type: String, },
    // sp_controller: { type: String, },
    // sp_body:       { type: String, },

    sp_turn_slider_focus:                        { type: String,   }, // mountedしたらスライダーにフォーカスする？
    sp_summary:                                  { type: String,   }, // 手数や結果の表示(再生モード時) (is_summary_on is_summary_off)
    sp_slider:                                   { type: String,   }, // スライダー表示
    sp_setting:                                  { type: String,   }, // 設定ボタンの表示
    sp_controller:                               { type: String,   }, // コントローラー表示
    sp_viewpoint:                                { type: String,   }, // 視点
    sp_op_disabled:                              { type: Boolean,  }, // 全体の操作を無効化
    sp_hidden_if_piece_stand_blank:              { type: Boolean,  }, // 駒がないときは駒台側を非表示
    sp_flip_if_white:                            { type: Boolean,  }, // 最初に表示した局面が△なら反転
    sp_key_event_capture_enabled:                { type: Boolean,  }, // スライダーにフォーカスしていなくても左右キーで手数を動かす
    sp_shift_key_mag:                            { type: Number,   }, // キーで左右するとき shift を押したときの倍率
    sp_system_key_mag:                           { type: Number,   }, // キーで左右するとき command などを押したときの倍率
    sp_board_dimension_w:                        { type: Number,   }, // 盤のセル数(W)
    sp_board_dimension_h:                        { type: Number,   }, // 盤のセル数(H)
    sp_layout:                                   { type: String,   }, // レイアウト is_(vertical\|horizontal)
    sp_balloon:                                  { type: String,   }, // 対局者名の下に駒数スタイルと同じ背景色を置く
    sp_layer:                                    { type: String,   }, // レイヤー確認(デバッグ用)
    sp_pi_variant:                               { type: String,   }, // 駒の種類
    sp_bg_variant:                               { type: String,   }, // 盤の種類
    sp_mobile_vertical:                          { type: String,   }, // モバイル時に自動的に縦配置に切り替える
    sp_location_behavior:                        { type: String,   }, // ☗☖をタップしたとき視点を切り替える
    sp_debug_mode:                               { type: String,   }, // デバッグモード
    sp_sfen_show:                                { type: String,   }, // SFENを下に表示する
    sp_overlay_nav:                              { type: String,   }, // view_mode のとき盤の左右で手数変更(falseなら駒を動かせる)
    sp_digit_label:                              { type: String,   }, // 座標の表示
    sp_digit_label_variant:                      { type: String,   }, // 座標の表記
    sp_stand_gravity:                            { type: String,   }, // 駒台の位置
    sp_player_name_dir:                          { type: String,   }, // 名前の縦横書き切り替え(縦は横配置時のみ有効)
    sp_turn:                                     { type: Number,   }, // 局面(手数)
    sp_run_mode:                                 { type: String,   }, // モード
    sp_body:                                     { type: String,   }, // 棋譜 KIF or SFEN
    sp_player_info:                              { type: Object,   }, // 対局者名と時間
    sp_comment:                                  { type: String,   }, // KIFのコメントを表示する

    sp_human_side:                               { type: String,   }, // 含まれる側だけ操作できるようにする
    sp_device:                                   { type: String,   }, // デバイスを強制的に指定する (is_device_touch is_device_desktop) 自動判別するので基本そのままでよい
    sp_play_mode_foul_check_p:                   { type: Boolean,  }, // play_mode で「二歩・王手放置・駒ワープ・死に駒」の判定をするか？
    sp_play_mode_foul_break_p:                   { type: Boolean,  }, // 判定で反則だったら emit して抜けるか？(true: 初心者向け)
    sp_play_mode_legal_move_only:                { type: Boolean,  }, // play_mode で合法手のみに絞る
    sp_play_mode_auto_promote:                   { type: Boolean,  }, // play_mode で死に駒になるときは自動的に成る
    sp_play_mode_only_own_piece_to_move:         { type: Boolean,  }, // play_mode では自分手番とき自分の駒しか動かせないようにする
    sp_play_mode_can_not_kill_same_team_soldier: { type: Boolean,  }, // play_mode では自分の駒で同じ仲間の駒を取れないようにする
    sp_edit_mode_double_click_time_ms:           { type: Number,   }, // edit_mode で駒を反転するときのダブルクリックと認識する時間(ms)
    sp_move_cancel:                              { type: String,   }, // is_move_cancel_standard: (死に駒セルを除き)移動できないセルに移動したとき持った状態をキャンセルする。is_move_cancel_reality: (盤上の駒に限り)キャンセルは元の位置をタップ。is_move_cancel_rehold: (盤上の駒に限り)キャンセルと同時に盤上の駒を持つ
    sp_view_mode_soldier_movable:                { type: Boolean,  }, // view_mode でも駒を動かせる(ただし本筋は破壊しない)

    sp_board_cell_left_click_disabled:           { type: Boolean,  }, // 盤上セルタップ時の通常処理の無効化

    sp_board_piece_back_user_class_fn:           { type: Function, }, // セルのクラスを決める処理
  },
  mounted() {
    // console.log(JSON5.parse(""))

    console.log("NODE_ENV", process.env.NODE_ENV)
    console.log("$attrs", this.$attrs)
    console.log("$props", this.$props)
    console.log(this.sp_css_variables_hash)
  },
  methods: {
    foo(v) {
      console.log(v)
      // this.$emit('"update:sp_turn", v)

      // this.$el.dispatchEvent(
      //   new CustomEvent("foo", {})
      //   //   bubbles: true,
      //   //   composed: true,
      //   //   cancelable: false,
      //   //   detail: self
      //   // })
      // )

    },
  },
  computed: {
    sp_css_variables_hash() {
      return JSON5.parse(this.sp_css_variables ?? "{}")
    },
  },
}
</script>

<style lang="sass">
// Shadow DOM 内で読み込むと i タグに適用されるが「×」の状態になる
// どこが問題なのかよくわかっていないが外側でもさらに読み込むと「×」が解消される
@import url("https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css")

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

// 効かない
// shogi-player-wc
//   width: 100%

// .ShogiPlayerWcRoot
//   width: 100%
</style>
