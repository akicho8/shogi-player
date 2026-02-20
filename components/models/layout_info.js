import { ApplicationMemoryRecord } from "./application_memory_record.js"

export class LayoutInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "horizontal", name: "左右", },
      { key: "vertical",   name: "上下", },
    ]
  }
}
