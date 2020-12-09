import MemoryRecord from "js-memory-record"

export default class RunModeInfo extends MemoryRecord {
  static get define() {
    return [
      
      { key: "view_mode", name: "再生", },
      { key: "play_mode", name: "操作", },
      { key: "edit_mode", name: "編集", },
      
    ]
  }
}

if (process.argv[1] === __filename) {
  console.log(RunModeInfo.fetch("simple").key)
  console.log(RunModeInfo.fetch("simple").name)
}
