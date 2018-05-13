<template lang="pug">
.shogi-player(:class="[`theme-${current_theme}`, `size-${current_size}`, `variation-${current_variation}`, `run_mode-${current_run_mode}`, {debug_mode: current_debug_mode}, {digit_show: digit_show}]")
  div(v-if="error_message")
    ErrorNotify
      p(slot="header") ERROR
      p {{error_message}}

  template(v-if="!mediator")
    i.fas.fa-spinner.fa-pulse

  div.edit_mode_controller(v-if="current_run_mode === 'edit_mode'")
    .edit_mode_controller_wrap
        b-dropdown(v-model="current_preset_key")
          button.button(slot="trigger")
            span 初期配置
            b-icon(icon="menu-down")
          b-dropdown-item(v-for="record in preset_info_values" :value="record.key" :key="record.key")
            | {{record.name}}
        | &nbsp;
        button.button(@click="all_flip") 先後反転
        | &nbsp;
        button.button(@click="init_location_toggle") 手番{{init_location.name}}

  template(v-if="mediator")
    .turn_div
      div(v-if="current_run_mode === 'view_mode' || current_run_mode === 'play_mode'" class="turn_area")
        template(v-if="!turn_edit")
          span.turn_edit_text(@click="turn_edit_run")
            template(v-if="current_run_mode === 'view_mode'")
              | {{mediator.current_turn_label(this.final_label)}}
            template(v-if="current_run_mode === 'play_mode'")
              | {{real_turn}}手目
        template(v-if="turn_edit")
          input.turn_edit_input(type="number" v-model.number="turn_edit_value" @blur="turn_edit = false" ref="turn_edit_input")
      span.is-pulled-right.modal_trigger_dots(@click="setting_modal_p = true")
        b-icon(icon="dots-vertical" size="is-small")
      b-modal(:active.sync="setting_modal_p" has-modal-card)
        SettingModal(
          :run_mode.sync="current_run_mode"
          :kifu_source="kifu_source"
          @update:kifu_body="update_kifu_source"
        )

    .board_container.flippable(:class="{flip: current_flip}")
      PieceStand.flex_item(:location_key="'white'" :hold_pieces="mediator.realized_hold_pieces_of('white')")
      .flex_item.board_wrap
        .overlay_navi.previous(@click.stop="navi_relative_move(-1, $event)")
        .overlay_navi.next(@click.stop="navi_relative_move(+1, $event)")
        .overlay_navi.flip_trigger_cell(@click="board_flip_run")
        .board_outer
          table.board_inner
            tr(v-for="y in mediator.dimension")
              template(v-for="x in mediator.dimension")
                td.piece_outer(:class="piece_outer_class([x - 1, y - 1])" @click="board_click([x - 1, y - 1], $event)" @click.right.prevent="board_click_right([x - 1, y - 1], $event)")
                  .piece_inner_wrap
                    span.piece_inner(:class="mediator.board_piece_inner_class([x - 1, y - 1])")
                      | {{mediator.cell_view([x - 1, y - 1])}}
      .flex_item
        ul.piece_box(v-if="current_run_mode === 'edit_mode'" @click="piece_box_other_click" @click.right.prevent="hold_cancel")
          li(v-for="[piece, count] in mediator.piece_box_realize()" @click.stop="piece_box_piece_click(piece, $event)" :class="{holding_p: piece_box_have_p(piece)}")
            .piece_outer(:class="piece_box_piece_outer_class(piece)")
              .piece_inner_wrap
                span.piece_inner(:class="piece_box_piece_inner_class(piece)") {{piece.name}}
            span.piece_count(v-if='count >= 2') {{count}}
        //- 先手の駒台が上にくっつてしまうので防ぐため空のdivを入れる
        div(v-if="current_run_mode !== 'edit_mode'")
        PieceStand(:location_key="'black'" :hold_pieces="mediator.realized_hold_pieces_of('black')")

    div(v-if="current_run_mode === 'view_mode' || current_run_mode === 'play_mode'")
      div(v-if="controller_show" class="controller_block buttons has-addons is-centered is-paddingless")
        button.button.first(    ref="first"    @click.stop="move_to_first"):             b-icon(icon="menu-left")
        button.button.previous( ref="previous" @click.stop="relative_move(-1, $event)"): b-icon(icon="chevron-left"  size="is-small")
        button.button.next(     ref="next"     @click.stop="relative_move(+1, $event)"): b-icon(icon="chevron-right" size="is-small")
        button.button.last(     ref="last"     @click.stop="move_to_last"):              b-icon(icon="menu-right")
        button.button.flip(                    @click.stop="board_flip_run"):            b-icon(icon="rotate-3d"     size="is-small")
      div(v-if="slider_show")
        input.turn_slider(type="range" :value="real_turn" @input="current_turn_set($event.target.value)" :min="turn_min" :max="turn_max" ref="turn_slider")

    .sfen_area.is-size-7.has-text-grey(v-if="sfen_show") {{mediator.to_sfen}}

    CommentArea(:comments_pack="mediator.data_source.comments_pack" :current_comments="mediator.current_comments")

  div.debug_table(v-if="current_debug_mode")
    table.table.is-bordered.is-striped.is-narrow.is-hoverable.is-fullwidth
      tbody
        tr: <th>現在のモード(current_run_mode)</th><td>{{current_run_mode}}</td>
        tr: <th>update_counter</th><td>{{update_counter}}</td>
        tr: <th>移動元座標(place_from)</th><td>{{place_from}}</td>
        tr: <th>駒台・駒箱から移動中の駒(have_piece)</th><td>{{have_piece}}</td>
        template(v-if="mediator")
          tr: <th>駒箱</th><td>{{mediator.piece_box_realize()}}</td>
          tr: <th>持駒</th><td>{{mediator.hold_pieces}}</td>
          tr: <th>次の手番</th><td>{{mediator.current_location.key}}</td>
          tr: <th>現局面のSFEN</th><td>{{mediator.to_sfen}}</td>
          tr: <th>正規化手番</th><td>{{real_turn}}</td>
        tr: <th>開始局面番号(start_turn)</th><td>{{start_turn}}</td>
        tr: <th>初期配置(current_preset_key)</th><td>{{current_preset_key}}</td>
        tr: <th>play_modeでの指し手(moves)</th><td>{{moves}}</td>
        tr: <th>play_modeの開始局面(init_sfen)</th><td>{{init_sfen}}</td>
        tr: <th>編集モード時の手番(init_location_key)</th><td>{{init_location_key}}</td>
        tr: <th>play_modeでのSFEN(play_mode_current_sfen)</th><td>{{play_mode_current_sfen}}</td>
        tr: <th>key_event_capture</th><td>{{key_event_capture}}</td>
        tr: <th>interval_id</th><td>{{interval_id}}</td>
</template>

<script>
import _ from "lodash"
import Vue from 'vue'

import { mapState } from 'vuex'

// Store
import store from "../store/index.js"

// My Library
import { Mediator } from "../mediator"
import { Place } from "../place"
import { SfenParser } from "../sfen_parser"
import { KifParser } from "../kif_parser"

// components
import PieceStand from "./PieceStand"
import SettingModal from "./SettingModal"
import ErrorNotify from "./ErrorNotify"
import CommentArea from "./CommentArea"

// mixins modules
import navi_module from "./navi_module.js"
import edit_mode_module from "./edit_mode_module.js"
import play_mode_module from "./play_mode_module.js"
import sound_module from "./sound_module.js"
import preset_module from "./preset_module.js"
import polling_module from "./polling_module.js"

// To use lodash's _ in the vue template
Object.defineProperty(Vue.prototype, '_', {value: _})

// Log content type
// localStorage.debug = "axios"
require('axios-debug-log')({
  request(debug, config) {
    debug('Request with ' + config.headers['content-type'])
  },
  response(debug, response) {
    debug(
      'Response with ' + response.headers['content-type'],
      'from ' + response.config.url
    )
  },
  error(debug, error) {
    // Read https://www.npmjs.com/package/axios#handling-errors for more info
    debug('Boom', error)
  }
})

/* eslint-disable no-new */
export default {
  name: 'ShogiPlayer',

  store: store,

  mixins: [
    // ここで直接 require("./xxx.js"), とは書けないので注意
    navi_module,
    edit_mode_module,
    play_mode_module,
    sound_module,
    preset_module,
    polling_module,
  ],

  /* eslint-disable */
  props: {
    run_mode:       { type: String,  default: "view_mode", },
    kifu_body:      { type: String,  default: null,        },
    start_turn:     { type: Number,  default: -1,          },
    sfen_show:      { type: Boolean, default: false,       },
    url_embed_turn: { type: Boolean, default: false,       },
    theme:          { type: String,  default: "real",      },
    size:           { type: String,  default: "default",   },
    variation:      { type: String,  default: "a"          },
    debug_mode:     { type: Boolean, default: false,       }, // process.env.NODE_ENV !== 'production'
    digit_show:     { type: Boolean, default: false,       },
    final_label:    { type: String,  default: null,        },
  },
  /* eslint-enable */

  components: {
    PieceStand,
    SettingModal,
    ErrorNotify,
    CommentArea,
  },

  data() {
    return {
      current_run_mode: this.run_mode,
      turn_edit_value: null,    // numberフィールドで current_turn を直接操作すると空にしたとき補正値 0 に変換されて使いづらいため別にする。あと -1 のときの挙動もわかりやすい。
      mediator: null,           // 局面管理
      turn_edit: false,         // N手目編集中
      error_message: null,
      update_counter: 0,
      setting_modal_p: false,
      inside_custom_kifu: null, // 設定ダイアログで変更されたときに入る
      env: process.env.NODE_ENV,
    }
  },

  created() {
    this.inside_custom_kifu = null

    /* eslint-disable */
    // TODO: Vuex の方で外からの引数(this.debug_mode)を参照できないのでこんなことになっている
    this.$store.state.current_debug_mode = this.debug_mode
    this.$store.state.current_theme      = this.theme
    this.$store.state.current_size       = this.size
    this.$store.state.current_variation  = this.variation
    /* eslint-enable */

    if (this.current_run_mode === "view_mode") {
      if (this.kifu_url) {
        this.axios_call()
        this.polling_interval_update()
      } else {
        this.mediator_setup(this.start_turn)
      }
    }

    if (this.current_run_mode === "play_mode") {
      this.mediator_setup(this.start_turn)
      this.play_mode_setup_from("view_mode")
    }

    if (this.current_run_mode === "edit_mode") {
      if (this.preset_key) {
        this.mediator_setup_by_preset(this.preset_key) // 駒箱に「玉」を乗せたいため
      } else {
        this.mediator_setup(this.start_turn)
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
      const before_turn_max = this.turn_max
      console.log(`turn_max: ${this.turn_max}`)
      this.mediator_setup(this.start_turn)
      console.log(`turn_max: ${this.turn_max}`)
      if (this.current_run_mode === "play_mode") {
        this.play_mode_setup_from("view_mode")
        // 棋譜を反映された側は
        // 1. 相手が指したのか → 駒音だす
        // 2. 自分の指し手が正しい指し手だと判断された棋譜が返って反映されたのか → 駒音なし
        // この区別が付かない。なのでここで成らさない方がよい
        // this.sound_call("piece_sound")
        // ……と思ったが 1 は turn_max が変化したかどうかで判断できる。いや sfen を見ればわかる？ → そこまでする必要ない
        if (before_turn_max !== this.turn_max) {
          this.sound_call("piece_sound")
        }
      }
    },

    // ダイアログから変更されたとき
    current_run_mode(new_val, old_val) {
      this.$emit("update:run_mode", this.current_run_mode)

      if (this.current_run_mode === "view_mode") {
        this.log("current_run_mode: view_mode")
        this.view_mode_mediator_update(this.real_turn)
      }

      if (this.current_run_mode === "play_mode") {
        this.play_mode_setup_from(old_val)
      }

      if (this.current_run_mode === "edit_mode") {
        this.log("current_run_mode: edit_mode")
        const position_sfen = this.mediator.to_position_sfen // mediator を作り直す前に現状の局面を吐き出しておく

        this.mediator = new Mediator()
        this.mediator.data_source = this.data_source_by(position_sfen)
        this.mediator.current_turn = 0
        this.mediator.run()

        this.init_location_key = this.mediator.current_location.key
      }
    },

    // 外側に通知したいときは Vuex (../store/index.js) のなかでやってもだめ
    // 呼ばれているコンポーネントで書かないといけない
    // こういうときのために Vuex はあるのではないのかという疑問はある
    /* eslint-disable */
    current_debug_mode(v) { this.$emit("update:debug_mode", v)             }, // 内から外への通知
    debug_mode(v)        { this.$store.commit("current_debug_mode_set", v) }, // 外から内への反映
    run_mode(v)          { this.current_run_mode = v                          }, // 外側から run_mode を変更されたとき

    current_theme(v)     { this.$emit("update:theme", v)                  }, // 中 -> 外
    theme(v)             { this.$store.state.current_theme = v            }, // 外 -> 中

    current_size(v)     { this.$emit("update:size", v)                  }, // 中 -> 外
    size(v)             { this.$store.state.current_size = v            }, // 外 -> 中

    current_variation(v)     { this.$emit("update:variation", v)                  }, // 中 -> 外
    variation(v)             { this.$store.state.current_variation = v            }, // 外 -> 中
    /* eslint-enable */
  },

  methods: {
    mediator_setup(turn) {
      this.mediator = new Mediator()
      this.mediator.data_source = this.data_source_by(this.kifu_source)
      this.mediator.current_turn = turn
      this.mediator.run()
    },

    view_mode_mediator_update(turn) {
      this.mediator_setup(turn)
      if (this.url_embed_turn) {
        document.location.hash = this.real_turn
      }
      this.sound_call("piece_sound")
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

    turn_edit_run() {
      this.turn_edit = true
      this.turn_edit_value = this.real_turn
      this.$nextTick(() => this.$refs.turn_edit_input.focus())
    },

    log(v) {
      if (this.current_debug_mode) {
        console.log(v)
      }
    },

    piece_outer_class(xy) {
      const place = Place.fetch(xy)
      const soldier = this.mediator.board.lookup(place)
      const list = []

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

      if (_.isEqual(this.place_from, place)) {
        list.push("holding_p")
      } else if (soldier) {
        if (this.current_run_mode === "edit_mode" || (!this.cpu_location_p && this.mediator.current_location === soldier.location)) {
          list.push("selectable_p")
        }
      }

      return list
    },

    update_kifu_source(v) {
      this.inside_custom_kifu = v
      this.$emit("update:kifu_body", v) // 子で emit されたイベントを親(自分)で拾い、同じ内容で親に向けて発火。何この複雑さ。
    }
  },

  computed: {
    kifu_source() {
      // 設定で棋譜を更新したのが入った inside_custom_kifu が最優先。つまりもう更新はできなくなる。いいのか？
      return this.inside_custom_kifu || this.kifu_body_from_url || this.kifu_body || this.init_preset_sfen || "position startpos"
    },

    // 本当は delegate したいシリーズ
    /* eslint-disable */
    real_turn() { return this.mediator.real_turn },
    turn_min()  { return this.mediator.turn_min  },
    turn_max()  { return this.mediator.turn_max  },
    /* eslint-enable */

    // mapState({
    // // アロー関数は、コードをとても簡潔にできます！
    // count: state => state.count,
    // // 文字列を渡すことは、`state => state.count` と同じです
    // countAlias: 'count',
    // // `this` からローカルステートを参照するときは、通常の関数を使わなければいけません
    // countPlusLocalState (state) {
    //   return state.count + this.localCount
    // }
    ...mapState({
    }),
    ...mapState([
      "current_debug_mode",
      "current_theme",
      "current_size",
      "current_variation",
    ]),
  },
}
</script>

<style lang="sass">
</style>
