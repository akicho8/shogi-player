// -*- compile-command: "babel-node board.js" -*-

class Board {
  static get dimension() {
    return 9
  }
}

export { Board }

if (process.argv[1] === __filename) {
  console.log(Board.dimension)
}
