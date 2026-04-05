import _ from "lodash"
import { GX } from "./gx"

import { Board } from "./board"
import { PlaceYomiageInfo } from "./place_yomiage_info.js"

export class Place {
  static ANY_TO_NUMBER_REPLACE_TABLE = {
    "１": 1, "２": 2, "３": 3, "４": 4, "５": 5, "６": 6, "７": 7, "８": 8, "９": 9,
    "一": 1, "二": 2, "三": 3, "四": 4, "五": 5, "六": 6, "七": 7, "八": 8, "九": 9,
    "a":  1, "b":  2, "c":  3, "d":  4, "e":  5, "f":  6, "g":  7, "h":  8, "i":  9,
  }

  static TO_KANJI_REPLACE_TABLE_X = { 1: "１", 2: "２", 3: "３", 4: "４", 5: "５", 6: "６", 7: "７", 8: "８", 9: "９", }
  static TO_KANJI_REPLACE_TABLE_Y = { 1: "一", 2: "二", 3: "三", 4: "四", 5: "五", 6: "六", 7: "七", 8: "八", 9: "九", }

  static TO_SFEN_REPLACE_TABLE_Y = ["a", "b", "c", "d", "e", "f", "g", "h", "i"]

  static get top_left()      { return this.fetch([0, 0])                                                             }
  static get top_center()    { return this.fetch([Math.trunc(Board.dimension / 2), 0])                               }
  static get top_right()     { return this.fetch([Board.dimension - 1, 0])                                           }
  static get bottom_left()   { return this.fetch([0, Board.dimension - 1])                                           }
  static get bottom_center() { return this.fetch([Math.trunc(Board.dimension / 2), Board.dimension - 1])             }
  static get bottom_right()  { return this.fetch([Board.dimension - 1, Board.dimension - 1])                         }
  static get center_center() { return this.fetch([Math.trunc(Board.dimension / 2), Math.trunc(Board.dimension / 2)]) }

  static fetch(v) {
    if (v instanceof this) {
      return v
    }
    return new this(v)
  }

  static wrap_fetch(x, y) {
    const nx = GX.imodulo(x, Board.dimension)
    const ny = GX.imodulo(y, Board.dimension)
    return this.fetch([nx, ny])
  }

  static xy_valid_p(x, y) {
    return 0 <= x && x < Board.dimension && 0 <= y && y < Board.dimension
  }

  static xy_invalid_p(x, y) {
    return !this.xy_valid_p(x, y)
  }

  static get random() {
    const x = _.random(0, Board.dimension - 1)
    const y = _.random(0, Board.dimension - 1)
    return this.fetch([x, y])
  }

  //==============================================================================
  // a から b までの直線上のマスを列挙
  // 斜め・縦・横に並んでいない場合は空
  // 両端は含めない
  //==============================================================================
  static line_between(a, b) {
    if (!this.straight_p(a, b)) {
      return []
    }
    const list = []
    const dx = Math.sign(b.x - a.x)
    const dy = Math.sign(b.y - a.y)
    let x = a.x + dx
    let y = a.y + dy
    while (!(x === b.x && y === b.y)) {
      list.push(this.fetch([x, y]))
      x += dx
      y += dy
    }
    return list
  }

  // a から b までは直線になっているか？
  static straight_p(a, b) {
    const dx = b.x - a.x
    const dy = b.y - a.y
    return dx === 0 || dy === 0 || Math.abs(dx) === Math.abs(dy)
  }

  constructor(value) {
    let x, y
    if (typeof value === "string") {
      [x, y] = this.__str_to_xy(value)
    } else {
      [x, y] = value            // valus is array
    }
    if (process.env.NODE_ENV !== "production") {
      GX.assert_kind_of_integer(x)
      GX.assert_kind_of_integer(y)
    }
    this.x = x
    this.y = y
    Object.freeze(this)
  }

  get key() {
    return this.to_a.toString()
  }

  get to_a() {
    return [this.x, this.y]
  }

  get to_h() {
    return { x: this.x, y: this.y }
  }

  get human_x() {
    return Board.dimension - this.x
  }

  get kanji_human_x() {
    return this.constructor.TO_KANJI_REPLACE_TABLE_X[this.human_x]
  }

  get kanji_human_y() {
    return this.constructor.TO_KANJI_REPLACE_TABLE_Y[this.human_y]
  }

  get yomiage_x() {
    return PlaceYomiageInfo.fetch(this.human_x.toString()).yomiage
  }

  get yomiage_y() {
    return PlaceYomiageInfo.fetch(this.human_y.toString()).yomiage
  }

  get human_y() {
    return this.y + 1
  }

  get half_spin() {
    return this.constructor.fetch([Board.dimension - 1 - this.x, Board.dimension - 1 - this.y])
  }

  get flip() {
    return this.constructor.fetch([this.x, Board.dimension - 1 - this.y])
  }

  get flop() {
    return this.constructor.fetch([Board.dimension - 1 - this.x, this.y])
  }

  flop_if(v) {
    if (v) {
      return this.flop
    } else {
      return this
    }
  }

  half_spin_if_white(location) {
    if (location.key === "white") {
      return this.half_spin
    } else {
      return this
    }
  }

  get to_sfen() {
    return [Board.dimension - this.x, this.constructor.TO_SFEN_REPLACE_TABLE_Y[this.y]].join("")
  }

  // "place_7_6"
  get css_place_key() {
    return ["place", this.human_x, this.human_y].join("_")
  }

  // [7, 6]
  get human_xy_ary() {
    return [this.human_x, this.human_y]
  }

  get kanji_human() {
    return [this.kanji_human_x, this.kanji_human_y].join("")
  }

  // "76"
  get digit_human() {
    return this.human_xy_ary.join("")
  }

  // 盤と駒台を含めたユニークな位置情報の文字列を返す
  // "7_6"
  get to_think_mark_pos_key() {
    return this.human_xy_ary.join("_")
  }

  get even_p() {
    return ((this.human_x + this.human_y) & 1) === 0
  }

  get odd_p() {
    return !this.even_p
  }

  get even_or_odd() {
    return this.even_p ? "even" : "odd"
  }

  get middle_center_p() {
    const e = this.constructor.center_center
    return this.x === e.x && this.y === e.y
  }

  // x, y を足した新しい位置を返す
  // はみでたのは反対側の座標とする
  rotate_xy(x, y) {
    return this.constructor.wrap_fetch(this.x + x, this.y + y)
  }

  line_between_to(to) {
    return this.constructor.line_between(this, to)
  }

  straight_to_p(to) {
    return this.constructor.straight_p(this, to)
  }

  // toJSON() {
  //   return { a: 1 }
  // }

  // private

  __str_to_xy(str) {
    const [x, y] = str.split("").map(e => Number(this.constructor.ANY_TO_NUMBER_REPLACE_TABLE[e] ?? e))
    return this.__logical_xy_to_internal_xy(x, y)
  }

  __logical_xy_to_internal_xy(x, y) {
    return [Board.dimension - x, y - 1]
  }
}
