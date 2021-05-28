import MemoryRecord from "js-memory-record"

export class PositionInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "is_position_north", name: "北", sign: -1, },
      { key: "is_position_south", name: "南", sign: +1, },
    ]
  }
}
