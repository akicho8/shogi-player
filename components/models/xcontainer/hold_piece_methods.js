import Vue from "vue"
import _ from "lodash"
import { GX } from "../gx"

import { Place } from "../place.js"
import { Piece } from "../piece.js"
import { Location } from "../location.js"

export class HoldPieceMethods {
  hold_pieces_to_h(location) {
    return this.hold_pieces[location.key]
  }

  // location の piece の数を返す
  hold_pieces_count(location, piece) {
    return this.hold_pieces_to_h(location)[piece.key] ?? 0
  }

  // location の持駒が空か？
  hold_pieces_blank_p(location) {
    return Object.keys(this.hold_pieces_to_h(location)).length === 0
  }

  // location の piece の数に plus を足す
  hold_pieces_add$(location, piece, plus = 1) {
    const new_count = this.hold_pieces_count(location, piece) + plus
    const counts_hash = this.hold_pieces_to_h(location)

    if (new_count >= 1) {
      // スプレッド演算子で新しいオブジェクトを作成し、親にセットし直す
      // これにより、counts_hash 自体の参照が変わるため、確実にリアクティブがトリガーされる
      Vue.set(this.hold_pieces, location.key, {...counts_hash, [piece.key]: new_count})
    } else {
      // 削除する場合も、新しいオブジェクトから該当キーを除外してセットし直すとより安全
      const new_hash = { ...counts_hash }
      delete new_hash[piece.key]
      Vue.set(this.hold_pieces, location.key, new_hash)
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

  // 持駒
  realized_hold_pieces_of(location) {
    return _(this.hold_pieces_to_h(location))
      .map((count, key) => [Piece.fetch(key), count]) // Lodashのmapは(value, key)の順
      .sortBy(([piece]) => piece.code)
      .value()
  }

  // -------------------------------------------------------------------------------- Utilities

  // location の駒台の駒をすべて駒箱に移動する
  hold_pieces_to_piece_box$(location) {
    const counts_hash = this.hold_pieces_to_h(location)

    // 駒箱に足すべきリストを抽出して反映
    _.forEach(counts_hash, (count, key) => {
      this.piece_box_add$(Piece.fetch(key), count)
    })

    // 持駒をリセット
    Vue.set(this.hold_pieces, location.key, {})
  }

  // 両者の持駒を合わせたハッシュを返す
  get hold_piece_all_counts_hash() {
    const counts = {}
    Location.values.forEach(e => {
      _.forIn(this.hold_pieces_to_h(e), (count, key) => {
        counts[key] = (counts[key] ?? 0) + count
      })
    })
    return counts
  }
}
