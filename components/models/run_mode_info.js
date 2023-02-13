import MemoryRecord from "js-memory-record"

export class RunModeInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "view", name: "再生", },
      { key: "play", name: "操作", },
      { key: "edit", name: "編集", },
    ]
  }
}

if (process.argv[1] === __filename) {
  console.log(RunModeInfo.fetch("simple").key)
  console.log(RunModeInfo.fetch("simple").name)
}
