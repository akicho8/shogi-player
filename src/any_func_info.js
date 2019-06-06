import MemoryRecord from "js-memory-record"
import Location from "./location"

export default class AnyFuncInfo extends MemoryRecord {
  static get define() {
    return [
      /* eslint-disable */
      { key: "☖の持駒を駒箱へ",   func: e => { e.mediator.hold_pieces_to_piece_box(Location.fetch("white")) }, },
      { key: "駒箱から☖の持駒へ", func: e => { e.mediator.piece_box_to_hold_pieces(Location.fetch("white")) }, },
      /* eslint-enable */
    ]
  }
}
