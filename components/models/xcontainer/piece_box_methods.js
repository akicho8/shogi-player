import _ from "lodash"
import Vue from "vue"
import { Place } from "../place.js"
import { Piece } from "../piece.js"
import { PresetInfo } from "../preset_info.js"
import { GX } from "../gx"

export class PieceBoxMethods {
  piece_box_clear$() {
    this.piece_box = {}
  }

  // -------------------------------------------------------------------------------- piece_box

  get piece_box_to_h() {
    return this.piece_box
  }

  piece_box_count(piece) {
    return this.piece_box[piece.key] ?? 0
  }

  piece_box_add$(piece, plus = 1) {
    const count = this.piece_box_count(piece) + plus

    // 新しいオブジェクトを作って差し替える（Immutable なアプローチ）
    const new_box = { ...this.piece_box }

    if (count >= 1) {
      new_box[piece.key] = count
    } else {
      delete new_box[piece.key]
    }

    // 最後に一回だけセット。これで確実に「変化した」と Vue が認識する
    this.piece_box = new_box
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
    return _(this.piece_box)
      .toPairs() // {k: v} -> [[k, v]]
      .map(([key, count]) => [Piece.fetch(key), count])
      .filter(([piece, count]) => count >= 1)
      .sortBy(([piece]) => piece.code)
      .value()
  }

  // 駒箱の駒をすべて location の駒台に移動する
  piece_box_to_hold_pieces$(location) {
    _.forIn(this.piece_box, (count, key) => {
      const piece = Piece.fetch(key)
      this.piece_box_add$(piece, -count)
      this.hold_pieces_add(location, piece, count)
    })
  }

  // プリセットに対応するように駒箱をセットする
  piece_box_reset_by_preset$(preset_info) {
    this.piece_box_clear$()
    preset_info.piece_box.forEach(([piece_key, count]) => {
      const piece = Piece.fetch(piece_key)
      this.piece_box_add$(piece, count)
    })
  }

  // 駒箱に足りない駒だけにする
  piece_box_piece_counts_adjust$() {
    this.piece_box_clear$()

    const counts_hash_on_hold  = this.hold_piece_all_counts_hash // 両者の持駒の合計
    const counts_hash_on_board = this.board.piece_counts_hash    // 盤上の駒の合計

    const preset_info = PresetInfo.fetch("全部駒箱")
    preset_info.piece_box.forEach(([piece_key, full_count]) => {
      const piece = Piece.fetch(piece_key)
      const exist_count = (counts_hash_on_hold[piece.key] ?? 0) + (counts_hash_on_board[piece.key] ?? 0)
      const need_count = full_count - exist_count
      this.piece_box_add$(piece, need_count)
    })
  }
}
