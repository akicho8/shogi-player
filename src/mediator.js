import _ from "lodash"

import { SfenParser } from "./sfen_parser"
import { KifParser } from "./kif_parser"
import { Board } from "./board"
import { Place } from "./place"
import { Piece } from "./piece"
import { Soldier } from "./soldier"
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
      if (m.drop_piece) {
        const soldier = new Soldier({
          piece: m.drop_piece,
          place: m.place,
          promoted: m.promoted,
          location: m.location,
        })
        if (true) {
          const count = this.hold_pieces.get(m.location.key).get(soldier.piece.key) - 1
          if (count >= 1) {
            this.hold_pieces.get(m.location.key).set(soldier.piece.key, count)
          } else {
            this.hold_pieces.get(m.location.key).delete(soldier.piece.key)
          }
        }
        this.current_field.set(soldier.place.key, soldier)
      } else {
        {
          const soldier = this.current_field.get(m.place.key)
          if (soldier) {
            if (_.isNil(this.hold_pieces.get(m.location.key))) {
              this.hold_pieces.set(m.location_key, new Map())
            }
            const count = (this.hold_pieces.get(m.location.key).get(soldier.piece.key) || 0) + 1
            this.hold_pieces.get(m.location.key).set(soldier.piece.key, count)
          }
        }
        const soldier = this.current_field.get(m.origin_place.key)
        if (m.promoted_trigger) {
          soldier.promoted = true
        }
        this.current_field.delete(m.origin_place.key)
        this.current_field.set(m.place.key, soldier)
      }
    })
  }

  cell_lookup(xy) {
    return this.current_field.get(Place.fetch(xy).key)
  }

  cell_class(xy) {
    const [x, y] = xy
    const soldier = this.cell_lookup(xy)
    let list = []
    if (soldier) {
      list.push(`location_${soldier.location.key}`)
      list.push(`promoted_${soldier.promoted}`)
      list = _.concat(list, soldier.piece.css_class_list)
    } else {
      list.push("blank")
    }
    if (this.move_info) {
      const origin_place = this.move_info.origin_place
      if (origin_place) {
        if (origin_place.x === x && origin_place.y === y) {
          list.push("origin_place")
        }
      }
      const place = this.move_info.place
      if (place.x === x && place.y === y) {
        list.push("current")
      }
    }
    return list
  }

  cell_piece_class(xy) {
    const soldier = this.cell_lookup(xy)
    let list = []
    if (soldier) {
      list.push(`location_${soldier.location.key}`)
    }
    return list
  }

  cell_view(xy) {
    const soldier = this.cell_lookup(xy)
    let str = ""
    if (soldier) {
      str = soldier.name
    }
    return str
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

  realized_hold_pieces_of(location_key) {
    const list = Array.from(this.hold_pieces.get(location_key))
    return _(list)
      .filter(([key, count]) => count >= 1)
      .map(([key, count]) => [Piece.fetch(key), count])
      .sortBy(list, ([key, count]) => key.code)
      .value()
  }
}

export { Mediator }
