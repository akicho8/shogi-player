import _ from "lodash"

import { SfenParser } from "./sfen_parser"
import { KifParser } from "./kif_parser"
import { Board } from "./board"
import { Point } from "./point"
import { Battler } from "./battler"
import { SfenSerializer } from "./sfen_serializer"
import Autolinker from 'autolinker'

class Mediator {
  constructor() {
    this.any_parser = null
    this.current_turn = null
    this.current_field = null
    this.hold_pieces = null
    this.move_info = null

    this.env = process.env.NODE_ENV
    this.kifu_body = "position startpos"
  }

  run() {
    let str = this.kifu_body || "position startpos"
    if (/position/.test(str)) { // FIXME: この判定はしょぼい
      this.any_parser = new SfenParser()
    } else {
      this.any_parser = new KifParser()
    }
    this.any_parser.kifu_body = str
    this.any_parser.parse()

    this.current_field = this.any_parser.field
    this.hold_pieces = this.any_parser.hold_pieces
    this.move_info = null

    const move_infos = this.any_parser.move_infos

    const num = this.normalized_turn - this.any_parser.turn_min
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
          const count = this.hold_pieces.get(m.location.key).get(battler.piece.key) - 1
          if (count >= 1) {
            this.hold_pieces.get(m.location.key).set(battler.piece.key, count)
          } else {
            this.hold_pieces.get(m.location.key).delete(battler.piece.key)
          }
        }
        this.current_field.set(battler.point.key, battler)
      } else {
        {
          const battler = this.current_field.get(m.point.key)
          if (battler) {
            if (this.hold_pieces.get(m.location.key) === undefined) {
              this.hold_pieces.set(m.location_key, new Map())
            }
            const count = (this.hold_pieces.get(m.location.key).get(battler.piece.key) || 0) + 1
            this.hold_pieces.get(m.location.key).set(battler.piece.key, count)
          }
        }
        const battler = this.current_field.get(m.origin_point.key)
        if (m.promoted_trigger) {
          battler.promoted = true
        }
        this.current_field.delete(m.origin_point.key)
        this.current_field.set(m.point.key, battler)
      }
    })
  }

  cell_view(x, y) {
    const battler = this.current_field.get(Point.fetch([x, y]).key)
    let str = ""
    if (battler) {
      str = battler.name
    }
    return str
  }

  cell_class(x, y) {
    const battler = this.current_field.get(Point.fetch([x, y]).key)
    let list = []
    if (battler) {
      list.push(`location_${battler.location.key}`)
      list = _.concat(list, battler.piece.css_class_list)
    }
    if (this.move_info) {
      const origin_point = this.move_info.origin_point
      if (origin_point) {
        if (origin_point.x === x && origin_point.y === y) {
          list.push("origin_point")
        }
      }
      const point = this.move_info.point
      if (point.x === x && point.y === y) {
        list.push("current")
      }
    }
    return list
  }

  get dimension() {
    return Board.dimension
  }

  // ruby style array index access
  get normalized_turn() {
    let index = Number(this.current_turn)
    if (index < 0) {
      index += this.any_parser.turn_max + 1
    }
    return this.turn_clamp(index)
  }

  turn_clamp(index) {
    return _.clamp(Number(index), this.any_parser.turn_min, this.any_parser.turn_max)
  }

  get location_current() {
    return this.any_parser.location_by_offset(this.normalized_turn - 1)
  }

  get location_next() {
    return this.any_parser.location_by_offset(this.normalized_turn)
  }

  get to_sfen() {
    return (new SfenSerializer(this)).to_s
  }

  get current_comments() {
    if (this.any_parser.comments_pack) {
      return this.any_parser.comments_pack[this.normalized_turn]
    }
  }

  auto_link(v) {
    const autolinker = new Autolinker()
    return autolinker.link(v)
  }

  get current_turn_label() {
    if (this.normalized_turn === this.any_parser.turn_max) {
      return `まで${this.normalized_turn}手で${this.location_current.name}の勝ち`
    } else {
      return `${this.normalized_turn}手目`
    }
  }
}

export { Mediator }
