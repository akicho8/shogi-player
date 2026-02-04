import Vue from "vue"
import _ from "lodash"
import { Board } from "./board"
import { Place } from "./place"
import { Piece } from "./piece"
import { Location } from "./location"

export class Soldier {
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

    return this.create({...this.__default_attributes, ...hv})
  }

  static random(params = {}) {
    const place    = params.place ?? Place.random
    const piece    = params.piece ?? _.sample(Piece.values)
    const promoted = params.promoted ?? (piece.promotable_p ? _.sample([true, false]) : false)
    const location = params.location ?? _.sample(Location.values)
    return this.create({piece, place, promoted, location})
  }

  // ▲59玉
  static get __default_attributes() {
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

  get place() {
    return this.attributes.place
  }

  get piece() {
    return this.attributes.piece
  }

  get promoted() {
    return !!this.attributes.promoted
  }

  get location() {
    return this.attributes.location
  }

  get name() {
    if (this.promoted) {
      return this.piece.promoted_name
    }
    return this.piece.name
  }

  get yomiage_name() {
    return this.piece.piece_yomiage.yomiage(this.promoted)
  }

  get to_sfen() {
    let str = ""
    if (this.promoted) {
      str += "+"
    }
    let key = this.piece.key
    if (this.location.key === "white") {
      key = key.toLowerCase()
    }
    str += key
    return str
  }

  get inspect() {
    return ["<", this.location.name, this.place.digit_human, this.name, ">"].join("")
  }

  get to_s() {
    return this.inspect
  }

  ////////////////////////////////////////////////////////////////////////////////

  // soldier.clone_with({promoted: true})
  // soldier.clone_with({promoted: false})
  clone_with(attrs = {}) {
    return this.constructor.create({...this.attributes, ...attrs})
  }

  ////////////////////////////////////////////////////////////////////////////////

  // 成れるか？
  get promotable_p() {
    if (this.piece.promotable_p && !this.promoted) {
      return this.danger_zone_p
    }
    return false
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
    return this.place.half_spin_if_white(this.location).y
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

import { ClassHelper } from "./class_helper"
import { TransformMethods } from "./soldier/transform_methods"

ClassHelper.class_include(Soldier, TransformMethods)
