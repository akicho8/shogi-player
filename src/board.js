class Board {
  static get dimension() {
    return 9
  }

  constructor() {
    this.surface = new Map()
  }

  place_on(soldier) {
    this.surface.set(soldier.place.key, soldier)
  }

  lookup(place) {
    return this.surface.get(place.key)
  }

  delete_at(place) {
    this.surface.delete(place.key)
  }
}

export { Board }

if (process.argv[1] === __filename) {
  console.log(Board.dimension)
}
