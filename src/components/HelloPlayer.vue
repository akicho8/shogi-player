<template>
<div class="shogi_player">
  <p>
    {{current_turn}}手目
  </p>
  <p>
    <div class="controller">
      <div class="btn-group">
        <button class="btn btn-default first"      @click="current_turn = mediator.sfen.turn_counter_base()">｜＜</button>
        <button class="btn btn-default previous"   @click="current_turn -= 1">＜</button>
        <button class="btn btn-default next"       @click="current_turn += 1">＞</button>
        <button class="btn btn-default last"       @click="current_turn = mediator.sfen.turn_counter_max()">＞｜</button>
        <button class="btn btn-default board_turn" @click="board_turn = !board_turn">反転</button>
      </div>
    </div>
  </p>
  <p>
    <input type="range" v-model.number="current_turn" :min="mediator.sfen.turn_counter_base()" :max="mediator.sfen.turn_counter_max()" />
  </p>
  <div class="row">
    <div class="col-lg-12">
      <div class="board_container hifumin_eye" :class="{enable: board_turn}">
        <div class="flex_item hold_pieces white" :class="env">
          <ul>
            <li>☖</li>
            <li v-for="(count, piece) in mediator.hold_pieces['white']">
              <template v-if="count >= 1">
                <span class="piece_name">{{piece | piece_name}}</span>
                <template v-if="count >= 2">
                  <span class="piece_count">{{count}}</span>
                </template>
              </template>
            </li>
          </ul>
        </div>
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
        <div class="flex_item hold_pieces black" :class="env">
          <ul>
            <li>☗</li>
            <li v-for="(count, piece) in mediator.hold_pieces['black']">
              <template v-if="count >= 1">
                <span class="piece_name">{{piece | piece_name}}</span>
                <template v-if="count >= 2">
                  <span class="piece_count">{{count}}</span>
                </template>
              </template>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <template v-if="env !== 'production'">
    {{mediator.hold_pieces}}
  </template>
</div>
</template>

<script>
import { Sfen } from "../sfen"
import { Board } from "../board"
import { Piece } from "../piece"
import { Mediator } from "../mediator"
import { _ } from "underscore"

/* eslint-disable no-new */
export default {
  name: 'HelloPlayer',

  data () {
    return {
      mediator: null,
      current_turn: 0,
      board_turn: false,
      env: process.env.NODE_ENV,
    }
  },

  created () {
    this.mediator = new Mediator()
    this.current_turn = 0
    this.field_update()
    document.addEventListener("keydown", this.keyboard_operation)
  },

  watch: {
    current_turn: function (new_value, old_value) {
      if (this.mediator.sfen) {
        if (this.current_turn < this.mediator.sfen.turn_counter_base()) {
          this.current_turn = this.mediator.sfen.turn_counter_base()
        }
        if (this.mediator.sfen.turn_counter_max() < this.current_turn) {
          this.current_turn = this.mediator.sfen.turn_counter_max()
        }
      }
      this.field_update()
    }
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
      if (e.code === "Backspace" || e.code === "ArrowUp" || e.code === "ArrowLeft" || e.key == "k" || e.key == "p" || e.key == "b") {
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
      if (e.key === "[" || e.key === "Home" || e.code == "Escape") {
        force_value = this.mediator.sfen.turn_counter_base
      }
      if (e.key === "]" || e.key === "End") {
        force_value = this.mediator.sfen.turn_counter_max
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

    field_update () {
      this.mediator.run(this.current_turn)
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
  @import "HelloPlayer"
</style>
