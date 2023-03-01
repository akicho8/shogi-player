import { ApplicationMemoryRecord } from "./application_memory_record.js"

export class LayoutInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "vertical",   name: "縦", },
      { key: "horizontal", name: "横", },
    ]
  }
}
