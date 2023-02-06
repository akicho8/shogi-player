<template lang="pug">
.ShogiPlayer(:class="component_class")
  ShogiPlayerGround(ref="ShogiPlayerGround")
  DebugBlock
  b-modal(:active.sync="setting_modal_p" has-modal-card v-if="xcontainer")
    SettingModal
  pre(v-if="debug_p") {{$props}}
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

// components
import PieceBox           from "./PieceBox.vue"
import SettingModal       from "./SettingModal.vue"
import ErrorNotify        from "./ErrorNotify.vue"
import OpDisabledBlock    from "./OpDisabledBlock.vue"
import ShogiPlayerGround  from "./ShogiPlayerGround.vue"
import EditToolBlock      from "./EditToolBlock.vue"
import DebugBlock         from "./DebugBlock.vue"
import PromoteSelectModal from "./PromoteSelectModal.vue"

// mixins modules
import { app_focus          } from "./app_focus.js"
import { navi_module        } from "./navi_module.js"
import { cell_size_module        } from "./cell_size_module.js"
import { shortcut_module    } from "./shortcut_module.js"
import { edit_mode_module   } from "./edit_mode_module.js"
import { foul_module        } from "./foul_module.js"
import { hover_piece_module } from "./hover_piece_module.js"
import { legal_check        } from "./legal_check.js"
import { play_mode_module   } from "./play_mode_module.js"
import { app_profile        } from "./app_profile.js"
import { preset_module      } from "./preset_module.js"
import { any_func_module    } from "./any_func_module.js"
import { api_module         } from "./api_module.js"
import { device_detect      } from "./device_detect.js"
import { app_chore          } from "./app_chore.js"
import { app_vector         } from "./app_vector.js"

export default {
  name: "ShogiPlayer",

  mixins: [
    app_chore,
    app_vector,
    app_focus,
    navi_module,
    cell_size_module,
    shortcut_module,
    edit_mode_module,
    foul_module,
    hover_piece_module,
    legal_check,
    play_mode_module,
    app_profile,
    preset_module,
    any_func_module,
    api_module,
    device_detect,
  ],

  props: {
    sp_board_dimension_w:                  { type: Number, default: 9,                       }, // 盤のセル数(W)
    sp_board_dimension_h:                  { type: Number, default: 9,                       }, // 盤のセル数(H)
    sp_layout:                             { type: String, default: "is_layout_horizontal",         }, // レイアウト is_(vertical|horizontal)
    sp_balloon:                            { type: String, default: "is_balloon_on",         }, // 対局者名の下に駒数スタイルと同じ背景色を置く
    sp_layer:                              { type: String, default: "is_layer_off",          }, // レイヤー確認(デバッグ用)
    sp_piece_variant:                         { type: String, default: "is_piece_variant_a",       }, // 駒の種類
    sp_bg_variant:                         { type: String, default: "is_bg_variant_none",    }, // 盤の種類
    sp_mobile_vertical:                    { type: String, default: "is_mobile_vertical_on", }, // モバイル時に自動的に縦配置に切り替える
    sp_location_behavior:                  { type: String, default: "is_location_flip_on",   }, // ☗☖をタップしたとき視点を切り替える
    sp_debug_mode:                         { type: String, default: "is_debug_mode_off",     }, // デバッグモード
    sp_sfen_show:                          { type: String, default: "is_sfen_show_off",      }, // SFENを下に表示する
    sp_overlay_nav:                        { type: String, default: "is_overlay_nav_off",    }, // view_mode のとき盤の左右で手数変更(falseなら駒を動かせる)
    sp_digit_label:                        { type: String, default: "is_digit_label_off",    }, // 座標の表示
    sp_digit_label_variant:                { type: String, default: "is_digit_label_variant_kanji",   }, // 座標の表記
    sp_stand_gravity:                       { type: String, default: "is_stand_gravity_bottom",  }, // 駒台の位置
    sp_player_name_direction:                    { type: String, default: "is_player_name_dir_horizontal",  }, // 名前の縦横書き切り替え(縦は横配置時のみ有効)
    sp_turn:                               { type: Number, default: -1,                      }, // 局面(手数)
    sp_run_mode:                           { type: String, default: "view_mode",             }, // モード
    sp_body:                               { type: String, default: null,                    }, // 棋譜 KIF or SFEN
    sp_player_info:                        { type: Object, default: null,                    }, // 対局者名と時間
    sp_comment:                            { type: String, default: "is_comment_on",         }, // KIFのコメントを表示する
    sp_board_cell_left_click_disabled:     { type: Boolean, default: false,                  }, // 盤上の左クリックの通常処理を無効化するか？

    // 一方向の $emit ではどうにもならない関数たち
    sp_board_piece_back_user_class_fn:     { type: Function, default: null,                  }, // セルのクラスを決める処理
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
      new_debug_mode: this.sp_debug_mode,
      new_run_mode: this.sp_run_mode,
      turn_edit_value: null,            // numberフィールドで current_turn を直接操作すると空にしたとき補正値 0 に変換されて使いづらいため別にする。あと -1 のときの挙動もわかりやすい。
      xcontainer: null,                 // 局面管理
      turn_edit_p: false,               // N手目編集中
      update_counter: 0,
      setting_modal_p: false,
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
      this.play_mode_setup_from("view_mode")
    }
    if (this.edit_p) {
      if (this.sp_preset_key) {
        this.xcontainer_setup_by_preset(this.sp_preset_key) // 駒箱に「玉」を乗せたいため
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
        this.play_mode_setup_from("view_mode")
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

    sp_run_mode(v) { this.new_run_mode = v            }, // 外から内への反映

    // 外からまたはダイアログから変更されたとき
    new_run_mode(new_val, old_val) {
      this.$emit("update:sp_run_mode", this.new_run_mode)

      if (this.view_p) {
        this.log("new_run_mode: view_mode")
        // alert(`復元:${this.view_mode_turn_offset_save}`)
        this.view_mode_xcontainer_update(this.view_mode_turn_offset_save)
        this.view_mode_turn_offset_save = null
      } else {
        // view_mode ではなくなったときの最初だけ保存しておく(xcontainerをまるごと保存しておく手もあるかも)
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

    //////////////////////////////////////////////////////////////////////////////// FIXME: これまとめて書けんのか？

    sp_debug_mode(v)  { this.new_debug_mode = v               }, // 外 -> 内
    new_debug_mode(v) { this.$emit("update:sp_debug_mode", v) }, // 内 -> 外

    ////////////////////////////////////////////////////////////////////////////////

    turn_offset_max(v) { this.$emit("update:turn_offset_max", v) },
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
      if (this.sp_flip_if_white) {
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

    log(...v) {
      if (this.debug_p || process.env.NODE_ENV === "development") {
        console.log(...v)
      }
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
          } else if (this.play_p && !this.sp_play_mode_only_own_piece_to_move) {
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

      if (this.sp_board_piece_back_user_class_fn) {
        list = _.concat(list, this.sp_board_piece_back_user_class_fn(place))
      }

      return list
    },

    delegate_to_xcontainer(method) {
      if (this.xcontainer) {
        return this.xcontainer[method]
      }
    },
  },

  computed: {
    location_black() { return Location.fetch("black")                    },
    location_white() { return Location.fetch("white")                    },
    view_p()         { return this.new_run_mode === "view_mode"          },
    play_p()         { return this.new_run_mode === "play_mode"          },
    edit_p()         { return this.new_run_mode === "edit_mode"          },
    debug_p()        { return this.new_debug_mode === "is_debug_mode_on" },

    turn_base()       { return this.delegate_to_xcontainer("turn_base")       }, // 表示する上での開始手数で普通は 0
    turn_offset()     { return this.delegate_to_xcontainer("turn_offset")     }, // 手数のオフセット
    display_turn()    { return this.delegate_to_xcontainer("display_turn")    }, // turn_base + turn_offset
    turn_offset_min() { return this.delegate_to_xcontainer("turn_offset_min") }, // 必ず 0
    turn_offset_max() { return this.delegate_to_xcontainer("turn_offset_max") }, // moves.length が 2 なら 2

    component_class() {
      return [
        `is_run_mode_${this.new_run_mode}`,
        this.new_debug_mode,
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
