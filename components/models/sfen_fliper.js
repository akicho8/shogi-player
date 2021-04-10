import { SfenParser } from "./sfen_parser.js"
import { Mediator   } from "./mediator.js"

export class SfenFliper {
  static sfen_flip_h(body) {
    this.source = SfenParser.parse(body)

    this.mediator = new Mediator()
    this.mediator.data_source = this.source
    this.mediator.current_turn = 0
    this.mediator.run()
    this.mediator.board = this.mediator.board.flip_h

    const parts = []
    parts.push(this.mediator.to_position_sfen)
    const move_infos = this.source.move_infos
    if (move_infos.length >= 1) {
      parts.push("moves")
      parts.push(move_infos.map(e => this.move_flip_h(e)).join(" "))
    }
    return parts.join(" ")
  }

  static move_flip_h(e) {
    const list = []
    if (e["drop_piece"]) {
      list.push(e["drop_piece"].key)
      list.push("*")
    } else {
      list.push(e["origin_place"].flip_h.to_sfen)
    }
    list.push(e["place"].flip_h.to_sfen)
    if (e["promoted_trigger"]) {
      list.push("+")
    }
    return list.join("")
  }
}
