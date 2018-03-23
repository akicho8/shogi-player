<template>
<div class="shogi-player" :class="[`theme-${theme}`, `size-${size}`, `variation-${variation}`, `run_mode-${run_mode2}`, {debug: debug_mode}]">
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

  <div v-if="run_mode2 === 'edit_mode'" class="edit_mode_controller">
    <div class="edit_mode_controller_wrap">
      <b-dropdown v-model="current_preset">
        <button class="button is-primary is-outlined" slot="trigger">
          <span>初期配置</span><b-icon icon="menu-down"></b-icon>
        </button>
        <b-dropdown-item v-for="record in PresetInfo.values" :value="record.key" :key="record.key">
          {{record.name}}
        </b-dropdown-item>
      </b-dropdown>

      <button class="button is-primary is-outlined" @click="all_flip">先後反転</button>

      <div style="display: inline-block; vertical-align: bottom">
        <span>手番</span>
        <b-radio v-model="init_location_key" native-value="black">☗</b-radio>
        <b-radio v-model="init_location_key" native-value="white">☖</b-radio>
      </div>
    </div>
  </div>

  <template v-if="mediator">
    <template v-if="run_mode2 === 'view_mode' || run_mode2 === 'play_mode'">
      <template v-if="!turn_edit">
        <span class="turn_edit_text" @click="turn_edit_run">
          <template v-if="run_mode2 === 'view_mode'">
            {{mediator.current_turn_label}}
          </template>
          <template v-if="run_mode2 === 'play_mode'">
            {{mediator.normalized_turn}}手目
          </template>
        </span>
      </template>
      <template v-if="turn_edit">
        <input type="number" v-model.number="turn_edit_value" @blur="turn_edit = false" ref="turn_edit_input" class="turn_edit_input">
      </template>
    </template>
    <span class="is-pulled-right modal_trigger_dots" @click="setting_modal_p = true"><b-icon icon="dots-vertical" size="is-small"></b-icon></span>
    <b-modal :active.sync="setting_modal_p" has-modal-card>
      <SettingModal :run_mode.sync="run_mode2"></SettingModal>
    </b-modal>
    <div class="board-container flippable" :class="{flip: flip}">
      <PieceStand class="flex-item" :location_key="'white'" :hold_pieces="mediator.realized_hold_pieces_of('white')" />
      <div class="flex-item board-wrap">
        <div class="overlay_navi previous" @click.stop="navi_relative_move(-1, $event)"></div>
        <div class="overlay_navi next"     @click.stop="navi_relative_move(+1, $event)"></div>
        <div class="overlay_navi flip_trigger_cell" @click="board_flip_run"></div>
        <div class="board_outer">
          <table class="board_inner">
            <tr v-for="y in mediator.dimension">
              <template v-for="x in mediator.dimension">
                <td class="td_cell" :class="cell_class([x - 1, y - 1])" @click="board_click([x - 1, y - 1], $event)" @click2="board_click_right([x - 1, y - 1], $event)" @mouseover="mouse_over_func">
                  <span class="span_cell" :class="mediator.cell_class([x - 1, y - 1])">
                    {{mediator.cell_view([x - 1, y - 1])}}
                  </span>
                </td>
              </template>
            </tr>
          </table>
        </div>
      </div>
      <div class="flex-item">
        <ul v-if="run_mode2 === 'edit_mode'" class="piece_box" @click="piece_box_other_click">
          <li v-for="[piece, count] in mediator.piece_box_realize()" @click.stop="piece_box_piece_click(piece, $event)" :class="{holding_p: piece_box_have_p(piece)}">
            <span :class="piece.css_class_list">{{piece.name}}</span>
            <span v-if='count >= 2' class="piece_count">{{count}}</span>
          </li>
        </ul>
        <div v-if="run_mode2 !== 'edit_mode'"></div><!-- 先手の駒台が上にくっつてしまうので防ぐため -->
        <PieceStand :location_key="'black'" :hold_pieces="mediator.realized_hold_pieces_of('black')" />
      </div>
    </div>

    <template v-if="run_mode2 === 'view_mode' || run_mode2 === 'play_mode'">
      <div v-if="controller_show" class="controller_block buttons has-addons is-centered">
        <button ref="first"    class="button first"    @click.stop="move_to_first"><b-icon icon="menu-left"></b-icon></button>
        <button ref="previous" class="button previous" @click.stop="relative_move(-1, $event)"><b-icon icon="chevron-left" size="is-small"></b-icon></button>
        <button ref="next"     class="button next"     @click.stop="relative_move(+1, $event)"><b-icon icon="chevron-right" size="is-small"></b-icon></button>
        <button ref="last"     class="button last"     @click.stop="move_to_last"><b-icon icon="menu-right"></b-icon></button>
        <button                class="button flip"     @click.stop="board_flip_run"><b-icon icon="rotate-3d" size="is-small"></b-icon></button>
      </div>
      <template v-if="slider_show">
        <input type="range" v-model.number="current_turn" :min="mediator.data_source.turn_min" :max="mediator.data_source.turn_max" ref="slider" class="slider" />
      </template>
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
        <tr><th>駒箱</th><td>{{mediator.piece_box_realize()}}</td></tr>
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
      <tr><th>current_preset</th><td>{{current_preset}}</td></tr>
      <tr><th>moves</th><td>{{moves}}</td></tr>
      <tr><th>init_sfen</th><td>{{init_sfen}}</td></tr>
      <tr><th>init_location_key</th><td>{{init_location_key}}</td></tr>
      <tr><th>play_mode_current_sfen</th><td>{{play_mode_current_sfen}}</td></tr>
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
import { Piece } from "../piece"
import { Soldier } from "../soldier"
import { PresetInfo } from "../preset_info"
import { Location } from "../location"
import { Sound } from '../sound'
import { SfenParser } from "../sfen_parser"
import { KifParser } from "../kif_parser"
import PieceStand from "./PieceStand"
import SettingModal from "./SettingModal"

import piece_sound_wav from "../assets/piece_sound.wav"
import flip_sound_wav from "../assets/flip_sound.wav"

// To use lodash's _ in the vue template
Object.defineProperty(Vue.prototype, '_', {value: _})

Object.defineProperty(Vue.prototype, 'PresetInfo', {value: PresetInfo})

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
    SettingModal,
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

      // -------------------------------------------------------------------------------- run_mode

      run_mode2: this.run_mode,

      // -------------------------------------------------------------------------------- play_mode
      place_from: null,          // 盤上ら動かそうとしているときの元位置
      have_piece: null,          // 駒台 or 駒箱から持った駒
      have_piece_location: null, // 駒台から持ったときだけ先後が入ている

      // -------------------------------------------------------------------------------- edit_mode
      current_preset: null,

      moves: [],
      init_sfen: null,
      init_location_key: "black",

      setting_modal_p: false,
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

    current_turn() {
      if (this.run_mode2 === "view_mode") {
        this.log("mediator_update from current_turn")
        this.mediator_update()
      }
      if (this.run_mode2 === "play_mode") {
        const data_source = new SfenParser()
        data_source.kifu_body = this.play_mode_current_sfen
        data_source.parse()

        this.mediator = new Mediator()
        this.mediator.data_source = data_source
        this.mediator.current_turn = this.current_turn
        this.mediator.run()
        this.current_turn = this.mediator.normalized_turn
      }
    },

    turn_edit_value() {
      this.current_turn = this.turn_edit_value
    },

    start_turn() {
      this.current_turn = this.start_turn
    },

    /* eslint-disable */
    kifu_url() { this.kifu_read() },
    kifu_body() { this.kifu_read() },
    loaded_kifu() {
      this.log("mediator_update from loaded_kifu")
      this.mediator_update()
    },
    polling_interval() { this.polling_interval_update() },
    /* eslint-enable */

    // -------------------------------------------------------------------------------- run_mode2
    run_mode(value) {
      this.run_mode2 = value    // TODO: プロパティ(引数)と内部変数の名前が共有できたないためこんな複雑になっている。どうにかならないのか？
    },

    run_mode2(new_val, old_val) {
      if (new_val === "view_mode") {
        this.mediator_update()
      }

      if (new_val === "play_mode") {
        if (old_val === "view_mode") {
          this.init_location_key = this.mediator.current_location.key
        }

        const sfen_serializer = this.mediator.sfen_serializer
        this.init_sfen = "position sfen " + sfen_serializer.to_board_sfen + " " + this.init_location_key[0] + " " + sfen_serializer.to_hold_pieces + " " + "1"
        this.moves = []

        const data_source = new SfenParser()
        data_source.kifu_body = this.init_sfen
        data_source.parse()

        this.mediator = new Mediator()
        this.mediator.data_source = data_source
        this.mediator.current_turn = 0
        this.mediator.run()

        this.current_turn = 0
      }

      if (this.run_mode2 === "edit_mode") {
        const data_source = new SfenParser()
        data_source.kifu_body = "position sfen " + this.mediator.to_sfen
        data_source.parse()

        this.mediator = new Mediator()
        this.mediator.data_source = data_source
        this.mediator.current_turn = 0
        this.mediator.run()

        this.current_turn = 0
        this.init_location_key = this.mediator.current_location.key
      }
    },

    current_preset(value) {
      if (value) {
        const preset_info = PresetInfo.fetch(value)
        const data_source = new SfenParser()
        data_source.kifu_body = preset_info.sfen
        data_source.parse()

        this.mediator = new Mediator()
        this.mediator.data_source = data_source
        preset_info.piece_box.forEach(([e, c]) => {
          this.mediator.piece_box_add(Piece.fetch(e), c)
        })
        this.mediator.run()
      }
    },

    // -------------------------------------------------------------------------------- sound

    sound_effect() {
      this.sound_load()
    },

    volume() {
      this.sound_load()
    },

    // -------------------------------------------------------------------------------- other

    // 引数は親が「変更」したときがトリガー
    debug_mode(v) {
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

    data_source_get() {
      let data_source = null
      if (this.run_mode2 === "edit_mode") {
        // data_source = new SfenParser()
        // data_source.kifu_body = "position sfen " + this.mediator.to_sfen
        // data_source.parse()
      } else if (this.run_mode2 === "play_mode") {
        // data_source = new SfenParser()
        // data_source.kifu_body = "position sfen " + this.mediator.to_sfen
        // data_source.parse()
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
      const data_source = this.data_source_get()
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
          this.sound_call("piece_sound")
        }

        this.update_counter++
      }
    },

    sound_call(key) {
      if (this.sound_effect) {
        const object = this[key]
        if (object) {
          object.play()
        }
      }
    },

    keyboard_operation(e) {
      if (this.debug_mode && false) {
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
      this.sound_call("flip_sound")
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

        if (!this.flip_sound) {
          this.flip_sound = new Sound(flip_sound_wav)
        }
        this.flip_sound.options["volume"] = this.volume
      }
    },

    log(v) {
      if (this.debug_mode) {
        console.log(v)
      }
    },

    // -------------------------------------------------------------------------------- play_mode

    mouse_over_func(e) {
      // / e.target.classList.add("active")
      this.log("mouse_over_func")
    },

    // 駒箱の駒を持ち上げている？
    piece_box_have_p(piece) {
      return _.isNil(this.have_piece_location) && this.have_piece === piece
    },

    piece_box_other_click(e) {
      console.log("駒箱クリック")

      if (_.isNil(this.have_piece_location) && this.have_piece) {
        console.log("持っているならキャンセル")
        this.state_reset()
        return
      }

      if (this.have_piece_location && this.have_piece) {
        console.log("駒台から駒箱に移動")
        this.mediator.piece_box_add(this.have_piece)
        this.mediator.hold_pieces_add(this.have_piece_location, this.have_piece, -1)
        this.state_reset()
        return
      }

      if (this.origin_soldier) {
        console.log("盤上の駒を駒箱に移動")
        this.mediator.piece_box_add(this.origin_soldier.piece)
        this.mediator.board.delete_at(this.origin_soldier.place)
        this.state_reset()
      }
    },

    piece_box_piece_click(piece, e) {
      console.log("駒箱の駒をクリック")

      // 自分の駒をすでに持っているならキャンセル
      if (_.isNil(this.have_piece_location) && this.have_piece) {
        console.log("持っているならキャンセル")
        this.state_reset()
        return
      }

      // 相手の持駒を自分の駒台に移動
      if (this.have_piece_location && this.have_piece) {
        console.log("相手の持駒を自分の駒台に移動")
        this.mediator.piece_box_add(this.have_piece)
        this.mediator.hold_pieces_add(this.have_piece_location, this.have_piece, -1)
        this.state_reset()
        return
      }

      // // 相手の持駒を持とうとしたときは無効
      // if (this.run_mode2 === "play_mode" && !this.holding_p && location.key !== this.mediator.current_location.key) {
      //   console.log("相手の持駒を持とうとしたときは無効")
      //   return
      // }

      // 盤上の駒を駒台に置く
      if (this.origin_soldier) {
        console.log("盤上の駒を駒箱に移動")
        this.mediator.piece_box_add(this.origin_soldier.piece)
        this.mediator.board.delete_at(this.origin_soldier.place)
        this.state_reset()
        // console.log("盤上の駒を駒台に置く")
        // this.board_soldir_to_hold_pieces(location)
        return
      }

      // // クリックしたけど持駒がない
      // if (this.mediator.piece_boxs_count(location, piece) <= 0) {
      //   console.log("クリックしたけど持駒がない")
      //   return
      // }

      console.log("駒台の駒を持つ")
      this.have_piece = piece
      this.have_piece_location = null
      // e.target.classList.add("active")
      // this.from_dom = e.target
    },

    // 駒台クリック
    piece_stand_click(location, e) {
      console.log("駒台クリック")

      if (this.have_piece_location === location && this.have_piece) {
        console.log("持っているならキャンセル")
        this.state_reset()
        return
      }

      if (this.have_piece_location !== location && this.have_piece) {
        this.opponent_hold_pieces_move_to_my_hold_pieces(location)
        return
      }

      if (this.origin_soldier) {
        console.log("盤上の駒を駒台に置く")
        this.board_soldir_to_hold_pieces(location)
      }
    },

    // 駒台の駒をクリック
    piece_stand_piece_click(location, piece, e) {
      console.log("駒台の駒をクリック")

      // 自分の駒をすでに持っているならキャンセル
      if (this.have_piece_location === location && this.have_piece) {
        console.log("持っているならキャンセル")
        this.state_reset()
        return
      }

      // 相手の持駒を自分の駒台に移動
      if (this.have_piece_location !== location && this.have_piece) {
        this.opponent_hold_pieces_move_to_my_hold_pieces(location)
        return
      }

      // 相手の持駒を持とうとしたときは無効
      if (this.run_mode2 === "play_mode" && !this.holding_p && location !== this.mediator.current_location) {
        console.log("相手の持駒を持とうとしたときは無効")
        return
      }

      // 盤上の駒を駒台に置く
      if (this.origin_soldier) {
        console.log("盤上の駒を駒台に置く")
        this.board_soldir_to_hold_pieces(location)
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
      console.log(`shiftKey: ${e.shiftKey}`)

      const place = Place.fetch(xy)
      const soldier = this.mediator.board.lookup(place)

      // -------------------------------------------------------------------------------- Validation

      // 自分の手番で相手の駒を持ち上げようとしたので無効とする
      if (this.run_mode2 === "play_mode" && !this.holding_p && soldier && soldier.location !== this.mediator.current_location) {
        console.log("自分の手番で相手の駒を持ち上げようとしたので無効とする")
        return
      }

      // 持たずに何もないところをクリックしたので無効とする
      if (!this.holding_p && !soldier) {
        console.log("持たずに何もないところをクリックしたので無効とする")
        return
      }

      // 自分の駒の上に駒を重ねようとしたので状況キャンセル
      if (this.run_mode2 === "play_mode" && this.put_on_my_piece_p(soldier)) {
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

      const shift_key = e.shiftKey | e.ctrlKey | e.altKey | e.metaKey
      console.log(`holding_p: ${this.holding_p}`)
      if (!this.holding_p && soldier && shift_key) {
        console.log("盤上の駒を裏返す")
        this.mediator.board.place_on(soldier.piece_transform)
        this.mediator_update()
        return
      }

      // 盤上の駒を持ちあげる
      if (!this.holding_p) {
        console.log("盤上の駒を持ちあげる")
        this.soldier_hold(place, e)
        return
      }

      // 盤上から移動
      if (this.place_from) {
        console.log("盤上から移動")
        if (soldier) {
          this.mediator.hold_pieces_add(this.origin_soldier.location, soldier.piece) // 相手の駒があれば取る
          // this.$forceUpdate()
        }

        const new_soldier = new Soldier({
          piece: this.origin_soldier.piece,
          place: place,
          promoted: this.origin_soldier.promoted,
          location: this.origin_soldier.location,
        })

        if (this.run_mode2 === "play_mode" && (new_soldier.promotable_p || this.origin_soldier.promotable_p)) { // 入って成る or 出て成る
          // 元が成ってないとき
          this.$dialog.confirm({
            message: '成りますか？',
            confirmText: '成',
            cancelText: '不成',
            onConfirm: () => {
              new_soldier.promoted = true
            },
            // 最後に必ず呼ばれる
            onCancel: () => {
              this.moves.push(this.origin_soldier.place.to_sfen + place.to_sfen + (new_soldier.promoted ? "+" : "")) // 7g7f+
              this.mediator.board.place_on(new_soldier)                             // 置く
              this.mediator.board.delete_at(this.place_from)
              this.state_reset()
              this.turn_next()
            },
          })
        } else {
          if (this.run_mode2 === "play_mode") {
            this.moves.push(this.origin_soldier.place.to_sfen + place.to_sfen) // 7g7f
          }
          this.mediator.board.place_on(new_soldier)                          // 置く
          this.mediator.board.delete_at(this.place_from)
          this.state_reset()
          this.turn_next()
        }

        return
      }

      // 持駒を置く
      if (this.have_piece) {
        console.log("持駒を置く")
        const soldier = new Soldier({
          piece: this.have_piece,
          place: place,
          promoted: false,
          location: this.have_piece_location || Location.fetch("black"), // this.mediator.current_location,
        })
        this.piece_sub()
        this.mediator.board.place_on(soldier) // 置く
        this.moves.push(soldier.piece.key + "*" + place.to_sfen) // P*7g
        this.state_reset()
        this.turn_next()
        return
      }

      throw new Error("must not happen")
    },

    board_click_right(xy, e) {
      console.log("盤を右クリック")

      // const place = Place.fetch(xy)
      // const soldier = this.mediator.board_place_at(place)
      //
      // if (soldier) {
      //   this.mediator.place_on(soldier.piece_transform)
      //   this.state_reset()
      //   return
      // }

      throw new Error("must not happen")
    },

    // 盤上の駒を駒台に置く
    board_soldir_to_hold_pieces(location) {
      this.mediator.hold_pieces_add(location, this.origin_soldier.piece) // 駒台にプラス
      this.mediator.board.delete_at(this.origin_soldier.place)
      this.state_reset()
    },

    opponent_hold_pieces_move_to_my_hold_pieces(location) {
      console.log("相手の持駒を自分の駒台に移動")
      this.piece_sub()
      this.mediator.hold_pieces_add(location, this.have_piece)
      this.state_reset()
    },

    // 駒を減らす
    piece_sub() {
      if (this.have_piece_location) {
        this.mediator.hold_pieces_add(this.have_piece_location, this.have_piece, -1)
      } else {
        this.mediator.piece_box_add(this.have_piece, -1)
      }
    },

    // 自分の駒の上に重ねた？
    put_on_my_piece_p(soldier) {
      return this.holding_p && soldier && soldier.location === this.mediator.current_location
    },

    // 盤面の駒を持ち上げる
    soldier_hold(place, e) {
      this.place_from = place
    },

    state_reset() {
      console.log("state_reset")
      this.place_from = null // 持ってない状態にする
      this.have_piece = null
      this.have_piece_location = null
    },

    turn_next() {
      this.sound_call("piece_sound")

      if (this.run_mode2 === "play_mode") {
        const data_source = new SfenParser()
        data_source.kifu_body = this.play_mode_current_sfen
        data_source.parse()

        this.mediator = new Mediator()
        this.mediator.data_source = data_source
        this.mediator.current_turn = -1
        this.mediator.run()
        this.current_turn = this.mediator.normalized_turn

        // this.current_turn = -1
      }

      // console.log("turn_next")

      // this.mediator_update()
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
      const soldier = this.mediator.board.lookup(place)
      const list = this.mediator.cell_class(xy)
      if (_.isEqual(this.place_from, place)) {
        list.push("holding_p")
      } else {
        if (soldier) {
          if (this.mediator.current_location === soldier.location || this.run_mode2 === "edit_mode") {
            list.push("selectable_p")
          }
        }
      }
      return list
    },

    all_flip() {
      // 盤面反転
      this.mediator.board = this.mediator.board.flip

      // 持駒反転
      this.mediator.hold_pieces = _.reduce(Location.values, (a, e) => {
        a[e.key] = this.mediator.hold_pieces[e.flip.key]
        return a
      }, {})
    },

    modal_trigger_dots_click() {
    },

    cardModal() {
      this.$modal.open({
        parent: this,
        component: SettingModal,
        hasModalCard: true, // If your modal content has a .modal-card as root, add this prop or the card might break on mobile
      })
    }
  },

  computed: {
    // 移動元の駒
    origin_soldier() {
      if (this.place_from) {
        return this.mediator.board.lookup(this.place_from)
      }
    },

    // 駒を持ち上げている状態？
    holding_p() {
      return !_.isNil(this.place_from) || !_.isNil(this.have_piece)
    },

    //
    play_mode_current_sfen() {
      return this.init_sfen + " moves " + this.moves.join(" ")
    },
  },
}
</script>

<style lang="sass">
</style>
