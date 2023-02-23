import MemoryRecord from "js-memory-record"

export class DevToolsLayoutInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "left",   },
      { key: "right",  },
      { key: "bottom", },
      { key: "top",    },
    ]
  }

  get css_class() {
    return `is_dev_tools_layout_${this.key}`
  }
}
