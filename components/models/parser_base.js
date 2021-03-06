import _ from "lodash"
import { Location } from "./location"

export class ParserBase {
  constructor(raw_body = null) {
    this.raw_body = raw_body
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

  get turn_offset_min() {
    return 0
  }

  get turn_offset_max() {
    return this.move_infos.length
  }

  get turn_base() {
    return 0
  }

  location_by_offset(offset) {
    return this.base_location.advance(offset)

    // 次のようにすると w - 2 から始まるときに後手番なのに先手番になってしまう ← いや、あってる
    // const index = this.turn_offset_min + offset + (this.komaochi_p ? 1 : 0)

    // const index = this.turn_offset_min + (this.komaochi_p ? 1 : 0) + offset
    // "position startpos" の場合 index が -1 になり (-1 % 2) が -1 になり Location.fetch(-1) でエラーになる
    // なので Math.abs
    // return Location.fetch(Math.abs(index) % 2)
  }

  // 最後の手番
  get last_location() {
    return this.location_by_offset(this.turn_offset_max - 1)
  }

  // 次の手番
  get next_location() {
    return this.location_by_offset(this.turn_offset_max)
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
