import _ from "lodash"
import { Location } from "./location"

class ParserBase {
  constructor() {
    this.kifu_body = null
    this.header = {}
  }

  parse() {
  }

  get board() {
    console.warn("not implemented")
  }

  get hold_pieces() {
    return _.reduce(Location.values, (a, e) => {
      a[e.key] = {}
      return a
    }, {})
  }

  get turn_min() {
    return 0
  }

  get turn_max() {
    return this.turn_min + this.move_infos.length
  }

  location_by_offset(offset) {
    const index = this.turn_min + offset + (this.komaochi_p ? 1 : 0)
    let key = null
    if ((index % 2) === 0) {
      key = "black"
    } else {
      key = "white"
    }
    return Location.fetch(key)
  }

  get move_infos() {
    console.warn("not implemented")
  }

  get comments_pack() {
    return null
  }
}

export { ParserBase }

if (process.argv[1] === __filename) {
}
