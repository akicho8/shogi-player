import MemoryRecord from "js-memory-record"

export class DevToolsLayoutInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "left",   name: "←", },
      { key: "right",  name: "→", },
      { key: "bottom", name: "↓", },
      { key: "top",    name: "↑", },
    ]
  }

  get css_class() {
    return `is_dev_tools_layout_${this.key}`
  }
}
