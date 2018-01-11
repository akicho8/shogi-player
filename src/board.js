// -*- compile-command: "babel-node board.js" -*-

class Board {
  static get board_size() {
    return 9
  }
}

export { Board }

if (process.argv[1] === __filename) {
  console.log(Board.board_size)
}
