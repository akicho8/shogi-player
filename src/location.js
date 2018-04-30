import { MemoryRecord } from "./memory_record"

class Location extends MemoryRecord {
  static get define() {
    return [
      { key: "black", name: '☗', },
      { key: "white", name: '☖', },
    ]
  }

  get flip() {
    return Location.cycle_lookup(this.code + 1)
  }

  static cycle_lookup(key) {
    if (typeof key === "number") {
      // -1 % 2 が -1 になってしまうのでごまかす
      key = (Location.values.length + key) % Location.values.length
    }
    return Location.lookup(key)
  }
}

export { Location }

if (process.argv[1] === __filename) {
  console.log(Location.cycle_lookup(-1))

  console.log(Location.fetch("black"))

  Location.values.map((e) => {
    console.log(e)
  })

  console.log(Location.fetch("black").flip)
  console.log(Location.fetch("white").flip)

}
