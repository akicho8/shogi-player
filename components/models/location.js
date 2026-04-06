import { GX } from "./gx"
import { ApplicationMemoryRecord } from "./application_memory_record.js"

export class Location extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "black", name: "☗", char_key: "b", value_sign: +1, position_key: "is_position_south", long_name: "先手", handicap_long_name: "下手", human_color_name: "黒", pentagon_char: "☗", polygon_char: "▲", },
      { key: "white", name: "☖", char_key: "w", value_sign: -1, position_key: "is_position_north", long_name: "後手", handicap_long_name: "上手", human_color_name: "白", pentagon_char: "☖", polygon_char: "△", },
    ]
  }

  static get black() { return this.fetch("black") }
  static get white() { return this.fetch("white") }

  static cycle_lookup(value) {
    GX.assert_kind_of_integer(value)
    const wrapped_index = GX.imodulo(value, this.values.length)
    return this.lookup(wrapped_index)
  }

  advance(value = 1) {
    return this.constructor.cycle_lookup(this.code + value)
  }
  get next()     { return this.advance(1)  }
  get previous() { return this.advance(-1) }
  get flip()     { return this.next        }

  flip_if(flip) {
    return this.advance(flip ? 1 : 0)
  }

  // 先手の持駒の飛車なら black_R を返す
  general_mark_pos_key(piece) {
    return [this.key, piece.key].join("_")
  }

  // shogi-player のなかでは使っていないが別のところで使っているので消しはいけない
  any_long_name(handicap_p) {
    if (handicap_p) {
      return this.handicap_long_name
    } else {
      return this.long_name
    }
  }
}
