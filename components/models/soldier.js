import Vue from "vue"
import _ from 'lodash'
import { Board } from './board'
import { Place } from './place'
import { Piece } from './piece'
import { Location } from './location'

export class Soldier {
  static random(params = {}) {
    let place = params.place
    if (!place) {
      const x = _.random(0, Board.dimension - 1)
      const y = _.random(0, Board.dimension - 1)
      place = Place.fetch([x, y])
    }

    const piece = Piece.fetch(_.random(0, Piece.values.length - 1))
    const promoted = piece.promotable_p && _.random(0, 1) === 0

    const location = Location.fetch(_.random(0, Location.values.length - 1))

    return new this({piece: piece, place: place, promoted: promoted, location: location})
  }

  constructor(attributes) {
    this.attributes = Object.assign({}, attributes)
  }

  get piece() {
    return this.attributes.piece
  }

  set place(place) {
    Vue.set(this.attributes, "place", place)
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
    Vue.set(this.attributes, "promoted", v)
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
    return new Soldier(Object.assign({}, this.attributes, attrs)) // FIXME: this() でいける？
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

  // 自分の側の一番下を0としてどれだけ前に進んでいるかを返す
  get bottom_spaces() {
    return Board.dimension - 1 - this.top_spaces
  }

  // 自分の側の一番上を0としてあとどれだけで突き当たるかの値
  get top_spaces() {
    return this.place.sp_flip_if_white(this.location).y
  }
}

if (process.argv[1] === __filename) {
  const soldier = new Soldier({
    place: new Place([1, 7]),
    piece: Piece.fetch("P"),
    promoted: true,
    location: Location.fetch("white"),
  })
  console.log(soldier.name)
  console.log(soldier.top_spaces)
}
