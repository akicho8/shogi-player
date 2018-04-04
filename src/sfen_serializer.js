import _ from "lodash"

import { Piece } from "./piece"
import { Place } from "./place"
import { Mediator } from "./mediator"
import { Location } from "./location"
import { Board } from "./board"

class SfenSerializer {
  constructor(mediator) {
    this.mediator = mediator
  }

  get to_s() {
    const parts = []
    parts.push(this.to_board_sfen)                    // 9/9/9/9...
    parts.push(this.mediator.current_location.key[0]) // "b"
    parts.push(this.to_hold_pieces)                   // "-"
    parts.push(this.mediator.real_turn + 1)     // 1
    return parts.join(" ")
  }

  get to_board_sfen() {
    const rows = []
    _.times(Board.dimension, (y) => {
      let str = ""
      let space = 0
      _.times(Board.dimension, (x) => {
        const place = Place.fetch([x, y])
        const soldier = this.mediator.board.lookup(place)
        if (_.isNil(soldier)) {
          space++
        } else {
          if (space >= 1) {
            str += space
            space = 0
          }
          if (soldier.promoted) {
            str += "+"
          }
          let key = soldier.piece.key
          if (soldier.location.key === "white") {
            key = key.toLowerCase()
          }
          str += key
        }
      })
      if (space >= 1) {
        str += space
      }
      rows.push(str)
    })
    return rows.join("/")
  }

  get to_hold_pieces() {
    let str = Location.values.map((location_info) => {
      const hold_pieces = this.mediator.hold_pieces[location_info.key]
      const values = Piece.values.map((e) => {
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
}

export { SfenSerializer }

if (process.argv[1] === __filename) {
  const mediator = new Mediator()
  mediator.kifu_body = "position sfen +lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b S2s 1 moves 7i6h S*2d"
  mediator.current_turn = 1
  mediator.run()
  const sfen_serializer = new SfenSerializer(mediator)
  console.log(sfen_serializer.to_s)
}
