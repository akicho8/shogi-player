import { ApplicationMemoryRecord } from "./application_memory_record.js"

export class PieceVerticalPositionInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "center", name: "中央",     },
      { key: "bottom", name: "底辺揃え", },
      { key: "top",    name: "頭揃え",   },
    ]
  }
}
