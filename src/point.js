// -*- compile-command: "babel-node point.js" -*-

import { Board } from "./board"

class Point {
  static fetch(v) {
    return new Point(v)
  }

  constructor (point) {
    let x, y
    if (typeof point === "string") {
      [x, y] = point.split("")
      x = Board.board_size - Number(x)
      y = y.charCodeAt(0) - "a".charCodeAt(0)
    } else {
      [x, y] = point
    }
    [this._x, this._y] = [x, y]
  }

  get to_key() {
    return [this._x, this._y].toString()
  }

  get x() {
    return this._x
  }

  get y() {
    return this._y
  }
}

export { Point }

if (process.argv[1] === __filename) {
  console.log(Point.fetch("6a").to_key)
  console.log(Point.fetch([1, 2]).to_key)
}
