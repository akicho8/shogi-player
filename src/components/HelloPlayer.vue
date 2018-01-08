<template>
<div class="shogi_player">
  <p>
    {{turn_current}}手目
  </p>
  <p>
    <button @click="turn_current = turn_counter_base">｜＜</button>
    <button @click="turn_current -= 1">＜</button>
    <button @click="turn_current += 1">＞</button>
    <button @click="turn_current = turn_counter_max">＞｜</button>
    <button @click="board_turn = !board_turn">反転</button>
  </p>
  <p>
    <input type="range" v-model.number="turn_current" :min="turn_counter_base" :max="turn_counter_max" />
  </p>

  <div class="row">
    <div class="col-lg-12">
      <div class="board_container hifumin_eye" :class="{enable: board_turn}">
        <div class="flex_item hold_pieces white" :class="env">
          <ul>
            <li>☖</li>
            <li v-for="(count, piece) in hold_pieces['white']">
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
            <tr v-for="y in board_size">
              <template v-for="x in board_size">
                <td :class="cell_class(x -1, y - 1)">
                  {{cell_view(x - 1, y - 1)}}
                </td>
              </template>
            </tr>
          </table>
        </div>
        <div class="flex_item hold_pieces black" :class="env">
          <ul>
            <li>☗</li>
            <li v-for="(count, piece) in hold_pieces['black']">
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
    {{hold_pieces}}
  </template>
</div>
</template>

<script>
import { Sfen } from "../usi"
import { Board } from "../board"
import { Piece } from "../piece"
import { _ } from "underscore"

/* eslint-disable no-new */
export default {
  name: 'HelloPlayer',

  data () {
    return {
      board_size: Board.boardSize(),
      sfen: null,
      turn_current: 0,
      turn_counter_base: null,
      turn_counter_max: null,
      hold_pieces: null,
      field: null,
      move_info: null,
      board_turn: false,
      env: process.env.NODE_ENV,
    }
  },

  created () {
    this.turn_current = 0
    this.field_update()
    document.addEventListener("keydown", this.enterFunc)
  },

  watch: {
    turn_current: function (new_value, old_value) {
      if (this.sfen) {
        if (this.turn_current < this.turn_counter_base) {
          this.turn_current = this.turn_counter_base
        }
        if (this.turn_counter_max < this.turn_current) {
          this.turn_current = this.turn_counter_max
        }
      }
      this.field_update()
    }
  },

  methods: {
    enterFunc: function (e) {
      console.log(e.shiftKey, e.ctrlKey, e.altKey, e.metaKey)
      console.log("e", e)
      console.log("key", e.key)
      console.log("code", e.code)

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
        force_value = this.turn_counter_base
      }
      if (e.key === "]" || e.key === "End") {
        force_value = this.turn_counter_max
      }

      if (gap !== null) {
        this.turn_current += gap
      }
      if (force_value !== null) {
        this.turn_current = force_value
      }

      if (gap !== null || force_value !== null) {
        e.preventDefault()
      }
    },

    field_update () {
      const kifu_body = "position startpos moves 2g2f 3c3d 2f2e 2b3c 7g7f 3a4b 3i4h 5c5d 5i6h 5d5e 3g3f 8b5b 4h3g 4b5c 3g4f 5c4d 4i5h 5a6b 6h7h 6b7b 6g6f 7b8b 5h6g 7a7b 8h7g 9c9d 7h8h 9d9e 9i9h 8c8d 8h9i 7b8c 7i8h 6a7b 6f6e 7c7d 6g6f 8a7c 7g8f 5b5a 2h7h 8d8e 8f5i 3c4b 6i7i 2a3c 7f7e 7d7e 6f7e 4b7e 7h7e P*7d 7e7f G*7e 7f7h 5e5f 5g5f 7e6e 5f5e P*5f 5i2f 1c1d P*6b 4a5b 6b6a+ 5a6a 5e5d 6e6f 7h6h 6f7f P*7g 7f7e 6h5h 7e6f 5h6h 6f6e B*3b 8e8f 8g8f 3d3e 3b2c+ 6c6d 3f3e 6a2a 2c3d 9a9b 2f4h 2a9a 2e2d 6e7e 3d5f P*8d 4h7e 7d7e 6h6d 5b6c 6d6h B*6e 6h6e 7c6e 5f6e R*5i N*6f 7b7c B*5b 6c6d 6e6d 7c6d P*6e B*4h 6e6d 4h6f+ G*7c"

      this.sfen = new Sfen(kifu_body)
      this.sfen.parse()
      this.field = this.sfen.initial_field()
      this.turn_counter_base = this.sfen.turn_counter_base()
      this.turn_counter_max = this.sfen.turn_counter_max()
      this.hold_pieces = this.sfen.hold_pieces()
      this.move_info = null

      const move_infos = this.sfen.move_infos()
      const num = this.turn_current - this.turn_counter_base
      _(num).times((i) => {
        const m = move_infos[i]
        this.move_info = m
        if (m.stroke_piece) {
          const battler = {
            pos: m.pos,
            piece: m.stroke_piece,
            promoted: m.promoted,
            location: m.location,
          }
          {
            const count = this.hold_pieces[m.location][battler.piece.key] - 1
            this.$set(this.hold_pieces[m.location], battler.piece.key, count)
          }
          this.$set(this.field, battler.pos, battler)
        } else {
          {
            const battler = this.field[m.pos]
            if (battler) {
              if (this.hold_pieces[m.location] === undefined) {
                this.$set(this.hold_pieces, m.location, {})
              }
              const count = (this.hold_pieces[m.location][battler.piece.key] || 0) + 1
              this.$set(this.hold_pieces[m.location], battler.piece.key, count)
            }
          }
          const battler = this.field[m.origin_pos]
          if (m.promoted_trigger) {
            battler.promoted = true
          }
          this.$set(this.field, m.origin_pos, null)
          this.$set(this.field, m.pos, battler)
        }
      })
    },

    cell_view(x, y) {
      const cell = this.field[[x, y]]
      let str = ""
      if (cell) {
        if (cell.promoted) {
          str = cell.piece.promoted_name
        } else {
          str = cell.piece.name
        }
      }
      return str
    },

    cell_class(x, y) {
      const cell = this.field[[x, y]]
      let klass = []
      if (cell) {
        klass.push(cell.location)
      }
      if (this.move_info) {
        const origin_pos = this.move_info.origin_pos
        if (origin_pos) {
          if (origin_pos.x === x && origin_pos.y === y) {
            klass.push("origin_pos")
          }
        }
        const pos = this.move_info.pos
        if (pos.x === x && pos.y === y) {
          klass.push("current")
        }
      }
      return klass
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
