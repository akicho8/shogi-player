// -*- compile-command: "babel-node board.js" -*-

class Board {
  static boardSize() {
    return 9
  }
}

export { Board }

if (process.argv[1] == __filename) {
}
