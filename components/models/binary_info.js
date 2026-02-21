import { ApplicationMemoryRecord } from "./application_memory_record.js"

export class BinaryInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "false", name: "OFF", native_value: false, },
      { key: "true",  name: "ON",  native_value: true,  },
    ]
  }
}
