import { Board } from "./board"

class Point {
  static fetch(v) {
    return Object.freeze(new Point(v))
  }

  constructor(value) {
    let x, y
    if (typeof value === "string") {
      [x, y] = this._parse_from_string(value)
    } else {
      [x, y] = value
    }
    [this._x, this._y] = [x, y]
  }

  get key() {
    return [this._x, this._y].toString()
  }

  get x() {
    return this._x
  }

  get y() {
    return this._y
  }

  _parse_from_string(s) {
    s = s.replace(/([１-９一二三四五六七八九a-z])/g, (e) => this._replace_table[e])
    const [x, y] = s.split("").map((e) => Number(e))
    return [Board.dimension - x, y - 1]
  }

  get _replace_table() {
    /* eslint-disable object-property-newline, key-spacing */
    return {
      "１": 1, "２": 2, "３": 3, "４": 4, "５": 5, "６": 6, "７": 7, "８": 8, "９": 9,
      "一": 1, "二": 2, "三": 3, "四": 4, "五": 5, "六": 6, "七": 7, "八": 8, "九": 9,
      "a":  1, "b":  2, "c":  3, "d":  4, "e":  5, "f":  6, "g":  7, "h":  8, "i":  9,
    }
  }
}

export { Point }

if (process.argv[1] === __filename) {
  console.log(Point.fetch("6a").key)
  console.log(Point.fetch([1, 2]).key)
}
