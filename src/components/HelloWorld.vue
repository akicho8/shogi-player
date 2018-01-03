<template>
<div class="shogi_player">
  <div>
    {{turn_current}}手目
  </div>
  <div>
    <input type="range" v-model.number="turn_current" :min="turn_counter_base" :max="turn_counter_max" />
  </div>
  <div>
    <button @click="play_previous">前へ</button>
    <button @click="play_next">次へ</button>
  </div>
  <br>

  <div>
    <ul class="hold_pieces">
      <li v-for="(count, piece) in hold_pieces['white']">
        <span class="piece_name">{{piece | piece_name}}</span>
        <template v-if="count >= 2">
          <span class="piece_count">{{count}}</span>
        </template>
      </li>
    </ul>
  </div>

  <table>
    <tr v-for="y in board_size">
      <template v-for="x in board_size">
        <td :class="cell_class(x -1, y - 1)">
          {{cell_view(x - 1, y - 1)}}
        </td>
      </template>
    </tr>
  </table>

  <div>
    <ul class="hold_pieces">
      <li v-for="(count, piece) in hold_pieces['black']">
        <span class="piece_name">{{piece | piece_name}}</span>
        <template v-if="count >= 2">
          <span class="piece_count">{{count}}</span>
        </template>
      </li>
    </ul>
  </div>

  <div>
    {{hold_pieces}}
  </div>

</div>
</template>

<script>
import { Sfen } from "../usi"
import { Board } from "../board"
import { Piece } from "../piece"
import { _ } from "underscore"

console.log(Piece.fetch("B"))

/* eslint-disable no-new */
export default {
  name: 'HelloWorld',

  data () {
    return {
      board_size: Board.boardSize(),
      sfen: null,
      turn_current: 0,
      turn_counter_base: null,
      turn_counter_max: null,
    }
  },

  created () {
    this.turn_current = 0
    this.field_update()
  },

  watch: {
    turn_current: function () {
      if (this.turn_counter_base !== null) {
        if (this.turn_current < this.turn_counter_base) {
          this.turn_current = this.turn_counter_base
        }
      }
      if (this.turn_counter_max !== null) {
        if (this.turn_counter_max < this.turn_current) {
          this.turn_current = this.turn_counter_max
        }
      }
      this.field_update()
    }
  },

  methods: {
    play_next () {
      this.turn_current += 1
      this.field_update()
    },
    play_previous () {
      this.turn_current -= 1
      this.field_update()
    },
    field_update () {
      const kifu_body = "position startpos moves 2g2f 3c3d 2f2e 2b3c 7g7f 3a4b 3i4h 5c5d 5i6h 5d5e 3g3f 8b5b 4h3g 4b5c 3g4f 5c4d 4i5h 5a6b 6h7h 6b7b 6g6f 7b8b 5h6g 7a7b 8h7g 9c9d 7h8h 9d9e 9i9h 8c8d 8h9i 7b8c 7i8h 6a7b 6f6e 7c7d 6g6f 8a7c 7g8f 5b5a 2h7h 8d8e 8f5i 3c4b 6i7i 2a3c 7f7e 7d7e 6f7e 4b7e 7h7e P*7d 7e7f G*7e 7f7h 5e5f 5g5f 7e6e 5f5e P*5f 5i2f 1c1d P*6b 4a5b 6b6a+ 5a6a 5e5d 6e6f 7h6h 6f7f P*7g 7f7e 6h5h 7e6f 5h6h 6f6e B*3b 8e8f 8g8f 3d3e 3b2c+ 6c6d 3f3e 6a2a 2c3d 9a9b 2f4h 2a9a 2e2d 6e7e 3d5f P*8d 4h7e 7d7e 6h6d 5b6c 6d6h B*6e 6h6e 7c6e 5f6e R*5i N*6f 7b7c B*5b 6c6d 6e6d 7c6d P*6e B*4h 6e6d 4h6f+ G*7c"

      this.sfen = new Sfen(kifu_body)
      this.sfen.parse()
      this.field = this.sfen.initial_field()
      this.turn_counter_base = this.sfen.turn_counter_base()
      this.turn_counter_max = this.sfen.turn_counter_max()
      this.hold_pieces = this.sfen.hold_pieces()

      const move_infos = this.sfen.move_infos()
      const num = this.turn_current - this.turn_counter_base
      _(num).times((i) => {
        const m = move_infos[i]
        if (m.stroke_piece) {
          const battler = {
            pos: m.pos,
            piece: m.stroke_piece,
            promoted: m.promoted,
            location: m.location,
          }
          this.hold_pieces[m.location][battler.piece.key] -= 1 // this.$set にしないとだめかも
          if (this.hold_pieces[m.location][battler.piece.key] <= 0) {
            delete this.hold_pieces[m.location][battler.piece.key]
          }
          this.$set(this.field, battler.pos, battler)
        } else {
          let battler = this.field[m.origin_pos]
          if (m.promoted_trigger) {
            battler.promoted = true
          }
          this.$set(this.field, m.origin_pos, null)
          const battler0 = this.field[m.pos]
          if (battler0) {
            if (!this.hold_pieces[m.location]) {
              this.hold_pieces[m.location] = {}
            }
            this.hold_pieces[m.location][battler0.piece.key] = (this.hold_pieces[m.location][battler0.piece.key] || 0) + 1
          }
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
      return klass
    },

    cell_class2(location) {
      const __hold_pieces = this.hold_pieces[location] || {}
      let list = []
      list = Piece.table().map((e) => {
        let count = __hold_pieces[e.key] || 0
        let value = null
        if (count >= 1) {
          if (count == 1) {
            count = ""
          }
          value = {name: e.name, count: count}
        }
        return value
      })
      list = _.compact(list)
      return list.join(" ")
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
$base-color:            hsl(200, 50%, 50%)
$board-bg-color:        darken($base-color, 43%)
$line-color:            darken($base-color,  0%)
$piece-color:           darken($base-color,  0%)
$piece-bg-color:        darken($base-color, 38%)
$font-color:            darken($base-color,  0%)
$blank-bg-color:        darken($base-color, 50%)
$something-exist-color: lighten($base-color, 20%)

$trigger-color:         darken($base-color,  0%)
$trigger-bg-color:      darken($base-color, 37%)

$cell-size: 7vmin

.shogi_player
  color: white
  margin: 0 auto
  text-align: center

  .white
    transform: rotate(180deg)

  table
    font-family: "YuMincho", "Yu Mincho", serif
    margin: 0 auto
    padding: 0
    background: $line-color
    border-collapse: separate
    border-spacing: 1px
    border: 1px solid $line-color
    box-shadow: 0 0 24vmin rgba($line-color, 0.5)
    td
      font-size: 4.4vmin
      width: $cell-size
      height: $cell-size
      padding: 0
      color: $piece-color
      background: $board-bg-color
      text-align: center
      &.active
        background: $piece-bg-color
      &.cell_blank
        background: $blank-bg-color
      &.something-exist-color
        background: $something-exist-color
      &.location_white
        transform: rotate(180deg)
      &.trigger
        color: $trigger-color
        background: $trigger-bg-color
      &.any_from_point
        background: $trigger-bg-color
  ul.hold_pieces
    list-style-type: none
    li
      display: inline-block
      margin: 8px
</style>
