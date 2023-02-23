<template lang="pug">
.ShogiPlayer.is-relative(:class="component_class")
  SpGround(ref="SpGround")
</template>

<script>
import _ from "lodash"
import Vue from "vue"

// Library
import { Xcontainer } from "./models/xcontainer.js"
import { Place      } from "./models/place.js"
import { SfenParser } from "./models/sfen_parser.js"
import { KifParser  } from "./models/kif_parser.js"
import { Location   } from "./models/location.js"
import { EventList   } from "./models/event_list.js"

// components
import ErrorNotify        from "./ErrorNotify.vue"
import OpDisabledBlock    from "./OpDisabledBlock.vue"
import SpGround  from "./SpGround.vue"
import EditToolBlock      from "./EditToolBlock.vue"
import PromoteSelectModal from "./PromoteSelectModal.vue"

// mixins modules
import { mod_focus          } from "./mod_focus.js"
import { mod_navi        } from "./mod_navi.js"
import { mod_dev_tools        } from "./dev_tools/mod_dev_tools.js"
import { mod_resize_observer        } from "./mod_resize_observer.js"
import { mod_shortcut    } from "./mod_shortcut.js"
import { mod_edit_mode   } from "./mod_edit_mode.js"
import { mod_illegal        } from "./mod_illegal.js"
import { mod_lifted_piece } from "./mod_lifted_piece.js"
import { mod_legal_check        } from "./mod_legal_check.js"
import { mod_play_mode   } from "./mod_play_mode.js"
import { mod_profile        } from "./mod_profile.js"
import { mod_preset      } from "./mod_preset.js"
import { mod_edit_tool    } from "./mod_edit_tool.js"
import { mod_api_functions         } from "./mod_api_functions.js"
import { mod_device_detect      } from "./mod_device_detect.js"
import { mod_chore          } from "./mod_chore.js"
import { mod_debug          } from "./mod_debug.js"
import { mod_vector         } from "./mod_vector.js"

export default {
  name: "ShogiPlayer",

  mixins: [
    mod_chore,
    mod_debug,
    mod_vector,
    mod_focus,
    mod_navi,
    mod_dev_tools,
    mod_resize_observer,
    mod_shortcut,
    mod_edit_mode,
    mod_illegal,
    mod_lifted_piece,
    mod_legal_check,
    mod_play_mode,
    mod_profile,
    mod_preset,
    mod_edit_tool,
    mod_api_functions,
    mod_device_detect,
  ],

  props: {
    sp_board_dimension_w:                  { type: Number, default: 9,                       }, // 盤のセル数(W)
    sp_board_dimension_h:                  { type: Number, default: 9,                       }, // 盤のセル数(H)
    sp_layout:                             { type: String, default: "horizontal",             }, // レイアウト

    // 対局者名の下に駒数スタイルと同じ背景色を置く
    sp_balloon: {
      type: Boolean,
      default: true,
    },


    // 駒の種類
    sp_piece_variant: {
      type: String,
      default: "a",
      validator(value) { return ["none", "a", "b", "c", "d"].includes(value) },
    },

    // 盤の種類
    sp_bg_variant: {
      type: String,
      default: "none",
      validator(value) { return ["none", "a", "b"].includes(value) },
    },

    // モバイル時に自動的に縦配置に切り替える
    sp_mobile_vertical: {
      type: Boolean,
      default: true,
    },

    // ☗☖をタップしたときの挙動
    sp_location_click_behavior: {
      type: String,
      default: "flip",
      validator(value) { return ["flip", "nop"].includes(value) },
    },

    // SFENを下に表示する
    sp_sfen_show: {
      type: Boolean,
      default: false,
    },

    // view のとき盤の左右で手数変更(falseなら駒を動かせる)
    sp_overlay_nav: {
      type: Boolean,
      default: false,
    },

    // 座標の表示
    sp_coordinate: {
      type: Boolean,
      default: false,
    },

    // 座標の表記
    sp_coordinate_variant: {
      type: String,
      default: "kanji",
      validator(value) { return ["kanji", "number", "alphabet"].includes(value) },
    },

    // 駒台の位置
    sp_stand_gravity: {
      type: String,
      default: "bottom",
      validator(value) { return ["top", "bottom"].includes(value) },
    },

    // 名前の縦横書き切り替え(縦は横配置時のみ有効)
    sp_name_direction: {
      type: String,
      default: "horizontal",
      validator(value) { return ["horizontal", "vertical"].includes(value) },
    },

    sp_turn:                               { type: Number, default: -1,                      }, // 局面(手数)
    sp_mode:                           { type: String, default: "view",             }, // モード
    sp_body:                               { type: String, default: null,                    }, // 棋譜 KIF or SFEN
    sp_player_info:                        { type: Object, default: null,                    }, // 対局者名と時間

    // KIFのコメントを表示する
    sp_comment: {
      type: Boolean,
      default: true,
    },

    sp_board_cell_left_click_disabled:     { type: Boolean, default: false,                  }, // 盤上の左クリックの通常処理を無効化するか？

    // 一方向の $emit ではどうにもならない関数たち
    sp_board_cell_class_fn:     { type: Function, default: null,                  }, // セルのクラスを決める処理
  },

  components: {
    ErrorNotify,
    OpDisabledBlock,
    EditToolBlock,
    SpGround,
    // DevTools,
    PromoteSelectModal,
  },

  data() {
    return {
      mut_mode: this.sp_mode,

      turn_edit_value: null,            // numberフィールドで current_turn を直接操作すると空にしたとき補正値 0 に変換されて使いづらいため別にする。あと -1 のときの挙動もわかりやすい。
      xcontainer: null,                 // 局面管理
      turn_edit_p: false,               // N手目編集中
      update_counter: 0,
      env: process.env.NODE_ENV,
      view_mode_turn_offset_save: null, // viewモードを抜けるとき現在の手数を記憶しておく
    }
  },

  provide() {
    return {
      TheSp: this,
    }
  },

  created() {
    if (this.view_p) {
      this.xcontainer_setup(this.sp_turn)
    }
    if (this.play_p) {
      this.xcontainer_setup(this.sp_turn)
      this.play_mode_setup_from("view")
    }
    if (this.edit_p) {
      if (this.sp_preset) {
        this.xcontainer_setup_by_preset(this.sp_preset) // 駒箱に「玉」を乗せたいため
      } else {
        this.xcontainer_setup_for_edit_mode()
      }
    }
  },
  watch: {
    // sp_turn の watch より先に記述すること
    // そうしないと sp_turn と sp_body を同時に変更したとき
    // sp_turn, sp_body の順に反映されて局面が1つ前になってしまう
    kifu_source() {
      this.state_reset() // 駒を持った状態で sp_body を切り替えられたとき駒を持ってない状態にする

      if (this.edit_p) {
        this.xcontainer_setup_for_edit_mode()
        return
      }

      this.xcontainer_setup(this.sp_turn)

      if (this.play_p) {
        this.play_mode_setup_from("view")
      }
    },

    // kifu_source の watch より後に記述すること
    sp_turn() {
      this.current_turn_set(this.sp_turn)
    },

    // turn_edit_value() {
    //   this.current_turn_set(this.turn_edit_value)
    // },

    ////////////////////////////////////////////////////////////////////////////////

    sp_mode(v) { this.mut_mode = v            }, // 外から内への反映

    // 外からまたはダイアログから変更されたとき
    mut_mode(new_val, old_val) {
      this.event_call("update:sp_mode", this.mut_mode)

      if (this.view_p) {
        this.log("mut_mode: view")
        // alert(`復元:${this.view_mode_turn_offset_save}`)
        this.view_mode_xcontainer_update(this.view_mode_turn_offset_save)
        this.view_mode_turn_offset_save = null
      } else {
        // view ではなくなったときの最初だけ保存しておく(xcontainerをまるごと保存しておく手もあるかも)
        if (this.view_mode_turn_offset_save === null) {
          this.view_mode_turn_offset_save = this.turn_offset
          // alert(`保存:${this.view_mode_turn_offset_save}`)
        }
      }

      if (this.play_p) {
        this.play_mode_setup_from(old_val)
      }

      if (this.edit_p) {
        this.log("mut_mode: edit")

        const new_xcontainer = new Xcontainer()
        new_xcontainer.data_source = this.data_source_by(this.xcontainer.to_short_sfen)
        new_xcontainer.current_turn = 0
        new_xcontainer.run()

        this.xcontainer = new_xcontainer
        this.init_location_key = new_xcontainer.current_location.key

        this.xcontainer.piece_box_piece_counts_adjust()
      }
    },

    ////////////////////////////////////////////////////////////////////////////////

    // 駒を持った状態で sp_human_side が変更になって指せなくなったとき駒を離す
    sp_human_side() {
      this.hold_cancel()
    },

    ////////////////////////////////////////////////////////////////////////////////

    turn_offset_max(v) { this.event_call("ev_turn_offset_max_change", v) },
  },

  methods: {
    xcontainer_setup(turn) {
      this.xcontainer = new Xcontainer()
      this.xcontainer.data_source = this.data_source_by(this.kifu_source)
      this.xcontainer.current_turn = turn
      this.xcontainer.run()
      this.flip_if_white_run()
    },

    xcontainer_setup_for_edit_mode() {
      // まず0手目の状態を作る
      this.xcontainer = new Xcontainer()
      this.xcontainer.data_source = this.data_source_by(this.kifu_source)
      this.xcontainer.current_turn = 0
      this.xcontainer.run()

      // 0手目の手番を反映
      this.init_location_key = this.xcontainer.current_location.key

      // そのあとで指定の手数に変更
      this.xcontainer.current_turn = this.sp_turn
      this.xcontainer.run()

      // 不足駒を駒箱に生成
      this.xcontainer.piece_box_piece_counts_adjust()

      this.flip_if_white_run()
    },

    flip_if_white_run() {
      if (this.sp_active_side_viewpoint) {
        this.new_viewpoint = this.xcontainer.data_source.base_location.key
      }
    },

    view_mode_xcontainer_update(turn) {
      this.xcontainer_setup(turn)
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

    turn_edit_value_set(v) {
      this.log(`ユーザーが局面番号指定:${v}`)
      this.current_turn_set(v, true)
    },

    board_piece_tap_class(xy) {
      const place = Place.fetch(xy)
      const soldier = this.xcontainer.board.lookup(place)
      let list = []

      list.push(place.css_place_key) // place_9_9

      if (this.lifted_p) {
        list.push("piece_lifted_hover_reaction")
      }

      if (!this.lifted_p) {
        if (this.xcontainer.last_hand) {
          const origin_place = this.xcontainer.last_hand.origin_place
          if (origin_place) {
            if (_.isEqual(origin_place, place)) {
              list.push("origin_place")
            }
          }
          if (_.isEqual(this.xcontainer.last_hand.place, place)) {
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
          } else if (!this.cpu_location_p && this.xcontainer.current_location === soldier.location) {
            f = true
          } else if (this.play_p && !this.sp_my_piece_only_move) {
            f = true
          }
          if (this.break_if_view_mode) {
            f = false
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
        list.push(soldier.location.flip_if(this.fliped).position_key)
      }

      // if (this.sp_board_cell_class_fn) {
      //   list = _.concat(list, this.sp_board_cell_class_fn(place))
      // }

      return list
    },

    delegate_to_xcontainer(method) {
      if (this.xcontainer) {
        return this.xcontainer[method]
      }
    },

    str_to_css_class(prefix, value) { return `${prefix}_${value}` },
    bool_to_css_class(prefix, value)   { return `${prefix}_${value ? 'on' : 'off'}` },

  },

  computed: {
    location_black() { return Location.fetch("black")                    },
    location_white() { return Location.fetch("white")                    },
    view_p()         { return this.mut_mode === "view"          },
    play_p()         { return this.mut_mode === "play"          },
    edit_p()         { return this.mut_mode === "edit"          },

    turn_base()       { return this.delegate_to_xcontainer("turn_base")       }, // 表示する上での開始手数で普通は 0
    turn_offset()     { return this.delegate_to_xcontainer("turn_offset")     }, // 手数のオフセット
    display_turn()    { return this.delegate_to_xcontainer("display_turn")    }, // turn_base + turn_offset
    turn_offset_min() { return this.delegate_to_xcontainer("turn_offset_min") }, // 必ず 0
    turn_offset_max() { return this.delegate_to_xcontainer("turn_offset_max") }, // moves.length が 2 なら 2

    component_class() {
      return [
        this.str_to_css_class("is_mode", this.mut_mode), // is_mode_view | is_mode_play | is_mode_edit
        this.bool_to_css_class("is_debug", this.mut_debug),
        this.bool_to_css_class("is_event_log", this.mut_event_log),
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
