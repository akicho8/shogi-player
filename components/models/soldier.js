import Vue from "vue"
import _ from "lodash"
import { Board } from "./board"
import { Place } from "./place"
import { Piece } from "./piece"
import { Location } from "./location"

export class Soldier {
  static random(params = {}) {
    const place    = params.place ?? Place.random
    const piece    = params.piece ?? _.sample(Piece.values)
    const promoted = params.promoted ?? (piece.promotable_p ? _.sample([true, false]) : false)
    const location = params.location ?? _.sample(Location.values)
    return new this.create({piece, place, promoted, location})
  }

  static create(attributes = {}) {
    return new this(attributes)
  }

  // for test
  // 無駄が多いが生成しやすい
  // 初期値がある
  static easy_create(attributes = {}) {
    const hv = {}

    if (attributes.place) {
      hv.place = attributes.place
    }
    if (attributes.place_key) {
      hv.place = Place.fetch(attributes.place_key)
    }

    if (attributes.piece) {
      hv.piece = attributes.piece
    }
    if (attributes.piece_key) {
      hv.piece = Piece.fetch(attributes.piece_key)
    }

    if (attributes.location) {
      hv.location = attributes.location
    }
    if (attributes.location_key) {
      hv.location = Location.fetch(attributes.location_key)
    }

    if (attributes.promoted != null) {
      hv.promoted = attributes.promoted
    }

    return this.create({...this.default_attributes, ...hv})
  }

  static get default_attributes() {
    return {
      place: Place.bottom_center,
      piece: Piece.fetch("K"),
      location: Location.black,
      promoted: false,
    }
  }

  constructor(attributes = {}) {
    this.attributes = {...attributes}
    Object.freeze(this.attributes)
    Object.freeze(this)
  }

  get piece() {
    return this.attributes.piece
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

  get name() {
    if (this.promoted) {
      return this.piece.promoted_name
    }
    return this.piece.name
  }

  get to_s() {
    return this.name
  }

  get yomiage_name() {
    return this.piece.piece_yomiage.yomiage(this.promoted)
  }

  ////////////////////////////////////////////////////////////////////////////////

  // 互換性のため
  get transform_clone() {
    return this.transform_all
  }

  // 上下反転(不成)→成り (4パターン) の繰り返し
  get transform_all() {
    if (this.piece.promotable_p) {
      if (this.promoted) {
        return this.clone_with({location: this.location.flip, promoted: !this.promoted})
      } else {
        return this.clone_with({promoted: !this.promoted})
      }
    } else {
      return this.transform_head
    }
  }

  // 成り→不成 (2パターン) の繰り返し
  get transform_promote() {
    let attrs = null
    if (this.piece.promotable_p) {
      attrs = {promoted: !this.promoted}
    }
    return this.clone_with(attrs)
  }

  // 先後 (2パターン) の繰り返し
  get transform_head() {
    return this.clone_with({location: this.location.flip})
  }

  // soldier.clone_with({promoted: true})
  // soldier.clone_with({promoted: false})
  clone_with(attrs = {}) {
    return this.constructor.create({...this.attributes, ...attrs})
  }

  ////////////////////////////////////////////////////////////////////////////////

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

  get css_class_list() {
    let list = []
    list.push(`location_${this.location.key}`) // 未使用?
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
    return this.place.sp_half_spin_if_white(this.location).y
  }

  get once_vectors() {
    return this.piece.once_vectors(this.promoted)
  }

  get repeat_vectors() {
    return this.piece.repeat_vectors(this.promoted)
  }

  //////////////////////////////////////////////////////////////////////////////// ルール違反

  get dead_place_p() {
    if (this.promoted) {
      return false              // 成っていると絶対に死に駒にならない
    }
    const gap = this.piece.piece_vector.force_promote_length // 死に駒になる上の隙間
    if (gap != null) {                                       // チェックしない場合は null
      return this.top_spaces <= gap                          // 実際の上の隙間 <= 死に駒になる上の隙間
    }
  }
}

if (typeof process !== "undefined" && process.argv[1] === __filename) {
  const soldier = new Soldier({
    place: new Place([1, 7]),
    piece: Piece.fetch("P"),
    promoted: true,
    location: Location.fetch("white"),
  })
  console.log(soldier.name)
  console.log(soldier.top_spaces)
}
