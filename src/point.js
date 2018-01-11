// -*- compile-command: "babel-node point.js" -*-

import { Board } from "./board"

class Point {
  static fetch(v) {
    return new Point(v)
  }

  constructor (point) {
    let x, y
    if (typeof(point) === "string") {
      let chars = point.split("")
      x = chars[0]
      y = chars[1]
      x = Board.board_size - Number(x)
      y = y.charCodeAt(0) - "a".charCodeAt(0)
    } else {
      x = point[0]
      y = point[1]
    }
    this._x = x
    this._y = y
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
  console.log(Point.fetch([1, 2]).to_key)
}
