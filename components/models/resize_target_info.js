import { ApplicationMemoryRecord } from "./application_memory_record.js"

export class ResizeTargetInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "BoardBase",   selector: ".BoardBase",   threshold: 0,   attr_w: "sp_board_w", attr_h: "sp_board_h", },
      { key: "BoardCell", selector: ".BoardCell", threshold: 1.5, attr_w: "sp_cell_w",  attr_h: "sp_cell_h",  },
    ]
  }
}
