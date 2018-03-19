import _ from "lodash"

// import { SfenParser } from "./sfen_parser"
// import { KifParser } from "./kif_parser"
import { FooParser } from "./foo_parser"
import { Board } from "./board"
import { Place } from "./place"
import { Piece } from "./piece"
import { Soldier } from "./soldier"
import { SfenSerializer } from "./sfen_serializer"
import Autolinker from 'autolinker'

class Mediator {
  constructor() {
    const data_source = new FooParser()
    data_source.kifu_body = "position startpos"
    data_source.parse()

    this.data_source = data_source
    this.current_turn = 0
    this.board = null
    this.hold_pieces = null
    this.last_hand = null
    this.piece_box = new Map()

    this.env = process.env.NODE_ENV
    // this.kifu_body = "position startpos"
  }

  run() {
    // let str = this.kifu_body || "position startpos"
    // let parser_object
    // if (/position/.test(str)) {
    //   parser_object = new SfenParser()
    // } else {
    //   parser_object = new KifParser()
    // }
    // parser_object.kifu_body = str
    // parser_object.parse()
    // this.data_source      = parser_object

    this.board = this.data_source.board
    this.hold_pieces = this.data_source.hold_pieces
    this.last_hand = null

    const move_infos = this.data_source.move_infos

    const num = this.normalized_turn - this.data_source.turn_min
    _(num).times((i) => { this.execute_one(move_infos[i]) })
  }

  execute_one(m) {
    this.last_hand = m
    if (m.drop_piece) {
      const soldier = new Soldier({
        piece: m.drop_piece,
        place: m.place,
        promoted: m.promoted,
        location: m.location,
      })
      this.hold_pieces_add(m.location, soldier.piece, -1)
      this.board.place_on(soldier)
    } else {
      {
        const soldier = this.board.lookup(m.place)
        if (soldier) {
          this.hold_pieces_add(m.location, soldier.piece, 1)
        }
      }
      const soldier = this.board.lookup(m.origin_place)
      if (m.promoted_trigger) {
        soldier.promoted = true
      }
      soldier.place = m.place
      this.board.delete_at(m.origin_place)
      this.board.place_on(soldier)
    }
  }

  hold_pieces_count(location, piece) {
    return this.hold_pieces.get(location.key).get(piece.key) || 0
  }

  hold_pieces_add(location, piece, plus = 1) {
    const count = this.hold_pieces_count(location, piece) + plus
    const counts_hash = this.hold_pieces.get(location.key)
    if (count >= 1) {
      counts_hash.set(piece.key, count)
    } else {
      counts_hash.delete(piece.key)
    }
  }

  board_safe_delete_on(place) {
    this.board.delete_at(place)
  }

  cell_class(xy) {
    const place = Place.fetch(xy)
    const soldier = this.board.lookup(place)
    let list = []

    if (soldier) {
      list.push(`location_${soldier.location.key}`)
      list.push(`promoted_${soldier.promoted}`)
      list = _.concat(list, soldier.piece.css_class_list)
    } else {
      list.push("blank")
    }

    if (this.last_hand) {
      const origin_place = this.last_hand.origin_place
      if (origin_place) {
        if (_.isEqual(origin_place, place)) {
          list.push("origin_place")
        }
      }
      if (_.isEqual(this.last_hand.place, place)) {
        list.push("current")
      }
    }

    return list
  }

  // cell_class2(xy) {
  //   const [x, y] = xy
  //   const soldier = this.board_place_at(xy)
  //   let list = []
  //
  //   if (this.last_hand) {
  //     const origin_place = this.last_hand.origin_place
  //     if (origin_place) {
  //       if (origin_place.x === x && origin_place.y === y) {
  //         list.push("origin_place")
  //       }
  //     }
  //     const place = this.last_hand.place
  //     if (place.x === x && place.y === y) {
  //       list.push("current")
  //     }
  //   }
  //
  //   return list
  // }

  cell_piece_class(xy) {
    const place = Place.fetch(xy)
    const soldier = this.board.lookup(place)
    let list = []
    if (soldier) {
      list.push(`location_${soldier.location.key}`)
    }
    return list
  }

  cell_view(xy) {
    const place = Place.fetch(xy)
    const soldier = this.board.lookup(place)
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
      index += this.data_source.turn_max + 1
    }
    return this.turn_clamp(index)
  }

  turn_clamp(index) {
    return _.clamp(Number(index), this.data_source.turn_min, this.data_source.turn_max)
  }

  get previous_location() {
    return this.data_source.location_by_offset(this.normalized_turn - 1)
  }

  get current_location() {
    return this.data_source.location_by_offset(this.normalized_turn)
  }

  get current_comments() {
    if (this.data_source.comments_pack) {
      return this.data_source.comments_pack[this.normalized_turn]
    }
  }

  auto_link(v) {
    const autolinker = new Autolinker()
    return autolinker.link(v)
  }

  get current_turn_label() {
    if (this.normalized_turn === this.data_source.turn_max) {
      return `まで${this.normalized_turn}手で${this.previous_location.name}の勝ち`
    } else {
      return `${this.normalized_turn}手目`
    }
  }

  realized_hold_pieces_of(location_key) {
    // console.log("realized_hold_pieces_of")
    const list = Array.from(this.hold_pieces.get(location_key))
    // console.log(list)
    return _(list)
      .filter(([key, count]) => count >= 1)
      .map(([key, count]) => [Piece.fetch(key), count])
      .sortBy(list, ([key, count]) => key.code)
      .value()
  }

  // -------------------------------------------------------------------------------- serialize

  get to_sfen() {
    return this.sfen_serializer.to_s
  }

  get sfen_serializer() {
    return new SfenSerializer(this)
  }

  // -------------------------------------------------------------------------------- piece_box

  piece_box_count(piece) {
    return this.piece_box.get(piece.key) || 0
  }

  piece_box_add(piece, plus = 1) {
    const count = this.piece_box_count(piece) + plus
    if (count >= 1) {
      this.piece_box.set(piece.key, count)
    } else {
      this.piece_box.delete(piece.key)
    }
  }

  piece_box_realized_hold_pieces_of() {
    const list = Array.from(this.piece_box)
    return _(list)
      .filter(([key, count]) => count >= 1)
      .map(([key, count]) => [Piece.fetch(key), count])
      .sortBy(list, ([key, count]) => key.code)
      .value()
  }
}

export { Mediator }
