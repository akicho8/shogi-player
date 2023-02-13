import MemoryRecord from "js-memory-record"

export class ModeInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "view", name: "再生", },
      { key: "play", name: "操作", },
      { key: "edit", name: "編集", },
    ]
  }
}

if (process.argv[1] === __filename) {
  console.log(ModeInfo.fetch("simple").key)
  console.log(ModeInfo.fetch("simple").name)
}
