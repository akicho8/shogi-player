import { ApplicationMemoryRecord } from "./application_memory_record.js"

export class DeviseInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "mouse", name: "マウス操作", gap: 0.0, description: "タップも可能な端末であっても先にマウス操作したらマウス", },
      { key: "touch", name: "タップ操作", gap: 0.0, description: "基本的にスマホはこちら",                                 },
    ]
  }
}
