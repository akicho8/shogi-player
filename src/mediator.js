// -*- compile-command: "babel-node mediator.js" -*-

import { _ } from "underscore"

import { Sfen } from "./sfen"
import { Board } from "./board"
import { Piece } from "./piece"
import Vue from "vue"

class Mediator {
  constructor () {
    this.board_size = Board.boardSize()

    this.sfen = null
    this.current_turn = null
    this.current_field = null
    this.hold_pieces = null
    this.move_info = null

    this.env = process.env.NODE_ENV
    this.kifu_body = "position startpos moves 2g2f 3c3d 2f2e 2b3c 7g7f 3a4b 3i4h 5c5d 5i6h 5d5e 3g3f 8b5b 4h3g 4b5c 3g4f 5c4d 4i5h 5a6b 6h7h 6b7b 6g6f 7b8b 5h6g 7a7b 8h7g 9c9d 7h8h 9d9e 9i9h 8c8d 8h9i 7b8c 7i8h 6a7b 6f6e 7c7d 6g6f 8a7c 7g8f 5b5a 2h7h 8d8e 8f5i 3c4b 6i7i 2a3c 7f7e 7d7e 6f7e 4b7e 7h7e P*7d 7e7f G*7e 7f7h 5e5f 5g5f 7e6e 5f5e P*5f 5i2f 1c1d P*6b 4a5b 6b6a+ 5a6a 5e5d 6e6f 7h6h 6f7f P*7g 7f7e 6h5h 7e6f 5h6h 6f6e B*3b 8e8f 8g8f 3d3e 3b2c+ 6c6d 3f3e 6a2a 2c3d 9a9b 2f4h 2a9a 2e2d 6e7e 3d5f P*8d 4h7e 7d7e 6h6d 5b6c 6d6h B*6e 6h6e 7c6e 5f6e R*5i N*6f 7b7c B*5b 6c6d 6e6d 7c6d P*6e B*4h 6e6d 4h6f+ G*7c"
  }

  run (current_turn) {
    this.current_turn = current_turn

    this.sfen = new Sfen(this.kifu_body)
    this.sfen.parse()
    this.current_field = this.sfen.field()
    this.hold_pieces = this.sfen.hold_pieces()
    this.move_info = null

    const move_infos = this.sfen.move_infos()
    const num = this.current_turn - this.sfen.turn_counter_base()
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
          Vue.set(this.hold_pieces[m.location], battler.piece.key, count)
        }
        Vue.set(this.current_field, battler.pos, battler)
      } else {
        {
          const battler = this.current_field[m.pos]
          if (battler) {
            if (this.hold_pieces[m.location] === undefined) {
              Vue.set(this.hold_pieces, m.location, {})
            }
            const count = (this.hold_pieces[m.location][battler.piece.key] || 0) + 1
            Vue.set(this.hold_pieces[m.location], battler.piece.key, count)
          }
        }
        const battler = this.current_field[m.origin_pos]
        if (m.promoted_trigger) {
          battler.promoted = true
        }
        Vue.set(this.current_field, m.origin_pos, null)
        Vue.set(this.current_field, m.pos, battler)
      }
    })
  }

  cell_view(x, y) {
    const cell = this.current_field[[x, y]]
    let str = ""
    if (cell) {
      if (cell.promoted) {
        str = cell.piece.promoted_name
      } else {
        str = cell.piece.name
      }
    }
    return str
  }

  cell_class(x, y) {
    const cell = this.current_field[[x, y]]
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
  }
}

export { Mediator }
