import { ApplicationMemoryRecord } from "./application_memory_record.js"

export class PieceVerticalPositionInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "top",    name: "↑", },
      { key: "center", name: "・", },
      { key: "bottom", name: "↓", },
    ]
  }
}
