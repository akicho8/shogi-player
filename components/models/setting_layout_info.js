import MemoryRecord from "js-memory-record"

export class SettingLayoutInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "left",   },
      { key: "right",  },
      { key: "bottom", },
      { key: "top",    },
    ]
  }
  
  get css_class() {
    return `is_setting_layout_${this.key}`
  }
}
