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
}

export { Board }

if (process.argv[1] === __filename) {
  console.log(Board.dimension)
}
