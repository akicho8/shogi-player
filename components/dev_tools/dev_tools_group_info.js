import MemoryRecord from "js-memory-record"

export class DevToolsGroupInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "main",  name: "Main",      icon: null,  component: "GroupMain",  },
      { key: "style", name: "Style",     icon: null,  component: "GroupStyle", },
      { key: "sfen",  name: "SFEN",      icon: null,  component: "GroupSfen",  },
      { key: "debug", name: "Debug",     icon: null,  component: "GroupDebug", },
      { key: "props", name: "$props",    icon: null,  component: "GroupProps", },
      { key: "data",  name: "$data",     icon: null,  component: "GroupData",  },
      { key: "cog",   name: null,        icon: "cog", component: "GroupCog",   },
    ]
  }
}
