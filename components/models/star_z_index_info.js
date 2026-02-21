import { ApplicationMemoryRecord } from "./application_memory_record.js"

export class StarZIndexInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { name: "0",  native_value:  0, },
      { name: "-1", native_value: -1, },
    ]
  }
}
