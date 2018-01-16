import { MemoryRecord } from "./memory_record"

class Location extends MemoryRecord {
  static get define() {
    return [
      { key: "black", name: '☗', },
      { key: "white", name: '☖', },
    ]
  }
}

export { Location }

if (process.argv[1] === __filename) {
  console.log(Location.fetch("black"))

  Location.values.map((e) => {
    console.log(e)
  })
}
