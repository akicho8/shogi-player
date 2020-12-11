import MemoryRecord from "js-memory-record"
import Location from "./location"

export default class HumanSideInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "both",   name: "☗☖", location_keys: ["black", "white"], },
      { key: "black",  name: "☗",   location_keys: ["black"],          },
      { key: "white",  name: "☖",   location_keys: ["white"],          },
      { key: "none",   name: "なし", location_keys: [],                 },
    ]
  }

  get locations() {
    return this.location_keys.map((e) => Location.fetch(e))
  }
}

if (process.argv[1] === __filename) {
  console.log(HumanSideInfo.fetch("both").locations)
}
