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
        <button class="button" slot="trigger">
          <span>初期配置</span><b-icon icon="menu-down"></b-icon>
        </button>
        <b-dropdown-item v-for="record in preset_info_values" :value="record.key" :key="record.key">
          {{record.name}}
        </b-dropdown-item>
      </b-dropdown>
      <button class="button" @click="all_flip">先後反転</button>
      <button class="button" @click="init_location_toggle">手番{{init_location.name}}</button>
    </div>
  </div>

  <template v-if="mediator">
    <div class="turn_div">
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
    </div>
    <div class="board_container flippable" :class="{flip: flip}">
      <PieceStand class="flex_item" :location_key="'white'" :hold_pieces="mediator.realized_hold_pieces_of('white')" />
      <div class="flex_item board_wrap">
        <div class="overlay_navi previous" @click.stop="navi_relative_move(-1, $event)"></div>
        <div class="overlay_navi next"     @click.stop="navi_relative_move(+1, $event)"></div>
        <div class="overlay_navi flip_trigger_cell" @click="board_flip_run"></div>
        <div class="board_outer">
          <table class="board_inner">
            <tr v-for="y in mediator.dimension">
              <template v-for="x in mediator.dimension">
                <td class="piece_outer" :class="piece_outer_class([x - 1, y - 1])" @click="board_click([x - 1, y - 1], $event)" @click.right.prevent="board_click_right([x - 1, y - 1], $event)">
                  <span class="piece_inner" :class="mediator.board_piece_inner_class([x - 1, y - 1])">
                    {{mediator.cell_view([x - 1, y - 1])}}
                  </span>
                </td>
              </template>
            </tr>
          </table>
        </div>
      </div>
      <div class="flex_item">
        <ul v-if="run_mode2 === 'edit_mode'" class="piece_box" @click="piece_box_other_click">
          <li v-for="[piece, count] in mediator.piece_box_realize()" @click.stop="piece_box_piece_click(piece, $event)" :class="{holding_p: piece_box_have_p(piece)}">
            <div class="piece_outer" :class="piece_box_piece_outer_class(piece)">
              <span class="piece_inner" :class="piece_box_piece_inner_class(piece)">{{piece.name}}</span>
            </div>
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
          <div class="column"><!-- is-three-fifths is-offset-one-fifth -->
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
      <tr><th>run_mode2</th><td>{{run_mode2}}</td></tr>
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
import { SfenParser } from "../sfen_parser"
import { KifParser } from "../kif_parser"
import PieceStand from "./PieceStand"
import SettingModal from "./SettingModal"

// modules
import navi_module from "./navi_module.js"
import edit_mode_module from "./edit_mode_module.js"
import sound_module from "./sound_module.js"
import preset_module from "./preset_module.js"

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

const logger_debug = require('debug')('debug')

/* eslint-disable no-new */
export default {
  name: 'ShogiPlayer',

  mixins: [
    // ここで直接 require("./xxx.js"), とは書けないので注意
    navi_module,
    edit_mode_module,
    sound_module,
    preset_module,
  ],

  /* eslint-disable */
  props: {
    run_mode:           { type: String,  default: "view_mode",         },
    kifu_body:          { type: String,  default: null,                },
    kifu_url:           { type: String,  default: null,                },
    polling_interval:   { type: Number,  default: 0,                   },
    last_after_polling: { type: Boolean, default: true,                },
    start_turn:         { type: Number,  default: -1,                  },
    sfen_show:          { type: Boolean, default: false,               },
    url_embed_turn:     { type: Boolean, default: false,               },
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
      run_mode2: this.run_mode,
      current_turn: this.start_turn, // N手目
      turn_edit_value: null,         // numberフィールドで current_turn を直接操作すると空にしたとき補正値 0 に変換されて使いづらいため別にする。あと -1 のときの挙動もわかりやすい。
      mediator: null,                // 局面管理
      flip: false,                   // 反転したか？
      turn_edit: false,              // N手目編集中
      env: process.env.NODE_ENV,
      loaded_kifu: null,
      error_message: null,
      interval_id: null,
      read_counter: 0,
      update_counter: 0,
      setting_modal_p: false,
    }
  },

  created() {
    if (this.run_mode2 === "view_mode") {
      this.kifu_read()
      this.polling_interval_update()
    }
    if (this.run_mode2 === "play_mode") {
      this.play_mode_setup("view_mode")
    }
    if (this.run_mode2 === "edit_mode") {
      if (this.init_preset_key) {
        this.mediator_setup_by_preset(this.init_preset_key) // 駒箱に「玉」を乗せたいため
      } else {
        this.mediator_setup_if_blank()
      }
    }
  },

  watch: {
    // -------------------------------------------------------------------------------- basic

    current_turn() {
      if (this.run_mode2 === "view_mode") {
        this.log("view_mode_mediator_update from current_turn")
        this.view_mode_mediator_update()
      }
      if (this.run_mode2 === "play_mode") {
        this.mediator = new Mediator()
        this.mediator.data_source = this.data_source_by(this.play_mode_current_sfen)
        this.mediator.current_turn = this.current_turn
        this.mediator.run()
        this.current_turn = this.mediator.normalized_turn

        this.sound_call("piece_sound")
      }
    },

    turn_edit_value() {
      this.current_turn = this.turn_edit_value
    },

    start_turn() {
      this.current_turn = this.start_turn
    },

    /* eslint-disable */
    kifu_url()         { this.kifu_read()                 },
    kifu_body()        { this.kifu_read()                 },
    loaded_kifu()      { this.view_mode_mediator_update() },
    polling_interval() { this.polling_interval_update()   },
    /* eslint-enable */

    // -------------------------------------------------------------------------------- run_mode2
    run_mode(value) {
      this.run_mode2 = value    // TODO: プロパティ(引数)と内部変数の名前が共有できたないためこんな複雑になっている。どうにかならないのか？
    },

    run_mode2(new_val, old_val) {
      if (new_val === "view_mode") {
        console.log("run_mode2: view_mode")
        this.view_mode_mediator_update()
      }

      if (new_val === "play_mode") {
        this.play_mode_setup(old_val)
      }

      if (this.run_mode2 === "edit_mode") {
        console.log("run_mode2: edit_mode")
        this.mediator_setup_if_blank()

        this.mediator = new Mediator()
        this.mediator.data_source = this.data_source_by(this.mediator.to_position_sfen)
        this.mediator.current_turn = 0
        this.mediator.run()

        this.current_turn = 0
        this.init_location_key = this.mediator.current_location.key
      }
    },

    // -------------------------------------------------------------------------------- other

    // 引数は親が「変更」したときがトリガー
    debug_mode(v) {
      this.log(`watch debug_mode: ${v}`)
    },

    // virtual_piece_exist(v) {
    //   if (!_.isNil(v)) {
    //     this.virtual_piece_destroy()
    //   }
    // },
  },

  methods: {
    kifu_read(polling = false) {
      if (this.kifu_url) {
        this.__kifu_read_from_url()
      } else {
        this.loaded_kifu = this.init_kifu_body
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
          this.interval_id = null
        }
        this.interval_id = setInterval(() => { this.kifu_read(true) }, this.polling_interval * 1000)
        this.log(`setInterval() => ${this.interval_id}`)
      }
    },

    mediator_setup_if_blank() {
      if (_.isNil(this.mediator)) {
        this.mediator = new Mediator()
        this.mediator.data_source = this.data_source_by(this.init_kifu_body)
        this.mediator.current_turn = this.current_turn
        this.mediator.run()
        this.current_turn = this.mediator.normalized_turn
      }
    },

    view_mode_mediator_update() {
      if (this.loaded_kifu) {
        this.mediator = new Mediator()
        this.mediator.data_source = this.data_source_by(this.loaded_kifu)
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
      this.turn_edit_value = this.current_turn
      this.$nextTick(() => this.$refs.turn_edit_input.focus())
    },

    flip_sign() {
      return this.flip ? -1 : 1
    },

    log(v) {
      if (this.debug_mode) {
        console.log(v)
      }
    },

    // location_flip(location_key) {
    //   return location_key === "black" ? "white" : "black"
    // },

    // mediator.current_location.key_diff(diff) {
    //   const locatios = ["black", "white"]
    //   return locatios[(this.turn_counter + diff) % locatios.length]
    // },

    piece_outer_class(xy) {
      const place = Place.fetch(xy)
      const soldier = this.mediator.board.lookup(place)
      const list = [] // this.mediator.board_piece_inner_class(xy)

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
        if (this.mediator.current_location === soldier.location || this.run_mode2 === "edit_mode") {
          list.push("selectable_p")
        }
      }

      return list
    },

    play_mode_setup(old_val) {
      console.log("run_mode2: play_mode")
      this.mediator_setup_if_blank()
      if (old_val === "view_mode") {
        this.init_location_key = this.mediator.current_location.key
      }
      const sfen_serializer = this.mediator.sfen_serializer
      this.init_sfen = "position sfen " + sfen_serializer.to_board_sfen + " " + this.init_location_key[0] + " " + sfen_serializer.to_hold_pieces + " " + "1"
      this.moves = []

      this.mediator = new Mediator()
      this.mediator.data_source = this.data_source_by(this.init_sfen)
      this.mediator.current_turn = 0
      this.mediator.run()

      this.current_turn = 0
    },
  },

  computed: {
    init_kifu_body() {
      return this.loaded_kifu || this.kifu_body || this.init_preset_sfen || "position startpos"
    }
  },
}
</script>

<style lang="sass">
</style>
