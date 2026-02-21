import { ApplicationMemoryRecord } from "./application_memory_record.js"

export class ResizeTargetInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "MainBoard", selector: ".MainBoard", attr_w: "sp_board_entire_current_w", attr_h: "sp_board_entire_current_h", },
      { key: "BoardCell", selector: ".BoardCell", attr_w: "sp_board_cell_current_w",  attr_h: "sp_board_cell_current_h",    },
    ]
  }
}
