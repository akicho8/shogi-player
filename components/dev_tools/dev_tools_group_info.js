import MemoryRecord from "js-memory-record"

export class DevToolsGroupInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "main",  name: "main",      icon: null,  component: "GroupMain", },
      { key: "sfen",  name: "SFEN",      icon: null,  component: "GroupSfen",  },
      { key: "debug", name: "Debug",     icon: null,  component: "GroupDebug", },
      { key: "props", name: "$props",    icon: null,  component: "GroupProps", },
      { key: "data",  name: "$data",     icon: null,  component: "GroupData",  },
      { key: "cog",   name: null,        icon: "cog", component: "GroupCog",   },
    ]
  }
}