// -*- compile-command: "babel-node mediator.js" -*-

import { _ } from "underscore"

import { SfenParser } from "./sfen_parser"
import { Board } from "./board"
import { Point } from "./point"
import { Battler } from "./battler"
import { SfenSerializer } from "./sfen_serializer"

class Mediator {
  constructor() {
    this.sfen_parser = null
    this.current_turn = null
    this.current_field = null
    this.hold_pieces = null
    this.move_info = null

    this.env = process.env.NODE_ENV
    this.kifu_body = "position startpos"
  }

  run() {
    this.sfen_parser = new SfenParser()
    this.sfen_parser.kifu_body = this.kifu_body
    this.sfen_parser.parse()

    this.current_field = this.sfen_parser.field
    this.hold_pieces = this.sfen_parser.hold_pieces
    this.move_info = null

    const move_infos = this.sfen_parser.move_infos

    const num = this.turn_now - this.sfen_parser.turn_min
    _(num).times((i) => {
      const m = move_infos[i]
      this.move_info = m
      if (m.stroke_piece) {
        const battler = new Battler({
          piece: m.stroke_piece,
          point: m.point,
          promoted: m.promoted,
          location_key: m.location,
        })
        {
          const count = this.hold_pieces.get(m.location_key).get(battler.piece.key) - 1
          this.hold_pieces.get(m.location_key).set(battler.piece.key, count)
        }
        this.current_field.set(battler.point.to_key, battler)
      } else {
        {
          const battler = this.current_field.get(m.point.to_key)
          if (battler) {
            if (this.hold_pieces.get(m.location_key) === undefined) {
              this.hold_pieces.set(m.location_key, new Map())
            }
            const count = (this.hold_pieces.get(m.location_key).get(battler.piece.key) || 0) + 1
            this.hold_pieces.get(m.location_key).set(battler.piece.key, count)
          }
        }
        const battler = this.current_field.get(m.origin_pos.to_key)
        if (m.promoted_trigger) {
          battler.promoted = true
        }
        this.current_field.delete(m.origin_pos.to_key)
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
      klass.push(battler.location_key)
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
    if (this.sfen_parser) {
      if (v < this.sfen_parser.turn_min) {
        v = this.sfen_parser.turn_min
      }
      if (this.sfen_parser.turn_max < v) {
        v = this.sfen_parser.turn_max
      }
    }
    return v
  }

  get dimension() {
    return Board.dimension
  }

  // ruby style array index access
  get turn_now() {
    let index = this.current_turn
    if (index < 0) {
      index += this.sfen_parser.turn_max + 1
    }
    return this.turn_clamp(index)
  }

  get to_sfen() {
    return (new SfenSerializer(this)).to_s
  }
}

export { Mediator }
