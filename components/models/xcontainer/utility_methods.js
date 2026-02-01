import _ from "lodash"
import { Place } from "../place.js"
import { GX } from "../gx"

export class UtilityMethods {
  // 左右スライド
  rotate_xy$(x, y) {
    this.board = this.board.rotate_xy(x, y)
  }

  // size x size の範囲で駒を混ぜる
  square_shuffle$(size) {
    const new_board = this.board.square_shuffle(size)
    if (new_board) {
      this.board = new_board
      return true
    }
  }
}
