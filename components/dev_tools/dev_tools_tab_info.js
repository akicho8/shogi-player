import MemoryRecord from "js-memory-record"

export class DevToolsTabInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "基本",   },
      { key: "その他", },
      { key: "Debug",  },
      { key: "$props", },
      { key: "$data",  },
      { key: "Test",   },
    ]
  }
}
