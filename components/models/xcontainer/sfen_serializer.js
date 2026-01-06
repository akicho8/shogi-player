import _ from "lodash"

import { Piece    } from "../piece.js"
import { Location } from "../location.js"

export class SfenSerializer {
  constructor(xcontainer) {
    this.xcontainer = xcontainer
  }

  get to_s() {
    return [
      ...this.__parts,
      this.xcontainer.display_turn + 1,           // 1
    ].join(" ")
  }

  // 局面ペディアのようにターンを指定するとエラーになるものに用いる
  // 千日手判定用のハッシュとしても使える
  get to_s_without_turn() {
    return this.__parts.join(" ")
  }

  // 互換性のためだけに残しているので使うな
  get to_sfen_board() {
    return this.xcontainer.board.to_sfen
  }

  get to_sfen_hold_pieces() {
    let str = Location.values.map((location_info) => {
      const hold_pieces = this.xcontainer.hold_pieces[location_info.key]
      const values = Piece.values.map((e) => { // 玉から歩の順になっている
        let count = hold_pieces[e.key] || 0
        let str = ""
        if (count === 0) {
          return null
        }
        if (count >= 2) {
          str += count
        }
        let key = e.key
        if (location_info.key === "white") {
          key = key.toLowerCase()
        } else {
          key = key.toUpperCase()
        }
        str += key
        return str
      })
      return _.compact(values).join("")
    }).join("")

    if (_.isEmpty(str)) {
      str = "-"
    }

    return str
  }

  // private

  get __parts() {
    return [
      this.xcontainer.board.to_sfen,           // 9/9/9/9...
      this.xcontainer.current_location.key[0], // "b"
      this.to_sfen_hold_pieces,                // "-"
    ]
  }
}
