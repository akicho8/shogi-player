import MemoryRecord from "js-memory-record"

export class DevToolsPositionInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "left",   name: "←", },
      { key: "right",  name: "→", },
      { key: "bottom", name: "↓", },
      { key: "top",    name: "↑", },
    ]
  }

  get css_class() {
    return `is_dev_tools_position_${this.key}`
  }
}
