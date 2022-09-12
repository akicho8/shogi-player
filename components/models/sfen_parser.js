import XRegExp from "xregexp"
import Vue from "vue"
import _ from "lodash"

import { Board      } from "./board.js"
import { ParserBase } from "./parser_base.js"
import { Piece      } from "./piece.js"
import { Place      } from "./place.js"
import { Soldier    } from "./soldier.js"
import { Location   } from "./location.js"
import { MoveHash   } from "./move_hash.js"
import { Mediator   } from "./mediator.js"

export class SfenParser extends ParserBase {
  static sfen_flop(sfen) {
    const source = this.parse(sfen)

    // 方法1. Mediator を仲介する方法
    // 一応動くけど Mediator まで出動する必要はない
    // もっと下位層のライブラリで行うべき
    if (false) {
      const mediator = new Mediator()
      mediator.data_source = source
      mediator.current_turn = 0
      mediator.run()
      mediator.board = mediator.board.flop

      const parts = []
      parts.push(mediator.to_short_sfen)

      const v = source.move_infos
      if (v.length >= 1) {
        parts.push("moves")
        parts.push(v.map(e => e.to_flop_sfen).join(" "))
      }

      return parts.join(" ")
    }

    // 方法2. SFENパーサーで読み取ってそのままSFEN出力する間で属性を変更する方法
    if (true) {
      source.attributes["board"] = source.board.flop.to_sfen
      source.attributes["moves"] = source.move_infos.map(e => e.to_flop_sfen).join(" ")
      return source.to_sfen
    }
  }

  reset() {
    super.reset()
    this.attributes = {}
  }

  parse() {
    this.raw_body = this.raw_body.replace(/startpos/, "sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1")
    const regex = XRegExp("sfen\\s+(?<board>\\S+)\\s+(?<b_or_w>\\S+)\\s+(?<hold_pieces>\\S+)\\s+(?<turn_counter_next>\\d+)(\\s+moves\\s+(?<moves>.*))?")
    this.attributes = XRegExp.exec(this.raw_body, regex)
    if (process.env.NODE_ENV === "deveopment") {
      console.log(this.attributes)
    }
  }

  get board() {
    const board = new Board()
    this.attributes["board"].split("/").forEach((e, y) => {
      let x = 0
      XRegExp.forEach(e, XRegExp("(?<promoted>\\+?)(?<piece>\\S)"), (m, i) => {
        if (/\d+/.test(m.piece)) {
          x += Number(m.piece)
        } else {
          const soldier = new Soldier({
            place: new Place([x, y]),
            piece: Piece.fetch(m.piece),
            promoted: (m.promoted === "+"),
            location: this.__location_by_upper_or_lower_case(m.piece),
          })
          board.place_on(soldier)
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
        count += hash[location.key][piece.key] || 0
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
  //
  //   以下のようにしてもよい
  //   const sfen_parser = new SfenParser()
  //   sfen_parser.raw_body = "position sfen 7nl/7k1/9/7pp/6N2/9/9/9/9 b GS2r2b3g3s2n3l16p 2"
  //   sfen_parser.parse()
  //   sfen_parser.attributes.turn_counter_next = 1
  //   expect(sfen_parser.init_sfen).toEqual('position sfen 7nl/7k1/9/7pp/6N2/9/9/9/9 b GS2r2b3g3s2n3l16p 1')
  //
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

if (process.argv[1] === __filename) {
  let sfen_parser

  sfen_parser = SfenParser.parse("position sfen +lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b S2s 1 moves 7i6h S*2d")
  console.log(sfen_parser)

  sfen_parser = SfenParser.parse("position sfen +lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b S2s 1 moves 7i6h S*2d")
  console.log(sfen_parser)

  // sfen_parser = new SfenParser("position sfen +lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b S2s 1 moves 7i6h S*2d")
  // sfen_parser.parse()
  // console.log(sfen_parser.board)
  // console.log(sfen_parser.base_location.key)
  // console.log(sfen_parser.hold_pieces)
  // console.log(sfen_parser.move_infos)
  // console.log(sfen_parser.moves)
  // console.log(sfen_parser.init_sfen)
  //
  // sfen_parser = new SfenParser("position sfen lr4knl/3g2gs1/4ppP2/p4bNpp/2pSsN3/PPPP1P2P/2N1P1G2/2G6/L1K4RL w BPs3p 72 moves 2b3c")
  // sfen_parser.parse()
  // console.log(sfen_parser.location_by_offset(0))
}
