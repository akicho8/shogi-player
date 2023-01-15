import _ from "lodash"

import { Piece } from "./piece"
import { Place } from "./place"
import { Xcontainer } from "./xcontainer"
import { Location } from "./location"
import { Board } from "./board"

export class SfenSerializer {
  constructor(xcontainer) {
    this.xcontainer = xcontainer
  }

  get to_s() {
    const parts = this.__base_parts
    parts.push(this.xcontainer.display_turn + 1)           // 1
    return parts.join(" ")
  }

  // 局面ペディアのようにターンを指定するとエラーになるものに用いる
  // 千日手判定用のハッシュとしても使える
  get to_s_without_turn() {
    return this.__base_parts.join(" ")
  }

  get to_board_sfen() {
    return this.xcontainer.board.to_sfen
  }

  get to_hold_pieces() {
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

  get __base_parts() {
    const parts = []
    parts.push(this.to_board_sfen)                    // 9/9/9/9...
    parts.push(this.xcontainer.current_location.key[0]) // "b"
    parts.push(this.to_hold_pieces)                   // "-"
    return parts
  }
}

if (process.argv[1] === __filename) {
  const xcontainer = new Xcontainer()
  xcontainer.source = "position sfen +lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b S2s 1 moves 7i6h S*2d"
  xcontainer.current_turn = 1
  xcontainer.run()
  const sfen_serializer = new SfenSerializer(xcontainer)
  console.log(sfen_serializer.to_s)
}
