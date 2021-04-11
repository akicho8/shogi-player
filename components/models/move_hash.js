import XRegExp from "xregexp"
import { Piece } from "./piece.js"
import { Place } from "./place.js"

export class MoveHash {
  // 複数の指し手の左右反転
  static line_hflip(moves_str) {
    const v = this.parse_line(moves_str)
    return v.map(e => e.to_hflip_sfen).join(" ")
  }

  // 指し手1つの左右反転
  static str_hflip(move_str) {
    const v = this.parse(move_str)
    if (v) {
      return v.to_hflip_sfen
    }
  }

  static parse_line(line) {
    const s = line || ""
    if (s === "") {
      return []
    }
    return s.split(/\s+/).map(e => this.parse(e))
  }

  static parse(move_str) {
    const md = XRegExp.exec(move_str, XRegExp("(?<origin_x>\\S)(?<origin_y>\\S)(?<pos_x>\\S)(?<pos_y>\\S)(?<promoted>\\+?)?"))
    if (!md) {
      return null
    }
    return new this(md)
  }

  constructor(md) {
    this["promoted_trigger"] = (md["promoted"] === "+")
    if (md["origin_y"] === "*") {
      this["drop_piece"] = Piece.fetch(md["origin_x"])
    } else {
      this["origin_place"] = Place.fetch(`${md["origin_x"]}${md["origin_y"]}`)
    }
    this["place"] = Place.fetch(`${md["pos_x"]}${md["pos_y"]}`)
  }

  get to_sfen() {
    return this.to_custom_sfen()
  }

  get to_hflip_sfen() {
    return this.to_custom_sfen({hflip: true})
  }

  // prviate

  // SFEN変換
  //
  //  MoveHash.parse("S*2d").to_custom_sfen()               # => "S*2d"
  //  MoveHash.parse("S*2d").to_custom_sfen({hflip: true}) # => "S*8d"
  //
  to_custom_sfen(options = {}) {
    const a = []
    if (this["drop_piece"]) {
      a.push(this["drop_piece"].key)
      a.push("*")
    } else {
      a.push(this["origin_place"].hflip_if(options.hflip).to_sfen)
    }
    a.push(this["place"].hflip_if(options.hflip).to_sfen)
    if (this["promoted_trigger"]) {
      a.push("+")
    }
    return a.join("")
  }
}
