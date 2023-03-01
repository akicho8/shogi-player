import { ApplicationMemoryRecord } from "./application_memory_record.js"
import { Location } from "./location"

export class EditToolInfo extends ApplicationMemoryRecord {
  static get define() {
    return [

      { name: "☖の持駒を駒箱へ",   func: e => { e.xcontainer.hold_pieces_to_piece_box(Location.fetch("white")) }, },
      { name: "駒箱から☖の持駒へ", func: e => { e.xcontainer.piece_box_to_hold_pieces(Location.fetch("white")) }, },
      { name: "駒箱を正規化",       func: e => { e.xcontainer.piece_box_piece_counts_adjust() }, },
      { name: "",                   func: null },
      { name: "駒箱に駒を一式生成", func: e => { e.xcontainer.piece_box_reset_by_preset("全部駒箱") }, },
      { name: "駒箱の駒をクリア",   func: e => { e.xcontainer.piece_box_clear() }, },
      { name: "指将棋用玉配置",     func: e => { e.xcontainer.king_formation_auto_set()   }, },
      { name: "指将棋用玉回収",     func: e => { e.xcontainer.king_formation_auto_unset() }, },
      { name: "視点切り替え",       func: e => { e.api_viewpoint_flip() }, },

      // { name: "盤面をシャッフル",   func: e => { e.xcontainer.shuffle_apply(4) }, },
      { name: "盤面シャッフル",     func: e => { e.shuffle_dialog_open_handle() }, },
      { name: "上ローテイト",       func: e => { e.xcontainer.slide_xy(0, -1) }, },
      { name: "下ローテイト",       func: e => { e.xcontainer.slide_xy(0, 1)  }, },
      { name: "左ローテイト",       func: e => { e.xcontainer.slide_xy(-1, 0) }, },
      { name: "右ローテイト",       func: e => { e.xcontainer.slide_xy(1, 0)  }, },

      // { name: "指将棋用玉配置(左)", func: e => { e.xcontainer.king_formation_set("bottom_left") }, },
      // { name: "指将棋用玉回収(左)", func: e => { e.xcontainer.king_formation_unset("bottom_left") }, },
      // { name: "指将棋用玉配置(右)", func: e => { e.xcontainer.king_formation_set("bottom_right") }, },
      // { name: "指将棋用玉回収(右)", func: e => { e.xcontainer.king_formation_unset("bottom_right") }, },

    ]
  }
}
