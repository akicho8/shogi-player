import _ from 'lodash'
import Vue from 'vue'
import { Soldier } from "./soldier"

class Board {
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

  get flip() {
    const value = new Board()
    _.forEach(this._surface, (soldier, place) => {
      const new_soldier = new Soldier(Object.assign({}, soldier.attributes, {
        location: soldier.location.flip,
        place: soldier.place.flip,
      }))
      value.place_on(new_soldier)
    })
    return value
  }
}

export { Board }

if (process.argv[1] === __filename) {
  console.log(Board.dimension)
}
