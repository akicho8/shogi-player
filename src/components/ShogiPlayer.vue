<template>
<div class="shogi-player">
  <p>{{mediator.turn_now}}手目</p>
  <div class="board_container board_turn" :class="{enable: board_turn}">
    <PieceStand :location="'white'"/>
    <div class="flex_item board">
      <table>
        <tr v-for="y in mediator.board_size">
          <template v-for="x in mediator.board_size">
            <td :class="mediator.cell_class(x -1, y - 1)">
              {{mediator.cell_view(x - 1, y - 1)}}
            </td>
          </template>
        </tr>
      </table>
    </div>
    <PieceStand :location="'black'"/>
  </div>
  <p>
    <div class="controller">
      <div class="--btn-group">
        <button class="btn btn-default first"      @click="current_turn = mediator.sfen_parser.turn_min">|◀</button>
        <button class="btn btn-default previous"   @click="current_turn -= 1">◀</button>
        <button class="btn btn-default next"       @click="current_turn += 1">▶</button>
        <button class="btn btn-default last"       @click="current_turn = mediator.sfen_parser.turn_max">▶|</button>
        <button class="btn btn-default board_turn" @click="board_turn = !board_turn">&#x21BB;</button>
      </div>
    </div>
  </p>
  <p>
    <input type="range" v-model.number="current_turn" :min="mediator.sfen_parser.turn_min" :max="mediator.sfen_parser.turn_max" />
  </p>
  <p>
    <input type="text" :value="mediator.to_sfen" class="form-control" readonly="readonly"/>
  </p>
  <template v-if="env !== 'production'">
    {{mediator.hold_pieces}}
  </template>
</div>
</template>

<script>
import { Piece } from "../piece"
import { Mediator } from "../mediator"
import PieceStand from "./piece_stand"

import Vue from 'vue'
import lodash from "lodash"
Object.defineProperty(Vue.prototype, '$lodash', {value: lodash})

/* eslint-disable no-new */
export default {
  name: 'ShogiPlayer',

  props: [
    "kifu_body",
    "turn_start",
  ],

  components: {
    PieceStand,
  },

  data() {
    return {
      current_turn: 0,
      mediator: null,
      board_turn: false,
      env: process.env.NODE_ENV,
    }
  },

  created() {
    this.current_turn = this.turn_start || 0
    this.mediator_update()
    // document.addEventListener("keydown", this.keyboard_operation)
  },

  watch: {
    current_turn: function () {
      this.mediator_update()
    },
    kifu_body: function () {
      this.mediator_update()
    },
  },

  methods: {
    keyboard_operation: function (e) {
      if (this.env !== "production") {
        console.log(e.shiftKey, e.ctrlKey, e.altKey, e.metaKey)
        console.log("e", e)
        console.log("key", e.key)
        console.log("code", e.code)
      }

      let gap = null
      let force_value = null

      if (e.code === "Space" || e.code === "Enter" || e.code === "ArrowDown" || e.code === "ArrowRight" || e.key === "j" || e.key === "n" || e.key === "f") {
        gap = 1
      }
      if (e.code === "Backspace" || e.code === "ArrowUp" || e.code === "ArrowLeft" || e.key === "k" || e.key === "p" || e.key === "b") {
        gap = -1
      }
      if (e.key === "PageUp") {
        gap = -10
      }
      if (e.key === "PageDown") {
        gap = 10
      }
      if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) {
        if (gap) {
          gap *= 10
        }
      }
      if (e.key === "[" || e.key === "Home" || e.code === "Escape") {
        force_value = this.mediator.sfen_parser.turn_min
      }
      if (e.key === "]" || e.key === "End") {
        force_value = this.mediator.sfen_parser.turn_max
      }

      if (gap !== null) {
        this.current_turn += gap
      }
      if (force_value !== null) {
        this.current_turn = force_value
      }

      if (gap !== null || force_value !== null) {
        e.preventDefault()
      }
    },

    mediator_update() {
      this.mediator = new Mediator()
      this.mediator.kifu_body = this.kifu_body || "position startpos"
      this.mediator.current_turn = this.current_turn
      this.mediator.run()
      this.current_turn = this.mediator.turn_now
    },
  },

  filters: {
    piece_name(piece_key) {
      return Piece.fetch(piece_key).name
    },
  },
}
</script>

<style scoped lang="sass">
  @import "ShogiPlayer"
</style>
