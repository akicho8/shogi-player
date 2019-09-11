import _ from 'lodash'
import Vue from 'vue'
import Soldier from "./soldier"

export default class Board {
  static get dimension() {
    return 9
  }

  static get danger_zone_size() {
    return 3
  }

  constructor() {
    this._surface = {}
  }

  place_on(soldier) {
    Vue.set(this._surface, soldier.place.key, soldier)
  }

  lookup(place) {
    return this._surface[place.key]
  }

  delete_at(place) {
    delete this._surface[place.key]
  }

  clear() {
    this._surface = {}
  }

  get flip_v() {
    const value = new Board()
    _.forEach(this._surface, (soldier, place) => {
      const new_soldier = new Soldier(Object.assign({}, soldier.attributes, {
        location: soldier.location.flip,
        place: soldier.place.flip_v,
      }))
      value.place_on(new_soldier)
    })
    return value
  }

  // 左右反転
  get flip_h() {
    const value = new Board()
    _.forEach(this._surface, (soldier, place) => {
      const new_soldier = new Soldier(Object.assign({}, soldier.attributes, {
        location: soldier.location,
        place: soldier.place.flip_h,
      }))
      value.place_on(new_soldier)
    })
    return value
  }
}

if (process.argv[1] === __filename) {
  console.log(Board.dimension)
}
