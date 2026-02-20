import { ApplicationMemoryRecord } from "./application_memory_record.js"

export class StandGravityInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "bottom", name: "下寄せ", },
      { key: "top",    name: "上寄せ", },
    ]
  }
}
