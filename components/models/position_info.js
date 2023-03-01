import { ApplicationMemoryRecord } from "./application_memory_record.js"

export class PositionInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "is_position_north", name: "北", sign: -1, },
      { key: "is_position_south", name: "南", sign: +1, },
    ]
  }
}
