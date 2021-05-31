import MemoryRecord from "js-memory-record"

export class DeviseInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "is_device_desktop", name: "マウス操作", gap: 0.0, description: "タップも可能な端末であっても先にマウス操作したらマウス", },
      { key: "is_device_touch",   name: "タップ南",   gap: 0.0, description: "基本的にスマホはこちら",                                 },
    ]
  }
}
