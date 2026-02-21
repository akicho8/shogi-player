import { ApplicationMemoryRecord } from "../../models/application_memory_record.js"

export class AllShowInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "false", name: "差分のみ",   native_value: false, },
      { key: "true",  name: "すべて表示", native_value: true,  },
    ]
  }
}
