import Vue from "vue"
import _ from "lodash"
import { Place } from "../place.js"
import { Piece } from "../piece.js"
import { Location } from "../location.js"
import { GX } from "../gx"

export class HoldPieceMethods {
  // 持駒
  realized_hold_pieces_of(location) {
    const list = Object.entries(this.hold_pieces[location.key])
    return _(list)
      // .filter(([key, count]) => count >= 1)
      .map(([key, count]) => [Piece.fetch(key), count])
      .sortBy(([key, count]) => key.code)
      .value()
  }

  // location の piece の数を返す
  hold_pieces_count(location, piece) {
    return this.hold_pieces[location.key][piece.key] ?? 0
  }

  // location の持駒が空か？
  hold_pieces_blank_p(location) {
    return Object.keys(this.hold_pieces[location.key]).length === 0
  }

  // location の piece の数に plus を足す
  hold_pieces_add(location, piece, plus = 1) {
    const count = this.hold_pieces_count(location, piece) + plus
    const counts_hash = this.hold_pieces[location.key]

    // 次のように書いた場合、ハッシュの値(count)がいくら変化してもそのタイミングではトリガーが発生しない
    //
    //   if (count >= 1) {
    //     Vue.set(counts_hash, piece.key, count) // ←ここが問題
    //   } else {
    //     Vue.delete(counts_hash, piece.key)
    //   }
    //
    // そこで count を更新するときは「キーが新規で追加」されたことでトリガーを発生させるようにする
    // つまり count を更新するときは「キー削除」→「キー追加」とする

    Vue.delete(counts_hash, piece.key)
    if (count >= 1) {
      Vue.set(counts_hash, piece.key, count)
    }
  }

  // location の piece を count 個を減らしたいとき本当に減らすことができる数を返す
  // たとえば 3 個あるところで 5 個減らそうとしたとき 3 を返す
  hold_pieces_can_be_reduced_count(location, piece, count) {
    const max = this.hold_pieces_count(location, piece)
    if (count > max) {
      count = max
    }
    return count
  }

  // -------------------------------------------------------------------------------- Utilities

  // location の駒台の駒をすべて駒箱に移動する
  hold_pieces_to_piece_box(location) {
    _.forIn(this.hold_pieces[location.key], (count, piece_key) => {
      const piece = Piece.fetch(piece_key)
      this.hold_pieces_add(location, piece, -count)
      this.piece_box_add(piece, count)
    })
  }

  // 両者の持駒を合わせたハッシュを返す
  get hold_piece_all_counts_hash() {
    const counts = {}
    Location.values.forEach(e => {
      _.forIn(this.hold_pieces[e.key], (count, piece_key) => {
        counts[piece_key] = (counts[piece_key] ?? 0) + count
      })
    })
    return counts
  }

}
