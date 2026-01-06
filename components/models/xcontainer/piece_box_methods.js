import _ from "lodash"
import Vue from "vue"
import { Place } from "../place.js"
import { Piece } from "../piece.js"
import { PresetInfo } from "../preset_info.js"
import { Beetleshine as GX } from "beetleshine"

export class PieceBoxMethods {
  piece_box_clear() {
    this.piece_box = {}
  }

  // -------------------------------------------------------------------------------- piece_box

  piece_box_count(piece) {
    return this.piece_box[piece.key] ?? 0
  }

  piece_box_add(piece, plus = 1) {
    const count = this.piece_box_count(piece) + plus
    Vue.delete(this.piece_box, piece.key)
    if (count >= 1) {
      Vue.set(this.piece_box, piece.key, count)
    }
  }

  // piece を count 減らしたいとき本当に減らせる数を返す
  piece_box_can_be_reduced_count(piece, count) {
    const max = this.piece_box_count(piece)
    if (count > max) {
      count = max
    }
    return count
  }

  get piece_box_realize() {
    const list = Object.entries(this.piece_box) // {a: 1} => [['a', 1]]
    return _(list)
      .filter(([key, count]) => count >= 1)
      .map(([key, count]) => [Piece.fetch(key), count])
      .sortBy(([key, count]) => key.code)
      .value()
  }

  // 駒箱の駒をすべて location の駒台に移動する
  piece_box_to_hold_pieces(location) {
    _.forIn(this.piece_box, (count, piece_key) => {
      const piece = Piece.fetch(piece_key)
      this.piece_box_add(piece, -count)
      this.hold_pieces_add(location, piece, count)
    })
  }

  // プリセットに対応するように駒箱をセットする
  piece_box_reset_by_preset(preset_info) {
    this.piece_box_clear()

    const info = PresetInfo.fetch(preset_info)
    info.piece_box.forEach(([e, c]) => {
      this.piece_box_add(Piece.fetch(e), c)
    })
  }

  // 駒箱に足りない駒だけにする
  piece_box_piece_counts_adjust() {
    this.piece_box_clear()

    const counts_hash = this.hold_piece_all_counts_hash       // 両者の持駒の合計
    const counts_hash_on_board = this.board.piece_counts_hash // 盤上の駒の合計

    const info = PresetInfo.fetch("全部駒箱")
    info.piece_box.forEach(([e, c]) => {
      const piece = Piece.fetch(e)
      const rest = c - ((counts_hash[piece.key] ?? 0) + (counts_hash_on_board[piece.key] ?? 0))
      this.piece_box_add(piece, rest)
    })
  }
}
