import MemoryRecord from "js-memory-record"

export default class Location extends MemoryRecord {
  static get define() {
    return [
      { key: "black", name: '☗', hirate_name: "先手", komaochi_name: "下手", char_key: "b", },
      { key: "white", name: '☖', hirate_name: "後手", komaochi_name: "上手", char_key: "w", },
    ]
  }

  static cycle_lookup(key) {
    if (typeof key === "number") {
      // -1 % 2 が -1 になってしまうのでごまかす
      key = (Location.values.length + key) % Location.values.length
    }
    return Location.lookup(key)
  }

  get flip() {
    return Location.cycle_lookup(this.code + 1)
  }

  any_name(komaochi_p) {
    return komaochi_p ? this.komaochi_name : this.hirate_name
  }
}

if (process.argv[1] === __filename) {
  console.log(Location.cycle_lookup(-1))

  console.log(Location.fetch("black"))

  Location.values.map((e) => {
    console.log(e)
  })

  console.log(Location.fetch("black").flip)
  console.log(Location.fetch("white").flip)
  console.log(Location.fetch("white").any_name(false))
  console.log(Location.fetch("white").any_name(true))
}
