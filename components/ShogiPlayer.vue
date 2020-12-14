<template lang="pug">
.ShogiPlayer(:class="component_class")
  //- OverlayForDisable(:base="base")

  i.fas.fa-spinner.fa-pulse(v-if="!mediator")

  ShogiPlayerGround(:base="base" ref="ShogiPlayerGround")

  .buttons.are-small.is-centered(v-if="setting_button_show && false")
    b-button(icon-left="cog" @click="setting_modal_p = true")

  DebugBlock(:base="base")

  b-modal(:active.sync="setting_modal_p" has-modal-card v-if="mediator")
    SettingModal(:base="base")

  pre(v-if="debug_mode_p") {{$props}}
</template>

<script>
import _ from "lodash"
import Vue from 'vue'

// Library
import Mediator   from "./models/mediator.js"
import Place      from "./models/place.js"
import SfenParser from "./models/sfen_parser.js"
import KifParser  from "./models/kif_parser.js"
import Location   from "./models/location.js"

// components
import PieceBox          from "./PieceBox.vue"
import SettingModal      from "./SettingModal.vue"
import ErrorNotify       from "./ErrorNotify.vue"
import OverlayForDisable from "./OverlayForDisable.vue"
import ShogiPlayerGround from "./ShogiPlayerGround.vue"
import EditToolBox       from "./EditToolBox.vue"
import DebugBlock        from "./DebugBlock.vue"

// mixins modules
import navi_module      from "./navi_module.js"
import shortcut_module  from "./shortcut_module.js"
import edit_mode_module from "./edit_mode_module.js"
import play_mode_module from "./play_mode_module.js"
import sound_module     from "./sound_module.js"
import preset_module    from "./preset_module.js"
import any_func_module  from "./any_func_module.js"
import api_module       from "./api_module.js"

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
    sp_layout:       { type: String, default: "is_vertical",        },
    sp_hpos:         { type: String, default: "is_centered",        },
    sp_vpos:         { type: String, default: "is_vcentered",       },
    sp_fullheight:   { type: String, default: "is_fullheight_off",  },
    sp_text_visibility_up:       { type: String, default: "is_text_visibility_up_on",       },
    sp_layer:        { type: String, default: "is_layer_off",       },
    sp_blink:        { type: String, default: "is_blink_off",       },
    sp_pi_variant:   { type: String, default: "is_pi_variant_a",    },
    sp_bg_variant:   { type: String, default: "is_bg_variant_none", },
    sp_mobile_style: { type: String, default: "is_mobile_style",    },
    sp_location_behavior: { type: String, default: "is_location_flip_on",    },

    run_mode:        { type: String,  default: "view_mode",         },
    kifu_body:       { type: String,  default: null,                },
    start_turn:      { type: Number,  default: -1,                  },
    sfen_show:       { type: Boolean, default: false,               },
    overlay_navi:    { type: Boolean, default: true,                },
    debug_mode_p:    { type: Boolean, default: false,               },
    final_label:     { type: String,  default: null,                },
    player_info:     { type: Object,  default: null,                },

    board_piece_back_user_style:        { type: Function, default: place => { return {} }, }, // FIXME: add to README
    board_piece_back_user_class:        { type: Function, default: place => { return [] }, },
    board_cell_left_click_user_handle:  { type: Function, default: null, },
    board_cell_pointerdown_user_handle: { type: Function, default: null, },
    player_info_click_handle:           { type: Function, default: null, },
    location_click_handle:          { type: Function, default: null, },
  },

  components: {
    PieceBox,
    SettingModal,
    ErrorNotify,
    OverlayForDisable,
    EditToolBox,
    DebugBlock,
    ShogiPlayerGround,
  },

  data() {
    return {
      // new_sp_bg_variant:    this.sp_bg_variant,
      // new_sp_pi_variant: this.sp_pi_variant,
      new_debug_mode_p:    this.debug_mode_p,
      new_run_mode:      this.run_mode,

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
      this.mediator_setup(this.start_turn)
    }

    if (this.play_p) {
      this.mediator_setup(this.start_turn)
      this.play_mode_setup_from("view_mode")
    }

    if (this.edit_p) {
      if (this.preset_key) {
        this.mediator_setup_by_preset(this.preset_key) // 駒箱に「玉」を乗せたいため
      } else {
        this.mediator_setup_for_edit_mode()
      }
    }
  },

  watch: {
    turn_edit_value() {
      this.current_turn_set(this.turn_edit_value)
    },

    start_turn() {
      this.current_turn_set(this.start_turn)
    },

    kifu_source() {
      if (this.edit_p) {
        this.mediator_setup_for_edit_mode()
        return
      }

      // const before_turn_offset_max = this.turn_offset_max
      const before_sfen = this.mediator ? this.mediator.to_simple_sfen : ""
      this.log(`before turn_offset_max: ${this.turn_offset_max}`)
      this.log(`before sfen: ${before_sfen}`)
      this.mediator_setup(this.start_turn)
      this.log(`after turn_offset_max: ${this.turn_offset_max}`)
      this.log(`after sfen: ${this.mediator.to_simple_sfen}`)
      const sfen_change_p = (before_sfen !== this.mediator.to_simple_sfen)
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

    run_mode(v) { this.new_run_mode = v            }, // 外から内への反映

    // 外からまたはダイアログから変更されたとき
    new_run_mode(new_val, old_val) {
      this.$emit("update:run_mode", this.new_run_mode)

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

    debug_mode_p(v)        { this.new_debug_mode_p = v               }, // 外 -> 内
    new_debug_mode_p(v)    { this.$emit("update:debug_mode_p", v)    }, // 内 -> 外

    // sp_bg_variant(v)        { this.new_sp_bg_variant = v               }, // 外 -> 中
    // new_sp_bg_variant(v)    { this.$emit("update:sp_bg_variant", v)    }, // 中 -> 外
    //
    // sp_pi_variant(v)     { this.new_sp_pi_variant = v            }, // 外 -> 中
    // new_sp_pi_variant(v) { this.$emit("update:sp_pi_variant", v) }, // 中 -> 外

    // style_params:       { deep: true, handler(v) { this.new_style_params = {...STYLE_PARAMS_DEFAULT, ...v} }, },
    // new_style_params:   { deep: true, handler(v) { this.$emit("update:style_params", v) }, },

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
      this.mediator.current_turn = this.start_turn
      this.mediator.run()

      // 不足駒を駒箱に生成
      this.mediator.piece_box_piece_couns_adjust()

      this.flip_if_white_run()
    },

    flip_if_white_run() {
      if (this.flip_if_white) {
        this.new_flip = (this.mediator.data_source.location_base.key === "white")
      }
    },

    view_mode_mediator_update(turn) {
      this.mediator_setup(turn)
      // this.sound_play("piece_put")
      this.update_counter++
    },

    data_source_by(str) {
      let data_source = null
      if (/position/.test(str)) {
        data_source = new SfenParser()
      } else {
        data_source = new KifParser()
      }
      data_source.kifu_body = str
      data_source.parse()
      return data_source
    },

    turn_edit_handle() {
      this.turn_edit_p = true
      this.turn_edit_value = this.turn_offset
    },

    log(...v) {
      if (this.new_debug_mode_p) {
        console.log(...v)
      }
    },

    board_piece_control_class(xy) {
      const place = Place.fetch(xy)
      const soldier = this.mediator.board.lookup(place)
      let list = []

      list.push(place.to_css_class) // place_99

      if (this.holding_p) {
        list.push("hoverable_p")
      }

      if (!this.holding_p) {
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
        list.push("holding_p")
      } else if (soldier) {
        if (this.edit_p || (!this.cpu_location_p && this.mediator.current_location === soldier.location)) {
          if (!this.holding_p) {
            list.push("selectable_p")
          }
        }
      }

      // if (soldier) {
      //   list = _.concat(list, soldier.to_class_list)
      // }

      if (this.board_piece_back_user_class) {
        list = _.concat(list, this.board_piece_back_user_class(place))
      }

      return list
    },

    board_piece_back_style(xy) {
      if (this.board_piece_back_user_style) {
        return this.board_piece_back_user_style(Place.fetch(xy))
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

    // 本当は delegate したい。this.$watch を使えば動的になりそう？
    turn_base()       { if (this.mediator) { return this.mediator.turn_base       } }, // 表示する上での開始手数で普通は 0
    turn_offset()     { if (this.mediator) { return this.mediator.turn_offset     } }, // 手数のオフセット
    display_turn()    { if (this.mediator) { return this.mediator.display_turn    } }, // turn_base + turn_offset
    turn_offset_min() { if (this.mediator) { return this.mediator.turn_offset_min } }, // 必ず 0
    turn_offset_max() { if (this.mediator) { return this.mediator.turn_offset_max } }, // moves.length が 2 なら 2

    component_class() {
      return [
        ["run_mode", this.new_run_mode].join("-"),
        { debug_mode_p: this.base.new_debug_mode_p },
      ]
    },

    kifu_source() {
      return this.kifu_body || this.init_preset_sfen || "position startpos"
    },
  },
}
</script>

<style lang="sass">
@import "support.sass"
.ShogiPlayer
</style>
