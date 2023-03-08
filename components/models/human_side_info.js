import { ApplicationMemoryRecord } from "./application_memory_record.js"
import { Location } from "./location"

export class HumanSideInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "none",   name: "none", location_keys: [],                 },
      { key: "both",   name: "☗☖", location_keys: ["black", "white"], },
      { key: "black",  name: "☗",   location_keys: ["black"],          },
      { key: "white",  name: "☖",   location_keys: ["white"],          },
    ]
  }

  get locations() {
    return this.location_keys.map((e) => Location.fetch(e))
  }
}

if (typeof process !== "undefined" && process.argv[1] === __filename) {
  console.log(HumanSideInfo.fetch("both").locations)
}
