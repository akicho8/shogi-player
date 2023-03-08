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

if (typeof process !== "undefined" && process.argv[1] === __filename) {
  console.log(ModeInfo.fetch("simple").key)
  console.log(ModeInfo.fetch("simple").name)
}
