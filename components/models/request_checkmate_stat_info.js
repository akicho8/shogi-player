import { ApplicationMemoryRecord } from "./application_memory_record.js"

export class RequestCheckmateStatInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { name: "false", name: "OFF", native_value: false, },
      { name: "true",  name: "ON",  native_value: true,  },
    ]
  }
}
