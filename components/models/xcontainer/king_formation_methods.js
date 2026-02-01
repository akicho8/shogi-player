import Vue from "vue"
import _ from "lodash"
import { Board } from "../board.js"
import { Soldier } from "../soldier.js"
import { Location } from "../location.js"
import { GX } from "../gx"

export class KingFormationMethods {
  //////////////////////////////////////////////////////////////////////////////// 指将棋用玉配置

  king_formation_auto_set_on_off(v) {
    if (v) {
      return this.king_formation_auto_set()
    } else {
      return this.king_formation_auto_unset()
    }
  }

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
    soldiers.forEach(e => this.piece_search_and_place_on$(e))

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
        this.board.delete_at$(soldier.place)
        if (piece.key === "K") {
          // 玉の場合は駒箱にとらげる
          this.piece_box_add$(piece)
        } else {
          // 他の駒は相手の駒台へ
          this.hold_pieces_add(Location.fetch("white"), piece)
        }
      }
    })

    return true
  }

  // soldier.piece に対応する駒を探してあれば -1 して soldier.place の位置に配置する
  piece_search_and_place_on$(soldier) {
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

    this.board.soldier_drop$(soldier)
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
        this.piece_box_add$(piece, -1)
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
      { piece_key: "K", promoted: false, location_key: "black", place_key: [bx,           by           ] },
      { piece_key: "P", promoted: true,  location_key: "white", place_key: [bx,           by + sy + sy ] },
      { piece_key: "P", promoted: true,  location_key: "white", place_key: [bx + sx,      by + sy + sy ] },
      { piece_key: "P", promoted: true,  location_key: "white", place_key: [bx + sx + sx, by + sy + sy ] },
      { piece_key: "P", promoted: true,  location_key: "white", place_key: [bx + sx + sx, by + sy      ] },
      { piece_key: "P", promoted: true,  location_key: "white", place_key: [bx + sx + sx, by           ] },
    ].map(e => Soldier.easy_create(e))
  }
}
