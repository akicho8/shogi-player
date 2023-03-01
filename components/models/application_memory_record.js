import MemoryRecord from "js-memory-record"

export class ApplicationMemoryRecord extends MemoryRecord {
  // グローバルで完全ユニークなキーとする
  get unique_key() {
    return [this.constructor.name, this.key].join("/")
  }
}
