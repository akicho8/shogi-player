import { Place } from './place'
import { Piece } from './piece'

class Soldier {
  constructor(attributes) {
    this.attributes = Object.assign({}, attributes)
  }

  get piece() {
    return this.attributes.piece
  }

  set place(place) {
    this.attributes.place = place
  }

  get place() {
    return this.attributes.place
  }

  get location() {
    return this.attributes.location
  }

  get promoted() {
    return !!this.attributes.promoted
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

  get henshin() {
    let attrs = null
    if (this.piece.promotable_p) {
      if (this.promoted) {
        attrs = {location: this.location.flip, promoted: !this.promoted}
      } else {
        attrs = {promoted: !this.promoted}
      }
    } else {
      attrs = {location: this.location.flip}
    }
    return new Soldier(Object.assign({}, this.attributes, attrs))
  }
}

export { Soldier }

if (process.argv[1] === __filename) {
  const soldier = new Soldier({
    place: new Place([1, 2]),
    piece: Piece.fetch("P"),
    promoted: true,
    location_key: "white",
  })
  console.log(soldier.name)
}
