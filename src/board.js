import { Soldier } from "./soldier"

class Board {
  static get dimension() {
    return 9
  }

  constructor() {
    this._surface = new Map()
  }

  place_on(soldier) {
    this._surface.set(soldier.place.key, soldier)
  }

  lookup(place) {
    return this._surface.get(place.key)
  }

  delete_at(place) {
    this._surface.delete(place.key)
  }

  get flip() {
    const new_map = new Board()
    this._surface.forEach((soldier, place) => {
      const new_soldier = new Soldier(Object.assign({}, soldier.attributes, {location: soldier.location.flip, place: soldier.place.flip}))
      new_map.place_on(new_soldier)
    })
    return new_map
  }
}

export { Board }

if (process.argv[1] === __filename) {
  console.log(Board.dimension)
}
