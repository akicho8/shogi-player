<template lang="pug">
.ShogiPlayer(:class="component_class")
  //- OpDisabledBlock(:base="base")

  i.fas.fa-spinner.fa-pulse(v-if="!mediator")

  ShogiPlayerGround(:base="base" ref="ShogiPlayerGround")

  DebugBlock(:base="base")

  b-modal(:active.sync="setting_modal_p" has-modal-card v-if="mediator")
    SettingModal(:base="base")

  pre(v-if="debug_p") {{$props}}
</template>

<script>
import _ from "lodash"
import Vue from 'vue'

// Library
import { Mediator } from "./models/mediator.js"
import { Place } from "./models/place.js"
import { SfenParser } from "./models/sfen_parser.js"
import { KifParser } from "./models/kif_parser.js"
import { Location } from "./models/location.js"

// components
import PieceBox from "./PieceBox.vue"
import SettingModal from "./SettingModal.vue"
import ErrorNotify from "./ErrorNotify.vue"
import OpDisabledBlock from "./OpDisabledBlock.vue"
import ShogiPlayerGround from "./ShogiPlayerGround.vue"
import EditToolBlock from "./EditToolBlock.vue"
import DebugBlock from "./DebugBlock.vue"
import PromoteSelectModal from "./PromoteSelectModal.vue"

// mixins modules
import navi_module from "./navi_module.js"
import shortcut_module from "./shortcut_module.js"
import edit_mode_module from "./edit_mode_module.js"
import play_mode_module from "./play_mode_module.js"
import sound_module from "./sound_module.js"
import preset_module from "./preset_module.js"
import any_func_module from "./any_func_module.js"
import api_module from "./api_module.js"

import { root_support } from "./root_support.js"

export default {
  name: 'ShogiPlayer',

  mixins: [
    root_support,

    // ここで直接 require("./xxx.js"), とは書けないので注意
    navi_module,
    shortcut_module,
    edit_mode_module,
    play_mode_module,
    sound_module,
    preset_module,
    any_func_module,
    api_module,
  ],

  props: {
    sp_board_dimension_w: { type: Number, default: 9,                       }, // 盤のセル数(W)
    sp_board_dimension_h: { type: Number, default: 9,                       }, // 盤のセル数(H)
    sp_layout:            { type: String, default: "is_vertical",           }, // レイアウト is_(vertical|horizontal)
    sp_hpos:              { type: String, default: "is_hcentered",          }, // DEPRECATE
    sp_vpos:              { type: String, default: "is_vcentered",          }, // DEPRECATE
    sp_fullheight:        { type: String, default: "is_fullheight_off",     }, // DEPRECATE
    sp_balloon:           { type: String, default: "is_balloon_on",         }, // 対局者名の下に駒数スタイルと同じ背景色を置く
    sp_layer:             { type: String, default: "is_layer_off",          }, // レイヤー確認(デバッグ用)
    sp_board_shadow:      { type: String, default: "is_board_shadow_drop",  }, // 盤の影適用方法 is_board_shadow_(drop|box|none)
    sp_blink:             { type: String, default: "is_blink_off",          }, // 最終手の表現方法 is_blink_(on|off)
    sp_pi_variant:        { type: String, default: "is_pi_variant_a1by",    }, // 駒の種類
    sp_bg_variant:        { type: String, default: "is_bg_variant_none",    }, // 盤の種類
    sp_mobile_fit:        { type: String, default: "is_mobile_fit_on",      }, // DEPRECATE
    sp_mobile_vertical:   { type: String, default: "is_mobile_vertical_on", }, // モバイル時に自動的に縦配置に切り替える
    sp_location_behavior: { type: String, default: "is_location_flip_on",   }, // ☗☖をタップしたとき視点を切り替える
    sp_debug:             { type: String, default: "is_debug_off",          }, // デバッグモード
    sp_sfen_show:         { type: String, default: "is_sfen_show_off",      }, // SFENを下に表示する
    sp_overlay_nav:       { type: String, default: "is_overlay_nav_off",    }, // play_mode のとき盤の左右で手数変更(falseなら駒を動かせる)
    sp_turn:              { type: Number, default: -1,                      }, // 局面(手数)
    sp_run_mode:          { type: String, default: "view_mode",             }, // モード

    sp_body:              { type: String, default: null,                    }, // 棋譜 KIF or SFEN
    sp_player_info:       { type: Object, default: null,                    }, // 対局者名と時間
    sp_comment:           { type: String, default: "is_comment_on",         }, // KIFのコメントを表示する

    sp_player_click_handle:   { type: Function, default: null, },              // 名前(時間を含む)をタップしたときに実行する
    sp_location_click_handle: { type: Function, default: null, },              // ☗☖をタップしたときに実行する
    sp_board_click_handle:    { type: Function, default: null, },              // 盤をタップしたときに実行する(駒よりも優先)

    sp_board_piece_back_user_style:        { type: Function, default: null, }, // セルのスタイルを決める処理
    sp_board_piece_back_user_class:        { type: Function, default: null, }, // セルのクラスを決める処理
    sp_board_cell_left_click_user_handle:  { type: Function, default: null, }, // セルタップ時の処理(クリック後に呼ぶ)
    sp_board_cell_pointerdown_user_handle: { type: Function, default: null, }, // セルタップ時の処理(クリックした瞬間に呼ぶ)
  },

  components: {
    PieceBox,
    SettingModal,
    ErrorNotify,
    OpDisabledBlock,
    EditToolBlock,
    DebugBlock,
    ShogiPlayerGround,
    PromoteSelectModal,
  },

  data() {
    return {
      new_debug:    this.sp_debug,
      new_run_mode: this.sp_run_mode,

      turn_edit_value: null,    // numberフィールドで current_turn を直接操作すると空にしたとき補正値 0 に変換されて使いづらいため別にする。あと -1 のときの挙動もわかりやすい。
      mediator: null,           // 局面管理
      turn_edit_p: false,         // N手目編集中
      update_counter: 0,
      setting_modal_p: false,
      env: process.env.NODE_ENV,
      view_mode_turn_offset_save: null, // viewモードを抜けるとき現在の手数を記憶しておく
    }
  },

  created() {
    if (this.view_p) {
      this.mediator_setup(this.sp_turn)
    }

    if (this.play_p) {
      this.mediator_setup(this.sp_turn)
      this.play_mode_setup_from("view_mode")
    }

    if (this.edit_p) {
      if (this.sp_preset_key) {
        this.mediator_setup_by_preset(this.sp_preset_key) // 駒箱に「玉」を乗せたいため
      } else {
        this.mediator_setup_for_edit_mode()
      }
    }
  },

  watch: {
    turn_edit_value() {
      this.current_turn_set(this.turn_edit_value)
    },

    sp_turn() {
      this.current_turn_set(this.sp_turn)
    },

    kifu_source() {
      this.state_reset() // 駒を持った状態で sp_body を切り替えられたとき駒を持ってない状態にする

      if (this.edit_p) {
        this.mediator_setup_for_edit_mode()
        return
      }

      let sfen_change_p = false
      let before_sfen = null

      if (this.sp_sound_body_changed) {
        before_sfen = this.mediator ? this.mediator.to_simple_sfen : ""
      }

      this.mediator_setup(this.sp_turn)

      if (this.sp_sound_body_changed) {
        sfen_change_p = (before_sfen !== this.mediator.to_simple_sfen)
      }

      if (this.view_p) {
        if (sfen_change_p) {
          this.sound_play("piece_put")
        }
      }
      if (this.play_p) {
        this.play_mode_setup_from("view_mode")
        // 棋譜を反映された側は
        // 1. 相手が指したのか → 駒音だす
        // 2. 自分の指し手が正しい指し手だと判断された棋譜が返って反映されたのか → 駒音なし
        // この区別が付かない。なのでここで成らさない方がよい
        // this.sound_play("piece_put")
        // ……と思ったが 1 は turn_offset_max が変化したかどうかで判断できる。いや sfen を見ればわかる？ → そこまでする必要ない
        // if (before_turn_offset_max !== this.turn_offset_max) {
        if (sfen_change_p) {
          this.sound_play("piece_put")
        }
      }
    },

    ////////////////////////////////////////////////////////////////////////////////

    sp_run_mode(v) { this.new_run_mode = v            }, // 外から内への反映

    // 外からまたはダイアログから変更されたとき
    new_run_mode(new_val, old_val) {
      this.$emit("update:sp_run_mode", this.new_run_mode)

      if (this.view_p) {
        this.log("new_run_mode: view_mode")
        // alert(`復元:${this.view_mode_turn_offset_save}`)
        this.view_mode_mediator_update(this.view_mode_turn_offset_save)
        this.view_mode_turn_offset_save = null
      } else {
        // view_mode ではなくなったときの最初だけ保存しておく(mediatorをまるごと保存しておく手もあるかも)
        if (this.view_mode_turn_offset_save === null) {
          this.view_mode_turn_offset_save = this.turn_offset
          // alert(`保存:${this.view_mode_turn_offset_save}`)
        }
      }

      if (this.play_p) {
        this.play_mode_setup_from(old_val)
      }

      if (this.edit_p) {
        this.log("new_run_mode: edit_mode")

        const new_mediator = new Mediator()
        new_mediator.data_source = this.data_source_by(this.mediator.to_position_sfen)
        new_mediator.current_turn = 0
        new_mediator.run()

        this.mediator = new_mediator
        this.init_location_key = new_mediator.current_location.key

        this.mediator.piece_box_piece_couns_adjust()
      }
    },

    //////////////////////////////////////////////////////////////////////////////// FIXME: これまとめて書けんのか？

    sp_debug(v)  { this.new_debug = v               }, // 外 -> 内
    new_debug(v) { this.$emit("update:sp_debug", v) }, // 内 -> 外

    ////////////////////////////////////////////////////////////////////////////////

    turn_offset_max(v) { this.$emit("update:turn_offset_max", v) },
  },

  methods: {
    mediator_setup(turn) {
      this.mediator = new Mediator()
      this.mediator.data_source = this.data_source_by(this.kifu_source)
      this.mediator.current_turn = turn
      this.mediator.run()
      this.flip_if_white_run()
    },

    mediator_setup_for_edit_mode() {
      // まず0手目の状態を作る
      this.mediator = new Mediator()
      this.mediator.data_source = this.data_source_by(this.kifu_source)
      this.mediator.current_turn = 0
      this.mediator.run()

      // 0手目の手番を反映
      this.init_location_key = this.mediator.current_location.key

      // そのあとで指定の手数に変更
      this.mediator.current_turn = this.sp_turn
      this.mediator.run()

      // 不足駒を駒箱に生成
      this.mediator.piece_box_piece_couns_adjust()

      this.flip_if_white_run()
    },

    flip_if_white_run() {
      if (this.sp_flip_if_white) {
        this.new_viewpoint = this.mediator.data_source.base_location.key
      }
    },

    view_mode_mediator_update(turn) {
      this.mediator_setup(turn)
      // this.sound_play("piece_put")
      this.update_counter++
    },

    data_source_by(str) {
      let data_source = null
      if (/position|sfen|moves/.test(str)) {
        data_source = new SfenParser()
      } else {
        data_source = new KifParser()
      }
      data_source.raw_body = str
      data_source.parse()
      return data_source
    },

    turn_edit_handle() {
      this.turn_edit_p = true
      this.turn_edit_value = this.turn_offset
    },

    log(...v) {
      if (this.debug_p || process.env.NODE_ENV === "development") {
        console.log(...v)
      }
    },

    board_piece_tap_class(xy) {
      const place = Place.fetch(xy)
      const soldier = this.mediator.board.lookup(place)
      let list = []

      list.push(place.css_place_key) // place_9_9

      if (this.lifted_p) {
        list.push("piece_lifted_hover_reaction")
      }

      if (!this.lifted_p) {
        if (this.mediator.last_hand) {
          const origin_place = this.mediator.last_hand.origin_place
          if (origin_place) {
            if (_.isEqual(origin_place, place)) {
              list.push("origin_place")
            }
          }
          if (_.isEqual(this.mediator.last_hand.place, place)) {
            list.push("current")
          }
        }
      }

      if (_.isEqual(this.place_from, place)) {
        list.push("lifted_from_p")
      } else if (soldier) {
        if (!this.lifted_p) {
          let f = false
          if (this.edit_p) {
            f = true
          } else if (!this.cpu_location_p && this.mediator.current_location === soldier.location) {
            f = true
          } else if (this.play_p && !this.sp_play_mode_only_own_piece_to_move) {
            f = true
          }
          if (f) {
            list.push("selectable_p")
          }
        }
      }

      // if (soldier) {
      //   list = _.concat(list, soldier.css_class_list)
      // }

      // 先後関係なく上か下かどちら側にいるかを表すクラスを指定
      //   white -> is_position_north
      //   black -> is_position_south
      // もし反転しているなら逆になる
      if (soldier) {
        list.push(soldier.location.flip_if(this.base.fliped).position_key)
      }

      if (this.sp_board_piece_back_user_class) {
        list = _.concat(list, this.sp_board_piece_back_user_class(place))
      }

      return list
    },

    board_piece_back_style(xy) {
      if (this.sp_board_piece_back_user_style) {
        return this.sp_board_piece_back_user_style(Place.fetch(xy))
      }
    },
  },

  computed: {
    base()           { return this                              },
    location_black() { return Location.fetch("black")           },
    location_white() { return Location.fetch("white")           },
    view_p()         { return this.new_run_mode === "view_mode" },
    play_p()         { return this.new_run_mode === "play_mode" },
    edit_p()         { return this.new_run_mode === "edit_mode" },
    debug_p()        { return this.new_debug === "is_debug_on"  },

    // 本当は delegate したい。this.$watch を使えば動的になりそう？
    turn_base()       { if (this.mediator) { return this.mediator.turn_base       } }, // 表示する上での開始手数で普通は 0
    turn_offset()     { if (this.mediator) { return this.mediator.turn_offset     } }, // 手数のオフセット
    display_turn()    { if (this.mediator) { return this.mediator.display_turn    } }, // turn_base + turn_offset
    turn_offset_min() { if (this.mediator) { return this.mediator.turn_offset_min } }, // 必ず 0
    turn_offset_max() { if (this.mediator) { return this.mediator.turn_offset_max } }, // moves.length が 2 なら 2

    component_class() {
      return [
        `is_run_mode_${this.new_run_mode}`,
        this.new_debug,
      ]
    },

    kifu_source() {
      return this.sp_body || this.init_preset_sfen || "position startpos"
    },
  },
}
</script>

<style lang="sass">
@import "support.sass"
.ShogiPlayer
  width: 100%
</style>
