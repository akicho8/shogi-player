import _ from "lodash"
import { Location } from "./location"

export class ParserBase {
  static parse(raw_body) {
    const instance = new this(raw_body)
    instance.parse()
    return instance
  }

  constructor(raw_body = null) {
    this.reset()
    this.raw_body = raw_body
  }

  reset() {
    this.raw_body = ""
    this.header = {}
  }

  parse() {
  }

  get board() {
    console.warn("not implemented")
  }

  // get hold_pieces() {
  //   return this.hold_pieces_empty_hash()
  // }

  // {"black" => {}, "white" => {}} を得る
  hold_pieces_empty_hash() {
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

  get comment_lines_hash() {
    return null
  }
}

if (typeof process !== "undefined" && process.argv[1] === __filename) {
}
