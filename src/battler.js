// -*- compile-command: "babel-node battler.js" -*-

import { Point } from './point.js'
import { Piece } from './piece.js'

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

  get location() {
    return this.attributes.location
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
    location: "white",
  })
  console.log(battler.name)
}
