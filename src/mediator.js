import _ from "lodash"

// import { SfenParser } from "./sfen_parser"
// import { KifParser } from "./kif_parser"
import { Board } from "./board"
import { Place } from "./place"
import { Piece } from "./piece"
import { Soldier } from "./soldier"
import { SfenSerializer } from "./sfen_serializer"
import Autolinker from 'autolinker'

class Mediator {
  constructor() {
    this.data_source = null
    this.current_turn = null
    this.board = null
    this.hold_pieces = null
    this.last_hand = null

    this.env = process.env.NODE_ENV
    this.kifu_body = "position startpos"
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
    _(num).times((i) => {
      const move_hand = move_infos[i]
      this.execute_one(move_hand)
    })
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
      this.board.set(soldier.place.key, soldier)
    } else {
      {
        const soldier = this.board.get(m.place.key)
        if (soldier) {
          this.hold_pieces_add(m.location, soldier.piece, 1)
        }
      }
      const soldier = this.board.get(m.origin_place.key)
      if (m.promoted_trigger) {
        soldier.promoted = true
      }
      this.board_safe_delete_on(m.origin_place)
      this.board.set(m.place.key, soldier)
    }
  }

  hold_pieces_count(location, piece) {
    return this.hold_pieces.get(location.key).get(piece.key) || 0
  }

  hold_pieces_add(location, piece, plus) {
    const count = this.hold_pieces_count(location, piece) + plus
    const counts_hash = this.hold_pieces.get(location.key)
    if (count >= 1) {
      counts_hash.set(piece.key, count)
    } else {
      counts_hash.delete(piece.key)
    }
  }

  board_safe_delete_on(place) {
    this.board.delete(place.key)
  }

  board_place_at(xy) {
    return this.board.get(Place.fetch(xy).key)
  }

  cell_class(xy) {
    const [x, y] = xy
    const soldier = this.board_place_at(xy)
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
        if (origin_place.x === x && origin_place.y === y) {
          list.push("origin_place")
        }
      }
      const place = this.last_hand.place
      if (place.x === x && place.y === y) {
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
    const soldier = this.board_place_at(xy)
    let list = []
    if (soldier) {
      list.push(`location_${soldier.location.key}`)
    }
    return list
  }

  cell_view(xy) {
    const soldier = this.board_place_at(xy)
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

  get to_sfen() {
    return (new SfenSerializer(this)).to_s
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
    const list = Array.from(this.hold_pieces.get(location_key))
    return _(list)
      .filter(([key, count]) => count >= 1)
      .map(([key, count]) => [Piece.fetch(key), count])
      .sortBy(list, ([key, count]) => key.code)
      .value()
  }
}

export { Mediator }
