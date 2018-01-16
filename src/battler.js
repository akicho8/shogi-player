import { Point } from './point'
import { Piece } from './piece'
import { Location } from './location'

class Battler {
  constructor(attributes) {
    this.attributes = Object.assign({}, attributes)
  }

  get piece() {
    return this.attributes.piece
  }

  get point() {
    return this.attributes.point
  }

  get location_key() {
    return this.attributes.location_key
  }

  get location_info() {
    return Location.fetch(this.location_key)
  }

  get promoted() {
    return this.attributes.promoted
  }

  set promoted(v) {
    this.attributes.promoted = v
  }

  get name() {
    if (this.promoted) {
      return this.piece.promoted_name
    }
    return this.piece.name
  }
}

export { Battler }

if (process.argv[1] === __filename) {
  const battler = new Battler({
    point: new Point([1, 2]),
    piece: Piece.fetch("P"),
    promoted: true,
    location_key: "white",
  })
  console.log(battler.name)
}
