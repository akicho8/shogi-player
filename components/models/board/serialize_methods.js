import _ from "lodash"
import { Place } from "../place.js"

export class SerializeMethods {
  get to_sfen() {
    const rows = []
    _(this.dimension).times(y => {
      let str = ""
      let space = 0
      _(this.dimension).times(x => {
        const place = Place.fetch([x, y])
        const soldier = this.lookup(place)
        if (_.isNil(soldier)) {
          space += 1
        } else {
          if (space >= 1) {
            str += space
            space = 0
          }
          str += soldier.to_sfen
        }
      })
      if (space >= 1) {
        str += space
      }
      rows.push(str)
    })
    return rows.join("/")
  }
}
