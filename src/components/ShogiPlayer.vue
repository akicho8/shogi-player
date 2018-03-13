<template>
<div class="shogi-player" :class="[`theme-${theme}`, `size-${size}`, `variation-${variation}`, `run_mode-${run_mode}`, {debug: debug_mode}]">
  <!-- template v-if だとテスト時のみエラーになるため div v-show 形式にしている -->
  <!-- これは jest の問題なのか vue の不具合なのかわからない  -->
  <div v-show="error_message !== null">
    <div class="columns">
      <div class="column">
        <article class="message is-danger has-text-left">
          <div class="message-header">
            <p>ERROR</p>
          </div>
          <div class="message-body">
            <p>{{error_message}}></p>
          </div>
        </article>
      </div>
    </div>
  </div>

  <template v-if="!mediator">
    <i class="fas fa-spinner fa-pulse"></i>
  </template>

  <template v-if="debug_mode">
    ({{update_counter}})
  </template>

  <template v-if="mediator">
    <template v-if="run_mode === 'view_mode'">
      <div class="turn_editor">
        <template v-if="!turn_edit">
          <span class="turn_edit_text" @click="turn_edit_run">{{mediator.current_turn_label}}</span>
        </template>
        <template v-if="turn_edit">
          <input type="number" v-model.number="turn_edit_value" @blur="turn_edit = false" ref="turn_edit_input" class="turn_edit_input">
        </template>
      </div>
    </template>
    <div class="board-container flippable" :class="{flip: flip}">
      <PieceStand :location_key="'white'" :hold_pieces="mediator.realized_hold_pieces_of('white')" />
      <div class="flex-item board-wrap">
        <div class="overlay_navi previous" @click.stop="navi_relative_move(-1, $event)"></div>
        <div class="overlay_navi next"     @click.stop="navi_relative_move(+1, $event)"></div>
        <div class="overlay_navi flip_trigger_cell" @click="board_flip_run"></div>
        <div class="board-outer">
          <table class="board-inner">
            <tr v-for="y in mediator.dimension">
              <template v-for="x in mediator.dimension">
                <td class="td_cell" :class="cell_class([x - 1, y - 1])" @click="board_click([x - 1, y - 1], $event)" @mouseover="mouse_over_func">
                  <span class="span_cell" :class="mediator.cell_class([x - 1, y - 1])">
                    {{mediator.cell_view([x - 1, y - 1])}}
                  </span>
                </td>
              </template>
            </tr>
          </table>
        </div>
      </div>
      <PieceStand :location_key="'black'" :hold_pieces="mediator.realized_hold_pieces_of('black')" />
    </div>
    <template v-if="controller_show">
      <div class="controller_block buttons has-addons is-centered">
        <button ref="first"    class="button first"      @click.stop="move_to_first">|◀</button>
        <button ref="previous" class="button previous"   @click.stop="relative_move(-1, $event)">◀</button>
        <button ref="next"     class="button next"       @click.stop="relative_move(+1, $event)">▶</button>
        <button ref="last"     class="button last"       @click.stop="move_to_last">▶|</button>
        <button                class="button flip" @click.stop="board_flip_run">{{flip ? '&#x21BA;' : '&#x21BB;'}}</button>
      </div>
    </template>

    <template v-if="slider_show">
      <input type="range" v-model.number="current_turn" :min="mediator.data_source.turn_min" :max="mediator.data_source.turn_max" ref="slider" class="slider" />
    </template>

    <div class="sfen_area is-size-7 has-text-grey" v-if="sfen_show">
      {{mediator.to_sfen}}
    </div>

    <div class="comment_area" v-if="mediator.data_source.comments_pack">
      <template v-if="mediator.current_comments">
        <div class="columns">
          <div class="column is-three-fifths is-offset-one-fifth">
            <div class="content has-text-left">
              <template v-for="str in mediator.current_comments">
                <template v-if="_.isEmpty(str)">
                  <br>
                </template>
                <template v-else>
                  <div v-html="mediator.auto_link(str)"></div>
                </template>
              </template>
            </div>
          </div>
        </div>
      </template>
    </div>
  </template>

  <template v-if="debug_mode">
    <table class="table is-bordered is-narrow">
      <tr><th>update_counter</th><td>{{update_counter}}</td></tr>
      <tr><th>place_from</th><td>{{place_from}}</td></tr>
      <tr><th>have_piece</th><td>{{have_piece}}</td></tr>
      <template v-if="mediator">
        <tr><th>持駒</th><td>{{mediator.hold_pieces}}</td></tr>
        <tr><th>次の手番</th><td>{{mediator.current_location.key}}</td></tr>
        <tr><th>SFEN</th><td>{{mediator.to_sfen}}</td></tr>
        <tr><th>正規化手番</th><td>{{mediator.normalized_turn}}</td></tr>
      </template>
      <tr><th>start_turn</th><td>{{start_turn}}</td></tr>
      <tr><th>current_turn</th><td>{{current_turn}}</td></tr>
      <tr><th>read_counter</th><td>{{read_counter}}</td></tr>
      <tr><th>interval_id</th><td>{{interval_id}}</td></tr>
      <tr><th>key_event_capture</th><td>{{key_event_capture}}</td></tr>
    </table>
  </template>
</div>
</template>

<script>
import _ from "lodash"
import axios from "axios"
import Vue from 'vue'

import { Mediator } from "../mediator"
import { Place } from "../place"
import { Soldier } from "../soldier"
// import { Location } from "../location"
import { Sound } from '../sound'
import { SfenParser } from "../sfen_parser"
import { KifParser } from "../kif_parser"
import { FooParser } from "../foo_parser"
import PieceStand from "./PieceStand"

import piece_sound_wav from "../assets/piece_sound.wav"

// To use lodash's _ in the vue template
Object.defineProperty(Vue.prototype, '_', {value: _})

// Log content type
// localStorage.debug = "axios"
require('axios-debug-log')({
  request: function (debug, config) {
    debug('Request with ' + config.headers['content-type'])
  },
  response: function (debug, response) {
    debug(
      'Response with ' + response.headers['content-type'],
      'from ' + response.config.url
    )
  },
  error: function (debug, error) {
    // Read https://www.npmjs.com/package/axios#handling-errors for more info
    debug('Boom', error)
  }
})

const logger_debug = require('debug')('debug')

/* eslint-disable no-new */
export default {
  name: 'ShogiPlayer',

  /* eslint-disable */
  props: {
    run_mode:           { type: String,  default: "view_mode",         },
    kifu_body:          { type: String,  default: "position startpos", },
    kifu_url:           { type: String,  default: null,                },
    polling_interval:   { type: Number,  default: 0,                   },
    last_after_polling: { type: Boolean, default: true,                },
    start_turn:         { type: Number,  default: -1,                  },
    slider_show:        { type: Boolean, default: false,               },
    controller_show:    { type: Boolean, default: false,               },
    sfen_show:          { type: Boolean, default: false,               },
    sound_effect:       { type: Boolean, default: false,               },
    volume:             { type: Number,  default: 0.5,                 },
    key_event_capture:  { type: Boolean, default: false                },
    url_embed_turn:     { type: Boolean, default: false,               },
    shift_key_mag:      { type: Number,  default: 10,                  },
    system_key_mag:     { type: Number,  default: 50,                  },
    theme:              { type: String,  default: "simple",            },
    size:               { type: String,  default: "default",           },
    variation:          { type: String,  default: "a"                  },
    debug_mode:         { type: Boolean, default: false,               }, // process.env.NODE_ENV !== 'production'
  },
  /* eslint-enable */

  components: {
    PieceStand,
  },

  data() {
    return {
      current_turn: this.start_turn, // N手目
      turn_edit_value: null,         // numberフィールドで current_turn を直接操作すると空にしたとき補正値 0 に変換されて使いづらいため別にする。あと -1 のときの挙動もわかりやすい。
      mediator: null,                // 局面管理
      flip: false,                   // 反転したか？
      turn_edit: false,              // N手目編集中
      env: process.env.NODE_ENV,
      loaded_kifu: null,
      error_message: null,
      piece_sound: null,
      interval_id: null,
      read_counter: 0,
      update_counter: 0,

      // -------------------------------------------------------------------------------- human_mode
      place_from: null,
      from_dom: null,
      // board: {
      //   "0,0": {piece: "香", location_key: "white"},
      //   "1,0": {piece: "桂", location_key: "white"},
      //   "2,0": {piece: "銀", location_key: "white"},
      //   "3,0": {piece: "金", location_key: "white"},
      //   "4,0": {piece: "玉", location_key: "white"},
      //   "5,0": {piece: "金", location_key: "white"},
      //   "6,0": {piece: "銀", location_key: "white"},
      //   "7,0": {piece: "桂", location_key: "white"},
      //   "8,0": {piece: "香", location_key: "white"},
      //   "1,1": {piece: "飛", location_key: "white"},
      //   "7,1": {piece: "角", location_key: "white"},
      //   "0,2": {piece: "歩", location_key: "white"},
      //   "1,2": {piece: "歩", location_key: "white"},
      //   "2,2": {piece: "歩", location_key: "white"},
      //   "3,2": {piece: "歩", location_key: "white"},
      //   "4,2": {piece: "歩", location_key: "white"},
      //   "5,2": {piece: "歩", location_key: "white"},
      //   "6,2": {piece: "歩", location_key: "white"},
      //   "7,2": {piece: "歩", location_key: "white"},
      //   "8,2": {piece: "歩", location_key: "white"},
      //
      //   "0,8": {piece: "香", location_key: "black"},
      //   "1,8": {piece: "桂", location_key: "black"},
      //   "2,8": {piece: "銀", location_key: "black"},
      //   "3,8": {piece: "金", location_key: "black"},
      //   "4,8": {piece: "玉", location_key: "black"},
      //   "5,8": {piece: "金", location_key: "black"},
      //   "6,8": {piece: "銀", location_key: "black"},
      //   "7,8": {piece: "桂", location_key: "black"},
      //   "8,8": {piece: "香", location_key: "black"},
      //   "7,7": {piece: "飛", location_key: "black"},
      //   "1,7": {piece: "角", location_key: "black"},
      //   "0,6": {piece: "歩", location_key: "black"},
      //   "1,6": {piece: "歩", location_key: "black"},
      //   "2,6": {piece: "歩", location_key: "black"},
      //   "3,6": {piece: "歩", location_key: "black"},
      //   "4,6": {piece: "歩", location_key: "black"},
      //   "5,6": {piece: "歩", location_key: "black"},
      //   "6,6": {piece: "歩", location_key: "black"},
      //   "7,6": {piece: "歩", location_key: "black"},
      //   "8,6": {piece: "歩", location_key: "black"},
      // },
      // hold_pieces: {
      //   black: {"歩": 2},
      //   white: {"歩": 2},
      // },
      have_piece: null,
      // turn_counter: 0,
      rules: {
        rule1: false, // 自分の手番で相手の駒を持ち上げれないようにする
        rule2: false, // 自分の駒の上に重ねたら持ってない状態にする(falseなら自分の駒で自分の駒をとれる)
        rule3: false, // 駒台をクリックしたとき持っているならキャンセル
      },

      // -------------------------------------------------------------------------------- edit_mode
      foo_parser: new FooParser(),
    }
  },

  created() {
    this.kifu_read()
    this.polling_interval_update()
    this.sound_load()
    document.addEventListener("keydown", this.keyboard_operation)
  },

  watch: {
    // -------------------------------------------------------------------------------- basic

    current_turn: function () {
      this.log("mediator_update from current_turn")
      this.mediator_update()
    },
    turn_edit_value: function () {
      this.current_turn = this.turn_edit_value
    },
    start_turn: function () {
      this.current_turn = this.start_turn
    },

    /* eslint-disable */
    kifu_url:  function () { this.kifu_read() },
    kifu_body: function () { this.kifu_read() },
    loaded_kifu: function () {
      this.log("mediator_update from loaded_kifu")
      this.mediator_update()
    },
    polling_interval: function () { this.polling_interval_update() },
    /* eslint-enable */

    // -------------------------------------------------------------------------------- run_mode

    run_mode: function () {
      if (this.run_mode === "edit_mode") {
        // this.turn_edit_value = 0
        // this.current_turn = 0
        this.mediator.current_turn = 0
        this.mediator_update()
      }
    },

    // -------------------------------------------------------------------------------- sound

    sound_effect: function () {
      this.sound_load()
    },

    volume: function () {
      this.sound_load()
    },

    // -------------------------------------------------------------------------------- other

    // 引数は親が「変更」したときがトリガー
    debug_mode: function (v) {
      this.log(`watch debug_mode: ${v}`)
    },
  },

  methods: {
    kifu_read(polling = false) {
      if (this.kifu_url) {
        this.__kifu_read_from_url()
      } else {
        this.loaded_kifu = this.kifu_body
      }
      this.read_counter++
      this.log(`read_counter: ${this.read_counter}`)
      if (false) {
        if (polling) {
          if (this.last_after_polling) {
            this.current_turn = -1
          }
        } else {
          if (this.start_turn === -1) {
            this.current_turn = -1
          }
        }
      } else {
        // 最後の局面を指定して欲しいときは棋譜を更新しても最後に移動する
        if (this.start_turn === -1) {
          this.current_turn = -1
        }
      }
    },

    __kifu_read_from_url() {
      const url = this.kifu_url
      // const url = "http://localhost:3000/wr/hanairobiyori-ispt-20171104_220810.kif"
      // const url = "http://tk2-221-20341.vs.sakura.ne.jp/shogi/wr/ureshino_friend-doglong-20180122_213544.kif"
      const accessd_at = Date.now().toString()
      axios.get(url, {
        params: {"accessd_at": accessd_at},
        responseType: "text",
        timeout: 1000 * 3,
        headers: {"X-SHOGI-PLAYER-TIMESTAMP": accessd_at},
      }).then((response) => {
        this.loaded_kifu = response.data
        this.error_message = null
      }).catch((error) => {
        if (error.response) {
          logger_debug("error.response.data: %o", error.response.data)
          logger_debug("error.response.status: %o", error.response.status)
          logger_debug("error.response.statusText: %o", error.response.statusText)
          logger_debug("error.response.headers: %o", error.response.headers)
        } else if (error.request) {
          logger_debug("error.request: %o", error.request)
        } else {
          logger_debug('error.message: %o', error.message)
        }
        logger_debug('error.config: %o', error.config)

        this.loaded_kifu = null
        this.error_message = error.message
      })
    },

    polling_interval_update() {
      if (this.polling_interval >= 1) {
        if (this.interval_id) {
          this.log(`clearInterval(${this.interval_id})`)
          clearInterval(this.interval_id)
        }
        this.interval_id = setInterval(() => { this.kifu_read(true) }, this.polling_interval * 1000)
        this.log(`setInterval() => ${this.interval_id}`)
      }
    },

    parser_build() {
      let data_source = null
      if (this.run_mode === "edit_mode") {
        data_source = new FooParser()
        data_source.kifu_body = "position sfen " + this.mediator.to_sfen
        data_source.parse()
      } else {
        if (this.loaded_kifu) {
          let str = this.loaded_kifu || "position startpos"
          if (/position/.test(str)) {
            data_source = new SfenParser()
          } else {
            data_source = new KifParser()
          }
          data_source.kifu_body = str
          data_source.parse()
        }
      }
      return data_source
    },

    mediator_update() {
      const data_source = this.parser_build()
      if (data_source) {
        this.mediator = new Mediator()
        this.mediator.data_source = data_source
        this.mediator.current_turn = this.current_turn
        this.mediator.run()
        this.current_turn = this.mediator.normalized_turn
        if (this.url_embed_turn) {
          document.location.hash = this.current_turn
        }
        if (this.update_counter >= 1) {
          if (this.sound_effect) {
            if (this.piece_sound) {
              this.piece_sound.play()
            }
          }
        }
        this.update_counter++
      }
    },

    keyboard_operation(e) {
      if (this.debug_mode) {
        this.log(document.activeElement)
        this.log(e.shiftKey, e.ctrlKey, e.altKey, e.metaKey)
        this.log("e", e)
        this.log("key", e.key)
        this.log("code", e.code)
        this.log("repeat", e.repeat)
      }

      if (!this.key_event_capture) {
        return
      }

      const dom = document.activeElement
      const controllers = [this.$refs.first, this.$refs.previous, this.$refs.next, this.$refs.last] // FIXME: 指定DOMの下にあるか？の方法がわかればもっと簡潔になる
      if (!(dom === undefined || dom.tagName === "BODY" || _.includes(controllers, dom))) {
        return
      }

      if (e.code === "Backspace" || e.code === "ArrowUp" || e.code === "ArrowLeft" || e.key === "k" || e.key === "p" || e.key === "b") {
        this.relative_move(-1, e)
        e.preventDefault()
      }

      if (e.code === "Space" || e.code === "Enter" || e.code === "ArrowDown" || e.code === "ArrowRight" || e.key === "j" || e.key === "n" || e.key === "f") {
        this.relative_move(1, e)
        e.preventDefault()
      }

      // let gap = null
      // let force_value = null
      //
      // if (e.code === "Space" || e.code === "Enter" || e.code === "ArrowDown" || e.code === "ArrowRight" || e.key === "j" || e.key === "n" || e.key === "f") {
      //   gap = 1
      // }
      // if (e.code === "Backspace" || e.code === "ArrowUp" || e.code === "ArrowLeft" || e.key === "k" || e.key === "p" || e.key === "b") {
      //   gap = -1
      // }
      // if (e.key === "PageUp") {
      //   gap = -10
      // }
      // if (e.key === "PageDown") {
      //   gap = 10
      // }
      // if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) {
      //   if (gap) {
      //     gap *= 10
      //   }
      // }
      // if (e.key === "[" || e.key === "Home" || e.code === "Escape") {
      //   force_value = this.mediator.data_source.turn_min
      // }
      // if (e.key === "]" || e.key === "End") {
      //   force_value = this.mediator.data_source.turn_max
      // }
      //
      // let v = this.current_turn
      // if (gap !== null) {
      //   v += gap
      // }
      // if (force_value !== null) {
      //   v = force_value
      // }
      // if (v < this.mediator.data_source.turn_min) {
      //   v = this.mediator.data_source.turn_min
      // }
      // if (this.mediator.data_source.turn_max < v) {
      //   v = this.mediator.data_source.turn_max
      // }
      // this.current_turn = v
      //
      // if (gap !== null || force_value !== null) {
      //   e.preventDefault()
      // }
    },

    navi_relative_move(v, event) {
      this.relative_move(v * this.flip_sign(), event)
    },

    relative_move(v, event = null) {
      if (event) {
        if (event.shiftKey) {
          if (this.shift_key_mag) {
            v *= this.shift_key_mag
          }
        }
        if (event.ctrlKey || event.altKey || event.metaKey) {
          if (this.system_key_mag) {
            v *= this.system_key_mag
          }
        }
      }

      const new_val = this.mediator.turn_clamp(this.current_turn + v)
      if (this.current_turn !== new_val) {
        this.current_turn = new_val
      }
      if (this.debug_mode) {
        this.log([v, new_val, this.current_turn])
      }
      if (!this.focus_to("slider")) {
        if (v > 0) {
          this.focus_to("next")
        } else {
          this.focus_to("previous")
        }
      }
    },

    move_to_first() {
      this.current_turn = this.mediator.data_source.turn_min
      this.focus_to("slider") || this.focus_to("first")
    },

    move_to_last() {
      this.current_turn = this.mediator.data_source.turn_max
      this.focus_to("slider") || this.focus_to("last")
    },

    focus_to(key) {
      const el = this.$refs[key]
      if (el) {
        el.focus()
        return true
      }
      return false
    },

    board_flip_run() {
      this.flip = !this.flip
      this.focus_to("slider")
    },

    turn_edit_run() {
      this.turn_edit = true
      this.turn_edit_value = this.current_turn
      this.$nextTick(() => this.$refs.turn_edit_input.focus())
    },

    flip_sign() {
      return this.flip ? -1 : 1
    },

    sound_load() {
      if (this.sound_effect) {
        if (!this.piece_sound) {
          this.piece_sound = new Sound(piece_sound_wav)
        }
        this.piece_sound.options["volume"] = this.volume
      }
    },

    log(v) {
      if (this.debug_mode) {
        console.log(v)
      }
    },

    // -------------------------------------------------------------------------------- human_mode

    mouse_over_func(e) {
      // / e.target.classList.add("active")
      this.log("mouse_over_func")
    },

    // 駒台クリック
    hold_piece_click2(location, e) {
      console.log("駒台クリック")

      if (this.have_piece_location === location && this.have_piece) {
        console.log("持っているならキャンセル")
        this.state_reset()
        return
      }

      if (this.have_piece_location !== location && this.have_piece) {
        this.komo_idou(location)
        return
      }

      if (this.origin_soldier) {
        console.log("盤上の駒を駒台に置く")
        this.koma_oku(location)
      }
    },

    // 駒台の駒をクリック
    hold_piece_click(location, piece, e) {
      console.log("駒台の駒をクリック")

      // 自分の駒をすでに持っているならキャンセル
      if (this.have_piece_location === location && this.have_piece) {
        console.log("持っているならキャンセル")
        this.state_reset()
        return
      }

      // 相手の持駒を自分の駒台に移動
      if (this.have_piece_location !== location && this.have_piece) {
        this.komo_idou(location)
        return
      }

      // 相手の持駒を持とうとしたときは無効
      if (this.run_mode === "human_mode" && !this.motteiru && location.key !== this.mediator.current_location.key) {
        console.log("相手の持駒を持とうとしたときは無効")
        return
      }

      // 盤上の駒を駒台に置く
      if (this.origin_soldier) {
        console.log("盤上の駒を駒台に置く")
        this.koma_oku(location)
        return
      }

      // クリックしたけど持駒がない
      if (this.mediator.hold_pieces_count(location, piece) <= 0) {
        console.log("クリックしたけど持駒がない")
        return
      }

      console.log("駒台の駒を持つ")
      this.have_piece = piece
      this.have_piece_location = location
      // e.target.classList.add("active")
      // this.from_dom = e.target
    },

    // 盤をクリック
    board_click(xy, e) {
      this.log("board_click")

      const place = Place.fetch(xy)
      const soldier = this.mediator.board_place_at(place)

      // -------------------------------------------------------------------------------- Validation

      // 自分の手番で相手の駒を持ち上げようとしたので無効とする
      if (this.run_mode === "human_mode" && !this.motteiru && soldier && soldier.location.key !== this.mediator.current_location.key) {
        console.log("自分の手番で相手の駒を持ち上げようとしたので無効とする")
        return
      }

      // 持たずに何もないところをクリックしたので無効とする
      if (!this.motteiru && !soldier) {
        console.log("持たずに何もないところをクリックしたので無効とする")
        return
      }

      // 自分の駒の上に駒を重ねようとしたので状況キャンセル
      if (this.run_mode === "human_mode" && this.jibun_no_komanoueni_kasaneta(soldier)) {
        console.log("自分の駒の上に駒を重ねようとしたので状況キャンセル")
        this.state_reset()
        return
      }

      // 盤上の駒を持って同じ位置に戻したので状況キャンセル
      if (_.isEqual(this.place_from, place)) {
        console.log("盤上の駒を持って同じ位置に戻したので状況キャンセル")
        this.state_reset()
        return
      }

      // --------------------------------------------------------------------------------

      // 盤上の駒を持ちあげる
      if (!this.motteiru) {
        console.log("盤上の駒を持ちあげる")
        this.soldier_hold(place, e)
        return
      }

      // 置く
      if (this.place_from) {
        console.log("置く")
        if (soldier) {
          this.mediator.hold_pieces_add(this.mediator.current_location, soldier.piece, 1) // 相手の駒があれば取る
          // this.$forceUpdate()
        }
        const new_soldier = new Soldier({
          piece: this.origin_soldier.piece,
          place: place,
          promoted: this.origin_soldier.promoted,
          location: this.origin_soldier.location,
        })
        this.mediator.board.set(new_soldier.place.key, new_soldier)                             // 置く
        this.mediator.board_safe_delete_on(this.place_from)
        this.state_reset()
        this.turn_next()
        return
      }

      // 持駒を置く
      if (this.have_piece) {
        console.log("持駒を置く")
        const soldier = new Soldier({
          piece: this.have_piece,
          place: place,
          promoted: false,
          location: this.mediator.current_location,
        })
        this.mediator.hold_pieces_add(this.mediator.current_location, soldier.piece, -1) // 持駒を減らす
        this.mediator.board.set(soldier.place.key, soldier) // 置く
        this.state_reset()
        this.turn_next()
        return
      }

      throw new Error("must not happen")
    },

    // 盤上の駒を駒台に置く
    koma_oku(location) {
      this.mediator.hold_pieces_add(location, this.origin_soldier.piece, 1) // 駒台にプラス
      this.mediator.board_safe_delete_on(this.origin_soldier.place)
      this.state_reset()
    },

    komo_idou(location) {
      console.log("相手の持駒を自分の駒台に移動")
      this.mediator.hold_pieces_add(location, this.have_piece, 1)
      this.mediator.hold_pieces_add(this.have_piece_location, this.have_piece, -1)
      this.state_reset()
    },

    // // 持駒減らす
    // mochigoma_herasu() {
    //   const count = (this.hold_pieces[this.mediator.current_location.key][this.have_piece] || 0) - 1
    //   Vue.set(this.hold_pieces[this.mediator.current_location.key], this.have_piece, count)
    //   if (count <= 0) {
    //     delete this.hold_pieces[this.mediator.current_location.key][this.have_piece] // 要素が0になるキーは削除
    //   }
    // },

    // 自分の駒の上に重ねた？
    jibun_no_komanoueni_kasaneta(soldier) {
      return this.motteiru && soldier && soldier.location.key === this.mediator.current_location.key
    },

    // // 駒があれば持駒とする
    // piece_capture(soldier) {
    //   soldier_capture
    //
    //   if (soldier) {
    //     const count = (this.hold_pieces[soldier.location.key][soldier.piece] || 0) + 1
    //     Vue.set(this.hold_pieces[this.mediator.current_location.key], soldier.piece, count)
    //   }
    // },

    // 盤面の駒を持ち上げる
    soldier_hold(place, e) {
      this.place_from = place
    },

    state_reset() {
      this.place_from = null // 持ってない状態にする
      this.have_piece = null
      this.have_piece_location = null
    },

    turn_next() {
      // console.log("turn_next")

      // this.current_turn += 1
      // this.turn_counter += 1

      this.mediator_update()
    },

    location_flip(location_key) {
      return location_key === "black" ? "white" : "black"
    },

    // mediator.current_location.key_diff(diff) {
    //   const locatios = ["black", "white"]
    //   return locatios[(this.turn_counter + diff) % locatios.length]
    // },

    cell_class(xy) {
      const place = Place.fetch(xy)
      const list = this.mediator.cell_class(xy)
      if (_.isEqual(this.place_from, place)) {
        list.push("active")
      }
      return list
    },
  },

  computed: {
    // mediator.current_location.key() {
    //   return this.mediator.current_location.key_diff(0)
    // },

    // opponent_player() {
    //   return this.mediator.current_location.key_diff(1)
    // },

    origin_soldier() {
      let soldier = null
      if (this.place_from) {
        soldier = this.mediator.board_place_at(this.place_from)
      }
      return soldier
    },

    motteiru() {
      return !_.isNil(this.place_from) || !_.isNil(this.have_piece)
    },
  },
}
</script>

<style lang="sass">
</style>
