<template lang="pug">
.shogi-player(:class="class_names")
  div(v-if="error_message")
    ErrorNotify
      p(slot="header") ERROR
      p {{error_message}}

  template(v-if="!mediator")
    i.fas.fa-spinner.fa-pulse

  div.edit_mode_controller(v-if="current_run_mode === 'edit_mode'")
    .edit_mode_controller_wrap
      b-dropdown(v-model="current_preset_key")
        //  button.button にすると prevent を指定する場所がないため button で外側の form が反応してしまう
        .button(slot="trigger")
          b-tooltip(label="初期配置")
            b-icon(icon="apps" size="is-small")
          //- b-icon(icon="menu-down")
        b-dropdown-item(v-for="record in preset_info_values" :value="record.key" :key="record.key")
          | {{record.name}}
      | &nbsp;
      button.button.yumincho(@click.stop.prevent="all_flip_v")
        b-tooltip(label="上下反転")
          b-icon(icon="pan-vertical" size="is-small")
      | &nbsp;
      button.button.yumincho(@click.stop.prevent="all_flip_h")
        b-tooltip(label="左右反転")
          b-icon(icon="pan-horizontal" size="is-small")
      | &nbsp;
      button.button.yumincho(@click.stop.prevent="init_location_toggle")
        b-tooltip(label="手番")
          | {{init_location.name}}

  template(v-if="mediator")
    .turn_edit_container
      div(v-if="current_run_mode === 'view_mode' || current_run_mode === 'play_mode'" class="turn_area")
        template(v-if="!turn_edit")
          span.turn_edit_text(@click.stop.prevent="turn_edit_run")
            template(v-if="current_run_mode === 'view_mode'")
              | {{mediator.current_turn_label(this.final_label)}}
            template(v-if="current_run_mode === 'play_mode'")
              | {{real_turn}}手目
        template(v-if="turn_edit")
          input.turn_edit_input(type="number" v-model.number="turn_edit_value" @blur="turn_edit = false" ref="turn_edit_input")

      span.is-pulled-right.modal_trigger_dots(@click.stop.prevent="setting_modal_p = true")
        b-icon(icon="dots-vertical" size="is-small")

      b-modal(:active.sync="setting_modal_p" has-modal-card)
        SettingModal(
          :run_mode.sync="current_run_mode"
          :kifu_source="kifu_source"
          @update:kifu_body="update_kifu_source"
          :play_mode_current_sfen="play_mode_current_sfen"
          :sp_data="$data"
        )

    //- 独自のフォントサイズを適用するのは基本このなかだけとする
    .board_container.font_size_base(ref="board_container_ref")
      .flippable(:class="{flip: current_flip}")
        PieceStand.flex_item(:location_key="'white'" :hold_pieces="mediator.realized_hold_pieces_of('white')")
        .flex_item.board_wrap
          template(v-if="overlay_navi")
            .overlay_navi.previous(@click.stop.prevent="navi_relative_move(-1, $event)")
            .overlay_navi.next(@click.stop.prevent="navi_relative_move(+1, $event)")
            .overlay_navi.flip_trigger_cell(@click.stop.prevent="board_flip_run")
          .board_outer
            table.board_inner
              tr(v-for="y in mediator.dimension")
                td(v-for="x in mediator.dimension" @click.stop.prevent="board_click([x - 1, y - 1], $event)" @click.stop.prevent.right="board_click_right([x - 1, y - 1], $event)")
                  .piece_back(:class="board_piece_back_class([x - 1, y - 1])")
                    .piece_fore(:class="mediator.board_piece_fore_class([x - 1, y - 1])")
                      | {{mediator.cell_view([x - 1, y - 1])}}
        .flex_item
          ul.piece_box(:class="piece_box_class" v-if="current_run_mode === 'edit_mode'" @click.stop.prevent="piece_box_other_click" @click.right.prevent="hold_cancel")
            li(v-for="[piece, count] in mediator.piece_box_realize()" @click.stop.prevent="piece_box_piece_click(piece, $event)" :class="{holding_p: piece_box_have_p(piece)}")
              .piece_back(:class="piece_box_piece_back_class(piece)")
                .piece_fore(:class="piece_box_piece_inner_class(piece)" v-text="piece.name")
              .piece_count(v-if="count >= 1" :class="`piece_count${count}`")
                | {{count}}
          //- 先手の駒台が上にくっつてしまうので防ぐため空のdivを入れる
          div(v-if="current_run_mode !== 'edit_mode'")
          PieceStand(:location_key="'black'" :hold_pieces="mediator.realized_hold_pieces_of('black')")
      //- cursor_elem はこの部分に入るので 1em のサイズを .font_size_base で指定したものを基準にできる

    div(v-if="current_run_mode === 'view_mode' || current_run_mode === 'play_mode'")
      .controller_group.buttons.has-addons.is-centered.is-paddingless(v-if="controller_show")
        button.button.first(    ref="first"    @click.stop.prevent="move_to_first"):             b-icon(icon="menu-left")
        button.button.previous( ref="previous" @click.stop.prevent="relative_move(-1, $event)"): b-icon(icon="chevron-left"  size="is-small")
        button.button.next(     ref="next"     @click.stop.prevent="relative_move(+1, $event)"): b-icon(icon="chevron-right" size="is-small")
        button.button.last(     ref="last"     @click.stop.prevent="move_to_last"):              b-icon(icon="menu-right")
        button.button.flip(                    @click.stop.prevent="board_flip_run"):            b-icon(icon="rotate-3d"     size="is-small")
      div(v-if="slider_show")
        input.turn_slider(type="range" :value="real_turn" @input="current_turn_set($event.target.value)" :min="turn_min" :max="turn_max" ref="turn_slider")

    //- http://kyokumen.jp/positions/lnsgkgsnl/1r5b1/ppppppppp/9/9/2P6/PP1PPPPPP/1B5R1/LNSGKGSNL%20w%20-
    .sfen_area.is-size-7.has-text-grey(v-if="sfen_show")
      slot(name="sfen_part" :sfen="mediator.to_sfen" :mediator="mediator")
        | {{mediator.to_sfen}}

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
import Mediator from "../mediator"
import Place from "../place"
import SfenParser from "../sfen_parser"
import KifParser from "../kif_parser"

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
    overlay_navi:   { type: Boolean, default: true,        },
    url_embed_turn: { type: Boolean, default: false,       },
    theme:          { type: String,  default: "real",      },
    size:           { type: String,  default: "default",   },
    bg_variant:     { type: String,  default: "a"          },
    piece_variant:  { type: String,  default: "a"          },
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
      view_mode_real_turn_save: null, // viewモードを抜けるとき現在の手数を記憶しておく
    }
  },

  created() {
    this.inside_custom_kifu = null

    /* eslint-disable */
    // TODO: Vuex の方で外からの引数(this.debug_mode)を参照できないのでこんなことになっている
    this.$store.state.current_debug_mode = this.debug_mode
    this.$store.state.current_theme      = this.theme
    this.$store.state.current_size       = this.size
    this.$store.state.current_bg_variant  = this.bg_variant
    this.$store.state.current_piece_variant = this.piece_variant
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
      // const before_turn_max = this.turn_max
      const before_sfen = this.mediator ? this.mediator.to_sfen : ""
      this.log(`before turn_max: ${this.turn_max}`)
      this.log(`before sfen: ${before_sfen}`)
      this.mediator_setup(this.start_turn)
      this.log(`after turn_max: ${this.turn_max}`)
      this.log(`after sfen: ${this.mediator.to_sfen}`)
      const sfen_change_p = (before_sfen !== this.mediator.to_sfen)
      if (this.current_run_mode === "view_mode") {
        if (sfen_change_p) {
          this.sound_call("piece_sound")
        }
      }
      if (this.current_run_mode === "play_mode") {
        this.play_mode_setup_from("view_mode")
        // 棋譜を反映された側は
        // 1. 相手が指したのか → 駒音だす
        // 2. 自分の指し手が正しい指し手だと判断された棋譜が返って反映されたのか → 駒音なし
        // この区別が付かない。なのでここで成らさない方がよい
        // this.sound_call("piece_sound")
        // ……と思ったが 1 は turn_max が変化したかどうかで判断できる。いや sfen を見ればわかる？ → そこまでする必要ない
        // if (before_turn_max !== this.turn_max) {
        if (sfen_change_p) {
          this.sound_call("piece_sound")
        }
      }
    },

    // ダイアログから変更されたとき
    current_run_mode(new_val, old_val) {
      this.$emit("update:run_mode", this.current_run_mode)

      if (this.current_run_mode === "view_mode") {
        this.log("current_run_mode: view_mode")
        // alert(`復元:${this.view_mode_real_turn_save}`)
        this.view_mode_mediator_update(this.view_mode_real_turn_save)
        this.view_mode_real_turn_save = null
      } else {
        // view_mode ではなくなったときの最初だけ保存しておく(mediatorをまるごと保存しておく手もあるかも)
        if (this.view_mode_real_turn_save === null) {
          this.view_mode_real_turn_save = this.real_turn
          // alert(`保存:${this.view_mode_real_turn_save}`)
        }
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

    // これはひどい。わけがわからない。
    // 外側に通知したいときは Vuex (../store/index.js) のなかでやってもだめ
    // 呼ばれているコンポーネントで書かないといけない
    /* eslint-disable */
    current_debug_mode(v) { this.$emit("update:debug_mode", v)              }, // 内から外への通知
    debug_mode(v)         { this.$store.commit("current_debug_mode_set", v) }, // 外から内への反映
    run_mode(v)           { this.current_run_mode = v                       }, // 外側から run_mode を変更されたとき

    current_theme(v)      { this.$emit("update:theme", v)                   }, // 中 -> 外
    theme(v)              { this.$store.state.current_theme = v             }, // 外 -> 中

    current_size(v)       { this.$emit("update:size", v)                    }, // 中 -> 外
    size(v)               { this.$store.state.current_size = v              }, // 外 -> 中

    current_bg_variant(v)  { this.$emit("update:bg_variant", v)               }, // 中 -> 外
    bg_variant(v)          { this.$store.state.current_bg_variant = v         }, // 外 -> 中

    current_piece_variant(v)  { this.$emit("update:piece_variant", v)               }, // 中 -> 外
    piece_variant(v)          { this.$store.state.current_piece_variant = v         }, // 外 -> 中
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
      // this.sound_call("piece_sound")
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

    board_piece_back_class(xy) {
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
        if (this.current_run_mode === "edit_mode" || (!this.cpu_location_p && this.mediator.current_location === soldier.location)) {
          if (!this.holding_p) {
            list.push("selectable_p")
          }
        }
      }

      // if (soldier) {
      //   list = _.concat(list, soldier.to_class_list)
      // }

      return list
    },

    update_kifu_source(v) {
      this.inside_custom_kifu = v
      this.$emit("update:kifu_body", v) // 子で emit されたイベントを親(自分)で拾い、同じ内容で親に向けて発火。何この複雑さ。
    }
  },

  computed: {
    class_names() {
      return [
        `theme-${this.current_theme}`,
        `size-${this.current_size}`,
        `bg_variant-${this.current_bg_variant}`,
        `piece_variant-${this.current_piece_variant}`,
        `run_mode-${this.current_run_mode}`,
        {debug_mode: this.current_debug_mode},
        {digit_show: this.digit_show},
      ]
    },

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
      "current_bg_variant",
      "current_piece_variant",
    ]),
  },
}
</script>

<style lang="sass">
</style>
