// -*- compile-command: "babel-node mediator.js" -*-

import { _ } from "underscore"

import { Sfen } from "./sfen"
import { Board } from "./board"
import { Point } from "./point"
import { Battler } from "./battler"

class Mediator {
  constructor () {
    this.sfen = null
    this.current_turn = null
    this.current_field = null
    this.hold_pieces = null
    this.move_info = null

    this.env = process.env.NODE_ENV
    this.kifu_body = "position startpos"
  }

  run () {
    this.sfen = new Sfen()
    this.sfen.kifu_body = this.kifu_body
    this.sfen.parse()

    this.current_field = this.sfen.field
    this.hold_pieces = this.sfen.hold_pieces
    this.move_info = null

    const move_infos = this.sfen.move_infos

    const num = this.turn_now - this.sfen.turn_min
    _(num).times((i) => {
      const m = move_infos[i]
      this.move_info = m
      if (m.stroke_piece) {
        const battler = new Battler({
          piece: m.stroke_piece,
          point: m.point,
          promoted: m.promoted,
          location: m.location,
        })
        {
          const count = this.hold_pieces.get(m.location).get(battler.piece.key) - 1
          this.hold_pieces.get(m.location).set(battler.piece.key, count)
        }
        this.current_field.set(battler.point.to_key, battler)
      } else {
        {
          const battler = this.current_field.get(m.point.to_key)
          if (battler) {
            if (this.hold_pieces.get(m.location) === undefined) {
              this.hold_pieces.set(m.location, new Map())
            }
            const count = (this.hold_pieces.get(m.location).get(battler.piece.key) || 0) + 1
            this.hold_pieces.get(m.location).set(battler.piece.key, count)
          }
        }
        const battler = this.current_field.get(m.origin_pos.to_key)
        if (m.promoted_trigger) {
          battler.promoted = true
        }
        this.current_field.set(m.origin_pos.to_key, null)
        this.current_field.set(m.point.to_key, battler)
      }
    })
  }

  cell_view(x, y) {
    const battler = this.current_field.get(Point.fetch([x, y]).to_key)
    let str = ""
    if (battler) {
      str = battler.name
    }
    return str
  }

  cell_class(x, y) {
    const battler = this.current_field.get(Point.fetch([x, y]).to_key)
    let klass = []
    if (battler) {
      klass.push(battler.location)
    }
    if (this.move_info) {
      const origin_pos = this.move_info.origin_pos
      if (origin_pos) {
        if (origin_pos.x === x && origin_pos.y === y) {
          klass.push("origin_pos")
        }
      }
      const point = this.move_info.point
      if (point.x === x && point.y === y) {
        klass.push("current")
      }
    }
    return klass
  }

  turn_clamp(v) {
    if (this.sfen) {
      if (v < this.sfen.turn_min) {
        v = this.sfen.turn_min
      }
      if (this.sfen.turn_max < v) {
        v = this.sfen.turn_max
      }
    }
    return v
  }

  get board_size() {
    return Board.board_size
  }

  // ruby style array index access
  get turn_now() {
    let index = this.current_turn
    if (index < 0) {
      index += this.sfen.turn_max + 1
    }
    return this.turn_clamp(index)
  }
}

export { Mediator }
