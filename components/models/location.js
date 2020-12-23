import MemoryRecord from "js-memory-record"

export default class Location extends MemoryRecord {
  static get define() {
    return [
      // { key: "black", name: '☗', hirate_name: "先手", komaochi_name: "下手", char_key: "b", },
      // { key: "white", name: '☖', hirate_name: "後手", komaochi_name: "上手", char_key: "w", },
      { key: "black", name: '☗', char_key: "b", value_sign: +1, position_key: "is_position_south", },
      { key: "white", name: '☖', char_key: "w", value_sign: -1, position_key: "is_position_north", },
    ]
  }

  static cycle_lookup(value) {
    if (typeof value !== "number") {
      alert(`ArgumentError: ${value}`)
    }
    return Location.lookup(Math.abs(value) % Location.values.length)
  }

  get flip() {
    return Location.cycle_lookup(this.code + 1)
  }

  // any_name(komaochi_p) {
  //   return komaochi_p ? this.komaochi_name : this.hirate_name
  // }

  advance(value) {
    return Location.cycle_lookup(this.code + value)
  }

  flip_if(flip) {
    return this.advance(flip ? 1 : 0)
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
  // console.log(Location.fetch("white").any_name(false))
  // console.log(Location.fetch("white").any_name(true))
}
