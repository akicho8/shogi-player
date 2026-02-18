import { ApplicationMemoryRecord } from "./application_memory_record.js"

export class ModeInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "view", name: "再生", },
      { key: "play", name: "操作", },
      { key: "edit", name: "編集", },
    ]
  }
}
