import MemoryRecord from 'js-memory-record'

export class MixBlendModeInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "normal",  desc: "a", },
      { key: "screen",  desc: "b", },
    ]
  }
}
