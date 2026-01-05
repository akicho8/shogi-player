import XRegExp from "xregexp"
XRegExp.uninstall("namespacing")

import Vue from "vue"
import _ from "lodash"

import { Board      } from "./board.js"
import { Piece      } from "./piece.js"
import { Place      } from "./place.js"
import { Soldier    } from "./soldier.js"
import { Location   } from "./location.js"
import { MoveHash   } from "./move_hash.js"
import { Xcontainer } from "./xcontainer.js"

import { ParserBase } from "./parser_base.js"

export class SfenParser extends ParserBase {
  static SFEN_DEFAULT = "position sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1"

  static default_create() {
    return this.parse("position startpos")
  }

  reset() {
    super.reset()
    this.attributes = {}
  }

  parse() {
    this.raw_body = this.raw_body.replace(/(position )?startpos/, this.constructor.SFEN_DEFAULT)
    const regex = XRegExp("sfen\\s+(?<board>\\S+)\\s+(?<b_or_w>\\S+)\\s+(?<hold_pieces>\\S+)\\s+(?<turn_counter_next>\\d+)(\\s+moves\\s+(?<moves>.*))?")
    this.attributes = XRegExp.exec(this.raw_body, regex)
    if (process.env.NODE_ENV === "deveopment") {
      console.log(this.attributes)
    }
  }

  get board() {
    const board = Board.create_empty()
    this.attributes["board"].split("/").forEach((e, y) => {
      let x = 0
      XRegExp.forEach(e, XRegExp("(?<promoted>\\+?)(?<piece>\\S)"), (m, i) => {
        if (/\d+/.test(m.piece)) {
          x += Number(m.piece)
        } else {
          const soldier = Soldier.create({
            place: Place.fetch([x, y]),
            piece: Piece.fetch(m.piece),
            promoted: (m.promoted === "+"),
            location: this.__location_by_upper_or_lower_case(m.piece),
          })
          board.soldier_drop$(soldier)
          x++
        }
      })
    })
    return board
  }

  get base_location() {
    let key = null
    if (this.attributes["b_or_w"] === "b") {
      key = "black"
    } else {
      key = "white"
    }
    return Location.fetch(key)
  }

  get hold_pieces() {
    const hash = this.hold_pieces_empty_hash()
    if (this.attributes["hold_pieces"] !== "-") {
      XRegExp.forEach(this.attributes["hold_pieces"], XRegExp("(?<count>\\d+)?(?<piece_char>\\S)"), (md, i) => {
        const piece = Piece.fetch(md.piece_char)
        let count = Number(md.count || 1)
        const location = this.__location_by_upper_or_lower_case(md.piece_char)
        count += hash[location.key][piece.key] ?? 0
        Vue.set(hash[location.key], piece.key, count)
      })
    }
    return hash
  }

  // sfen_serializer 用
  get turn_base() {
    return Number(this.attributes["turn_counter_next"]) - 1
  }

  // "b - 1" なら 0
  // "w - 2" なら 1
  // "b - 3" なら 2
  // get turn_offset_min() {
  //   // return Number(this.attributes["turn_counter_next"]) - 1
  //   // return Number(this.attributes["turn_counter_next"]) - 1
  // }

  // // "b - 1" -> turn_offset_min:0 % 2 -> 0 && w
  // // "w - 2" -> turn_offset_min:1 % 2 -> 1 && w
  // // "b - 3" -> turn_offset_min:2 % 2 -> 0 && w
  // // "w - 1" -> turn_offset_min:0 % 2 -> 0 && w -> true
  // // "b - 2" -> turn_offset_min:1 % 2 -> 1 && w
  // // "w - 3" -> turn_offset_min:2 % 2 -> 0 && w -> true
  // get komaochi_p() {
  //   return (this.turn_offset_min % 2) === 0 && this.base_location.key === "white"
  // }

  // FIXME: move_hashes が正しい
  get move_infos() {
    // this.moves.map((e, i) => { としたかったが break できないため lodash の forEach に変更。lodash のは false で break できる
    const ary = []
    _.forEach(this.moves, (e, i) => {
      const move_hash = MoveHash.parse(e)
      if (!move_hash) {
        return false  // break
      }
      // if (true) {
      //   move_hash["scene_index"] = this.turn_offset_min + i
      //   move_hash["scene_offset"] = i
      // }
      move_hash["location"] = this.location_by_offset(i) // これいるのか？ → いる
      ary.push(move_hash)
    })
    return ary
  }

  get moves() {
    if (!this.moves_exist_p) {
      return []
    }
    return this.attributes["moves"].split(/\s+/)
  }

  get moves_exist_p() {
    return (this.attributes["moves"] || "") !== ""
  }

  // 最初の局面(1から始まる)
  get init_sfen_from_one() {
    const parts = []
    parts.push("position")
    parts.push("sfen")
    parts.push(this.attributes["board"])
    parts.push(this.attributes["b_or_w"])
    parts.push(this.attributes["hold_pieces"])
    parts.push(1)
    return parts.join(" ")
  }

  // 最初の局面
  get init_sfen() {
    const parts = []
    parts.push("position")
    parts.push("sfen")
    parts.push(this.init_sfen_strip)
    return parts.join(" ")
  }

  // 最初の局面(position sfenなし)
  get init_sfen_strip() {
    const parts = []
    parts.push(this.attributes["board"])
    parts.push(this.attributes["b_or_w"])
    parts.push(this.attributes["hold_pieces"])
    parts.push(this.attributes["turn_counter_next"])
    return parts.join(" ")
  }

  // 元の状態で返す
  // このとき attributes を更新していれば違う形で返せる
  get to_sfen() {
    const parts = []
    parts.push("position")
    parts.push("sfen")
    parts.push(this.attributes["board"])
    parts.push(this.attributes["b_or_w"])
    parts.push(this.attributes["hold_pieces"])
    parts.push(this.attributes["turn_counter_next"])
    if (this.moves_exist_p) {
      parts.push("moves")
      parts.push(this.attributes["moves"])
    }
    return parts.join(" ")
  }

  // private

  __location_by_upper_or_lower_case(v) {
    let key = null
    if (/[A-Z]/.test(v)) {
      key = "black"
    } else {
      key = "white"
    }
    return Location.fetch(key)
  }
}
