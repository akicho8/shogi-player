import MemoryRecord from "js-memory-record"

export class SoundPresetInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "piece_put",  },
    ]
  }
}
