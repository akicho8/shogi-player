import { ApplicationMemoryRecord } from "./application_memory_record.js"

export class StandFlipInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "true",  name: "する",   native_value: true,  },
      { key: "false", name: "しない", native_value: false, },
    ]
  }
}
