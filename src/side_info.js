import { MemoryRecord } from "./memory_record"
import { Location } from "./location"

class SideInfo extends MemoryRecord {
  static get define() {
    return [
      /* eslint-disable */
      { key: "both",   name: "☗☖", location_keys: ["black", "white"], },
      { key: "black",  name: "☗",   location_keys: ["black"],          },
      { key: "white",  name: "☖",   location_keys: ["white"],          },
      { key: "none",   name: "なし", location_keys: [],                 },
      /* eslint-enable */
    ]
  }

  get location_keys() {
    return this.attributes.location_keys
  }

  get locations() {
    return this.location_keys.map((e) => Location.fetch(e))
  }
}

export { SideInfo }

if (process.argv[1] === __filename) {
  console.log(SideInfo.fetch("both").locations)
}
