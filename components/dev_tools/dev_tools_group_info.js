import MemoryRecord from "js-memory-record"

export class DevToolsGroupInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "基本",      component_name: "GroupBasic",    },
      { key: "SFEN",      component_name: "GroupSfen",     },
      { key: "Debug",     component_name: "GroupDebug",    },
      { key: "$props",    component_name: "GroupProps",    },
      { key: "$data",     component_name: "GroupData",     },
      { key: "Dev Tools", component_name: "GroupDevTools", },
    ]
  }
}
