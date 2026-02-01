import _ from "lodash"
import { Place } from "../place.js"
import { GX } from "../gx"

export class TurnMethods {
  // ruby style array index access
  get turn_offset() {
    let index = Number(this.current_turn)
    if (index < 0) {
      index += this.turn_offset_max + 1
    }
    return this.turn_clamp(index)
  }

  turn_clamp(index) {
    return _.clamp(Number(index), this.turn_offset_min, this.turn_offset_max)
  }

  turn_cycle(index) {
    return GX.imodulo(Number(index), this.turn_offset_max + 1)
  }

  get previous_location() {
    return this.data_source.location_by_offset(this.turn_offset - 1)
  }

  get current_location() {
    return this.data_source.location_by_offset(this.turn_offset)
  }

  get current_comments() {
    if (this.data_source.comment_lines_hash) {
      return this.data_source.comment_lines_hash[this.turn_offset]
    }
  }

  get turn_offset_min() {
    return this.data_source.turn_offset_min
  }

  get turn_offset_max() {
    return this.data_source.turn_offset_max
  }

  get current_turn_label() {
    if (this.turn_offset === this.turn_offset_max) {
      return `まで${this.display_turn}手で${this.previous_location.name}の勝ち`
    } else {
      return `${this.display_turn}手`
    }
  }

  // 100手目から始まっている棋譜でオフセットが20のときは足して 120 を返す
  get display_turn() {
    return this.turn_base + this.turn_offset
  }

  // 何手目から始まっているかを返す
  get turn_base() {
    return this.data_source.turn_base
  }
}
