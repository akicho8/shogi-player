import { ApplicationMemoryRecord } from "./application_memory_record.js"

export class BalloonInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "true",  name: "ON",  native_value: true,  },
      { key: "false", name: "OFF", native_value: false, },
    ]
  }
}
