import XRegExp from "xregexp"
import Vue from "vue"
import _ from "lodash"

import Board from "./board"
import ParserBase from "./parser_base"
import Piece from "./piece"
import Place from "./place"
import Soldier from "./soldier"
import Location from "./location"

export default class SfenParser extends ParserBase {
  static parse(kifu_body) {
    const object = new this(kifu_body)
    object.parse()
    return object
  }

  parse() {
    this.kifu_body = this.kifu_body.replace(/startpos/, "sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1")
    const regex = XRegExp("sfen\\s+(?<board>\\S+)\\s+(?<b_or_w>\\S+)\\s+(?<hold_pieces>\\S+)\\s+(?<turn_counter_next>\\d+)(\\s+moves\\s+(?<moves>.*))?")
    this.attributes = XRegExp.exec(this.kifu_body, regex)
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

  get location_base() {
    let key = null
    if (this.attributes["b_or_w"] === "b") {
      key = "black"
    } else {
      key = "white"
    }
    return Location.fetch(key)
  }

  get hold_pieces() {
    const _hold_pieces = super.hold_pieces
    if (this.attributes["hold_pieces"] !== "-") {
      XRegExp.forEach(this.attributes["hold_pieces"], XRegExp("(?<count>\\d+)?(?<piece_char>\\S)"), (md, i) => {
        const piece = Piece.fetch(md.piece_char)
        let count = Number(md.count || 1)
        const location = this.__location_by_upper_or_lower_case(md.piece_char)
        count += _hold_pieces[location.key][piece.key] || 0
        Vue.set(_hold_pieces[location.key], piece.key, count)
      })
    }
    return _hold_pieces
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
  //   return (this.turn_offset_min % 2) === 0 && this.location_base.key === "white"
  // }

  get move_infos() {
    // this.moves.map((e, i) => { としたかったが break できないため lodash の forEach に変更。lodash のは false で break できる
    const ary = []
    _.forEach(this.moves, (e, i) => {
      const attrs = {}
      // if (true) {
      //   attrs["scene_index"] = this.turn_offset_min + i
      //   attrs["scene_offset"] = i
      // }
      attrs["location"] = this.location_base.advance(i)
      const md = XRegExp.exec(e, XRegExp("(?<origin_x>\\S)(?<origin_y>\\S)(?<pos_x>\\S)(?<pos_y>\\S)(?<promoted>\\+?)?"))
      if (!md) {
        return false            // break
      }
      attrs["promoted_trigger"] = (md.promoted === "+")
      if (md["origin_y"] === "*") {
        attrs["drop_piece"] = Piece.fetch(md["origin_x"])
      } else {
        attrs["origin_place"] = Place.fetch(`${md["origin_x"]}${md["origin_y"]}`)
      }
      attrs["place"] = Place.fetch(`${md["pos_x"]}${md["pos_y"]}`)
      ary.push(attrs)
    })
    return ary
  }

  get moves() {
    let moves = this.attributes["moves"]
    if (_.isNil(moves) || moves === "") {
      return []
    }
    return moves.split(/\s+/)
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
  // console.log(sfen_parser.location_base.key)
  // console.log(sfen_parser.hold_pieces)
  // console.log(sfen_parser.move_infos)
  // console.log(sfen_parser.moves)
  // console.log(sfen_parser.init_sfen)
  //
  // sfen_parser = new SfenParser("position sfen lr4knl/3g2gs1/4ppP2/p4bNpp/2pSsN3/PPPP1P2P/2N1P1G2/2G6/L1K4RL w BPs3p 72 moves 2b3c")
  // sfen_parser.parse()
  // console.log(sfen_parser.location_by_offset(0))
}
