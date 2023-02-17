import MemoryRecord from "js-memory-record"

export class DeviseInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "mouse", name: "マウス操作", gap: 0.0, description: "タップも可能な端末であっても先にマウス操作したらマウス", },
      { key: "touch", name: "タップ操作", gap: 0.0, description: "基本的にスマホはこちら",                                 },
    ]
  }
}
