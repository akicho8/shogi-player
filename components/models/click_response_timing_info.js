import { ApplicationMemoryRecord } from "./application_memory_record.js"

export class ClickResponseTimingInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "slow", name: "離したとき", method: "click",       },
      { key: "fast", name: "触れたとき", method: "pointerdown", },
    ]
  }
}
