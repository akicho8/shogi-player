import { ApplicationMemoryRecord } from "./application_memory_record.js"

export class NameDirectionInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "horizontal", name: "横書き", },
      { key: "vertical",   name: "縦書き", },
    ]
  }
}
