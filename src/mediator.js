import _ from "lodash"
import Vue from "vue"

import Board from "./board"
import Place from "./place"
import Piece from "./piece"
import Soldier from "./soldier"
import SfenParser from "./sfen_parser"
import SfenSerializer from "./sfen_serializer"
import PresetInfo from "./preset_info"
import Location from "./location.js"

export default class Mediator {
  constructor() {
    const data_source = new SfenParser()
    data_source.kifu_body = "position startpos"
    data_source.parse()

    this.data_source = data_source
    this.current_turn = 0
    this.board = null
    this.hold_pieces = null
    this.last_hand = null
    this.piece_box = {}

    this.env = process.env.NODE_ENV
  }

  run() {
    this.board = this.data_source.board
    this.hold_pieces = this.data_source.hold_pieces
    this.last_hand = null

    const move_infos = this.data_source.move_infos

    const num = this.turn_offset - this.turn_offset_min
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
    return this.hold_pieces[location.key][piece.key] || 0
  }

  hold_pieces_add(location, piece, plus = 1) {
    const count = this.hold_pieces_count(location, piece) + plus
    const counts_hash = this.hold_pieces[location.key]
    if (count >= 1) {
      Vue.set(counts_hash, piece.key, count)
    } else {
      Vue.delete(counts_hash, piece.key)
    }
  }

  // location の piece を count 減らしたいとき本当に減らせる数を返す
  hold_pieces_can_be_reduced_count(location, piece, count) {
    const max = this.hold_pieces_count(location, piece)
    if (count > max) {
      count = max
    }
    return count
  }

  board_safe_delete_on(place) {
    this.board.delete_at(place)
  }

  board_piece_fore_class(xy) {
    const place = Place.fetch(xy)
    const soldier = this.board.lookup(place)

    if (soldier) {
      return soldier.to_class_list
    }

    return []
  }

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
  get turn_offset() {
    let index = Number(this.current_turn)
    if (index < 0) {
      index += this.turn_offset_max + 1
    }
    return this.turn_clamp(index)
  }

  turn_clamp(index) {
    return _.clamp(Number(index), this.turn_offset_min, this.turn_offset_max)
  }

  get previous_location() {
    return this.data_source.location_by_offset(this.turn_offset - 1)
  }

  get current_location() {
    return this.data_source.location_by_offset(this.turn_offset)
  }

  get current_comments() {
    if (this.data_source.comments_pack) {
      return this.data_source.comments_pack[this.turn_offset]
    }
  }

  get turn_offset_min() {
    return this.data_source.turn_offset_min
  }

  get turn_offset_max() {
    return this.data_source.turn_offset_max
  }

  current_turn_label(final_label) {
    if (this.turn_offset === this.turn_offset_max) {
      if (final_label) {
        return `まで${this.display_turn}手で${final_label}`
      } else {
        return `まで${this.display_turn}手で${this.previous_location.name}の勝ち`
      }
    } else {
      return `${this.display_turn}手`
    }
  }

  // 100手目から始まっている棋譜でオフセットが20のときは足して 120 を返す
  get display_turn() {
    return this.turn_base + this.turn_offset
  }

  // 何手目から始まっているかを返す
  get turn_base() {
    return this.data_source.turn_base
  }

  realized_hold_pieces_of(location_key) {
    const list = Object.entries(this.hold_pieces[location_key])
    return _(list)
      .filter(([key, count]) => count >= 1)
      .map(([key, count]) => [Piece.fetch(key), count])
      .sortBy(([key, count]) => key.code)
      .value()
  }

  // -------------------------------------------------------------------------------- serialize

  // 4k4/9/4G4/9/9/9/9/9/9 b G2r2b2g4s4n4l18p 1
  get to_simple_sfen() {
    return this.sfen_serializer.to_s
  }

  // 4k4/9/4G4/9/9/9/9/9/9 b G2r2b2g4s4n4l18p
  get to_sfen_without_turn() {
    return this.sfen_serializer.to_s_without_turn
  }

  // position sfen 4k4/9/4G4/9/9/9/9/9/9 b G2r2b2g4s4n4l18p 1
  get to_position_sfen() {
    return `position sfen ${this.to_simple_sfen}`
  }

  get sfen_serializer() {
    return new SfenSerializer(this)
  }

  // -------------------------------------------------------------------------------- piece_box

  piece_box_count(piece) {
    return this.piece_box[piece.key] || 0
  }

  piece_box_add(piece, plus = 1) {
    const count = this.piece_box_count(piece) + plus
    if (count >= 1) {
      Vue.set(this.piece_box, piece.key, count)
    } else {
      Vue.delete(this.piece_box, piece.key)
    }
  }

  // piece を count 減らしたいとき本当に減らせる数を返す
  piece_box_can_be_reduced_count(piece, count) {
    const max = this.piece_box_count(piece)
    if (count > max) {
      count = max
    }
    return count
  }

  piece_box_realize() {
    const list = Object.entries(this.piece_box) // {a: 1} => [['a', 1]]
    return _(list)
      .filter(([key, count]) => count >= 1)
      .map(([key, count]) => [Piece.fetch(key), count])
      .sortBy(([key, count]) => key.code)
      .value()
  }

  // -------------------------------------------------------------------------------- Utilities

  // location の駒台の駒をすべて駒箱に移動する
  hold_pieces_to_piece_box(location) {
    _.forIn(this.hold_pieces[location.key], (count, piece_key) => {
      const piece = Piece.fetch(piece_key)
      this.hold_pieces_add(location, piece, -count)
      this.piece_box_add(piece, count)
    })
  }

  // 駒箱の駒をすべて location の駒台に移動する
  piece_box_to_hold_pieces(location) {
    _.forIn(this.piece_box, (count, piece_key) => {
      const piece = Piece.fetch(piece_key)
      this.piece_box_add(piece, -count)
      this.hold_pieces_add(location, piece, count)
    })
  }

  // プリセットに対応するように駒箱をセットする
  piece_box_reset_by_preset(preset_info) {
    this.piece_box_clear()

    const info = PresetInfo.fetch(preset_info)
    if (info.piece_box) {
      info.piece_box.forEach(([e, c]) => {
        this.piece_box_add(Piece.fetch(e), c)
      })
    }
  }

  piece_box_clear() {
    this.piece_box = {}
  }

  /* eslint-disable */
  //////////////////////////////////////////////////////////////////////////////// 指将棋用玉配置

  // 指将棋用玉配置(自動)
  king_formation_auto_set() {
    let success = false
    if (!success) {
      success = this.king_formation_set("bottom_left")
    }
    if (!success) {
      success = this.king_formation_set("bottom_right")
    }
    return success
  }

  // 指将棋用玉配置解除
  // 玉は駒箱へ
  // それ以外は相手の駒台へ
  king_formation_auto_unset() {
    let success = false
    if (!success) {
      success = this.king_formation_unset("bottom_left")
    }
    if (!success) {
      success = this.king_formation_unset("bottom_right")
    }
    return success
  }

  // 指将棋用玉配置
  king_formation_set(position) {
    const soldiers = this.king_formation_soldiers(position)

    // 置きたいところに駒が1つでも置かれていたら何もしない
    if (soldiers.some(e => this.board.lookup(e.place))) {
      return
    }

    // 配置
    soldiers.forEach(e => this.piece_search_and_place_on(e))

    return true
  }

  // 指将棋用玉配置解除
  // 玉は駒箱へ
  // それ以外は相手の駒台へ
  king_formation_unset(position) {
    const soldiers = this.king_formation_soldiers(position)

    // 駒がそろってないときは何もしない
    if (soldiers.some(e => !this.board.lookup(e.place))) {
      return
    }

    soldiers.forEach(e => {
      const soldier = this.board.lookup(e.place)
      if (soldier) {
        const piece = soldier.piece
        this.board.delete_at(soldier.place)
        if (piece.key === "K") {
          // 玉の場合は駒箱にとらげる
          this.piece_box_add(piece)
        } else {
          // 他の駒は相手の駒箱へ
          this.hold_pieces_add(Location.fetch("white"), piece)
        }
      }
    })

    return true
  }

  // soldier.piece に対応する駒を探してあれば -1 して soldier.place の位置に配置する
  piece_search_and_place_on(soldier) {
    // すでに何か置かれていれば何もしない
    if (this.board.lookup(soldier.place)) {
      return
    }

    // 玉の場合は初期配置の時点で存在しない場合もあるので「あれば」-1 するだけ
    if (soldier.piece.key === "K") {
      this.piece_search_and_decrement(soldier.piece)
    } else {
      // 玉以外は駒が数が増えてしまってややこしくなるのを防ぐため必ず「あったときだけ」-1 し、なければ何もしない
      if (!this.piece_search_and_decrement(soldier.piece)) {
        return
      }
    }

    this.board.place_on(soldier)
  }

  // 相手の駒→駒箱→自分の駒の順で駒を探してあれば -1 して true を返す
  piece_search_and_decrement(piece) {
    let found = false

    // 相手の駒から探す
    if (!found) {
      found = this.piece_search_on_hold_pieces_and_decrement("white", piece)
    }

    // 駒箱から探す
    if (!found) {
      if (this.piece_box_count(piece) >= 1) {
        this.piece_box_add(piece, -1)
        found = true
      }
    }

    if (false) {
      // 自分の駒から探す
      if (!found) {
        found = this.piece_search_on_hold_pieces_and_decrement("black", piece)
      }
    }

    return found
  }

  // location_key の持駒から piece を探してあれば -1 して true を返す
  piece_search_on_hold_pieces_and_decrement(location_key, piece) {
    const location = Location.fetch(location_key)
    if (this.hold_pieces_count(location, piece) >= 1) {
      this.hold_pieces_add(location, piece, -1)
      return true
    }
  }

  // TODO: SFENで定義する方法もあり
  king_formation_soldiers(position) {
    let bx = null
    let sx = null
    let by = null
    let sy = null
    if (position === "bottom_left") {
      bx = 0
      sx = 1
      by = Board.dimension - 1
      sy = -1
    }
    if (position === "bottom_right") {
      bx = Board.dimension - 1
      sx = -1
      by = Board.dimension - 1
      sy = -1
    }
    return [
      { piece: "K", promoted: false, location: "black", place: [bx,           by           ] },
      { piece: "P", promoted: true,  location: "white", place: [bx,           by + sy + sy ] },
      { piece: "P", promoted: true,  location: "white", place: [bx + sx,      by + sy + sy ] },
      { piece: "P", promoted: true,  location: "white", place: [bx + sx + sx, by + sy + sy ] },
      { piece: "P", promoted: true,  location: "white", place: [bx + sx + sx, by + sy      ] },
      { piece: "P", promoted: true,  location: "white", place: [bx + sx + sx, by           ] },
    ].map(e => {
      return new Soldier({
        piece: Piece.fetch(e.piece),
        promoted: e.promoted,
        location: Location.fetch(e.location),
        place: Place.fetch(e.place),
      })
    })
  }

  ////////////////////////////////////////////////////////////////////////////////
  /* eslint-enable */
}
