import _ from "lodash"

import { Board } from "./board"

export class Place {
  static fetch(v) {
    if (v instanceof this) {
      return v
    }
    return Object.freeze(new Place(v))
  }

  static xy_valid_p(x, y) {
    return 0 <= x && x < Board.dimension && 0 <= y && y < Board.dimension
  }

  constructor(value) {
    let x, y
    if (_.isString(value)) {
      [x, y] = this._parse_from_string(value)
    } else {
      [x, y] = value            // valus is array
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

  get human_x() {
    return Board.dimension - this._x
  }

  get kanji_human_x() {
    return {1: "１", 2: "２", 3: "３", 4: "４", 5: "５", 6: "６", 7: "７", 8: "８", 9: "９"}[this.human_x]
  }

  get kanji_human_y() {
    return {1: "一", 2: "二", 3: "三", 4: "四", 5: "五", 6: "六", 7: "七", 8: "八", 9: "九"}[this.human_y]
  }

  get human_y() {
    return this._y + 1
  }

  get flip_all() {
    return Place.fetch([Board.dimension - 1 - this._x, Board.dimension - 1 - this._y])
  }

  get flip_h() {
    return Place.fetch([Board.dimension - 1 - this._x, this._y])
  }

  sp_flip_if_white(location) {
    if (location.key === "white") {
      return this.flip_all
    } else {
      return this
    }
  }

  _parse_from_string(s) {
    s = s.replace(/([１-９一二三四五六七八九a-z])/g, (e) => this._replace_table[e])
    const [x, y] = s.split("").map((e) => Number(e))
    return [Board.dimension - x, y - 1]
  }

  get _replace_table() {
    return {
      "１": 1, "２": 2, "３": 3, "４": 4, "５": 5, "６": 6, "７": 7, "８": 8, "９": 9,
      "一": 1, "二": 2, "三": 3, "四": 4, "五": 5, "六": 6, "七": 7, "八": 8, "九": 9,
      "a":  1, "b":  2, "c":  3, "d":  4, "e":  5, "f":  6, "g":  7, "h":  8, "i":  9,
    }
  }

  get to_sfen() {
    const y_table = ["a", "b", "c", "d", "e", "f", "g", "h", "i"]
    return [Board.dimension - this._x, y_table[this._y]].join("")
  }

  // "place_7_6"
  get css_place_key() {
    return ["place", this.human_x, this.human_y].join("_")
  }

  get human_xy_ary() {
    return [this.human_x, this.human_y]
  }

  get kanji_human() {
    return [this.kanji_human_x, this.kanji_human_y].join("")
  }

  // x, y を足した新しい位置を返す
  // はみでたのは反対側の座標とする
  rotate_add(x, y) {
    const nx = this.__new_pos(this._x, x)
    const ny = this.__new_pos(this._y, y)
    return Place.fetch([nx, ny])
  }

  // private
  __new_pos(origin, v) {
    return Math.trunc((origin + v + Board.dimension) % Board.dimension) // (x + 1).modulo(dimension)
  }

}

if (process.argv[1] === __filename) {
  console.log(Place.fetch("6a").key)
  console.log(Place.fetch([1, 2]).key)
}
