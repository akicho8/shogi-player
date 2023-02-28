import MemoryRecord from "js-memory-record"

export class LayoutInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "vertical",   name: "縦", },
      { key: "horizontal", name: "横", },
    ]
  }
}
