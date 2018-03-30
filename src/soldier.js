import _ from 'lodash'
import { Board } from './board'
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

  get piece_transform() {
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

  get promotable_p() {
    if (this.piece.promotable_p && !this.promoted) { // 成れるのに成ってなくて
      return this.danger_zone_p
    }
  }

  get danger_zone_p() {
    if (this.location.key === "black") {
      return this.place.y < Board.danger_zone_size
    } else {
      return this.place.y >= (Board.dimension - Board.danger_zone_size)
    }
  }

  get to_class_list() {
    let list = []
    list.push(`location_${this.location.key}`)
    list.push(`promoted_${this.promoted}`)
    list = _.concat(list, this.piece.css_class_list)
    return list
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
