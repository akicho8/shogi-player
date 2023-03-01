import { ApplicationMemoryRecord } from "../models/application_memory_record.js"

export class DevToolsPositionInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "left",   name: "←", },
      { key: "bottom", name: "↓", },
      { key: "right",  name: "→", },
      { key: "top",    name: "↑", },
    ]
  }

  get css_class() {
    return `is_dev_tools_position_${this.key}`
  }
}
