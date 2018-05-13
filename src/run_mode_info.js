import { MemoryRecord } from "./memory_record"

class RunModeInfo extends MemoryRecord {
  static get define() {
    return [
      /* eslint-disable */
      { key: "view_mode", name: "再生", },
      { key: "play_mode", name: "操作", },
      { key: "edit_mode", name: "編集", },
      /* eslint-enable */
    ]
  }

  get name() {
    return this.attributes.name
  }
}

export { RunModeInfo }

if (process.argv[1] === __filename) {
  console.log(RunModeInfo.fetch("simple").key)
  console.log(RunModeInfo.fetch("simple").name)
}
