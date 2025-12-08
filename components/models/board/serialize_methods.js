import _ from "lodash"
import { Place } from "../place.js"

export class SerializeMethods {
  get to_sfen() {
    const rows = []
    _.times(this.dimension, (y) => {
      let str = ""
      let space = 0
      _.times(this.dimension, (x) => {
        const place = Place.fetch([x, y])
        const soldier = this.lookup(place)
        if (_.isNil(soldier)) {
          space += 1
        } else {
          if (space >= 1) {
            str += space
            space = 0
          }
          if (soldier.promoted) {
            str += "+"
          }
          let key = soldier.piece.key
          if (soldier.location.key === "white") {
            key = key.toLowerCase()
          }
          str += key
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
