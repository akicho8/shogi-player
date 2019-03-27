import _ from "lodash"
import Location from "./location"

export default class ParserBase {
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
    // 次のようにすると w - 2 から始まるときに後手番なのに先手番になってしまう
    // const index = this.turn_min + offset + (this.komaochi_p ? 1 : 0)

    const index = (this.komaochi_p ? 1 : 0) + offset
    return Location.fetch(index % 2)
  }

  get move_infos() {
    console.warn("not implemented")
  }

  get comments_pack() {
    return null
  }
}

if (process.argv[1] === __filename) {
}
