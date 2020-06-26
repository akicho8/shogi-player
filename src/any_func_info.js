import MemoryRecord from "js-memory-record"
import Location from "./location"

export default class AnyFuncInfo extends MemoryRecord {
  static get define() {
    return [
      /* eslint-disable */
      { key: "☖の持駒を駒箱へ",    func: e => { e.mediator.hold_pieces_to_piece_box(Location.fetch("white")) }, },
      { key: "駒箱から☖の持駒へ",  func: e => { e.mediator.piece_box_to_hold_pieces(Location.fetch("white")) }, },
      { key: "駒箱に駒を一式生成", func: e => { e.mediator.piece_box_reset_by_preset("全部駒箱") }, },
      { key: "駒箱の駒をクリア",   func: e => { e.mediator.piece_box_clear() }, },
      { key: "検討用玉配置(左)",   func: e => { e.mediator.kento_you_jigyoku_haiti({position: "left"}) }, },
      { key: "検討用玉配置(右)",   func: e => { e.mediator.kento_you_jigyoku_haiti({position: "right"}) }, },
      { key: "検討用玉回収(左)",   func: e => { e.mediator.kento_you_jigyoku_haiti2({position: "left"}) }, },
      { key: "検討用玉回収(右)",   func: e => { e.mediator.kento_you_jigyoku_haiti2({position: "right"}) }, },
      /* eslint-enable */
    ]
  }
}
