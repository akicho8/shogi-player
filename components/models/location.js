import { ApplicationMemoryRecord } from "./application_memory_record.js"

export class Location extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "black", name: "☗", char_key: "b", value_sign: +1, position_key: "is_position_south", long_name: "先手", handicap_long_name: "下手", },
      { key: "white", name: "☖", char_key: "w", value_sign: -1, position_key: "is_position_north", long_name: "後手", handicap_long_name: "上手", },
    ]
  }

  static cycle_lookup(value) {
    if (typeof value !== "number") {
      throw new Error(`ArgumentError: ${this.name}.cycle_lookup(${JSON.stringify(value)})`)
    }
    return this.lookup(Math.abs(value) % this.values.length)
  }

  get flip() {
    return this.constructor.cycle_lookup(this.code + 1)
  }

  // shogi-player のなかでは使っていないが別のところで使っているので消しはいけない
  any_long_name(handicap_p) {
    if (handicap_p) {
      return this.handicap_long_name
    } else {
      return this.long_name
    }
  }

  advance(value) {
    return this.constructor.cycle_lookup(this.code + value)
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
