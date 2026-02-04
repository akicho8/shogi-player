import _ from "lodash"
import Vue from "vue"
import { Piece } from "./piece.js"
import { PresetInfo } from "./preset_info.js"
import { GX } from "./gx"

export class PieceBox {
  static empty() {
    return this.create({})
  }

  static create_by_preset_info(preset_info) {
    GX.assert_kind_of_hash(preset_info.piece_box)
    return this.create(preset_info.piece_box)
  }

  static create(...args) {
    return new this(...args)
  }

  constructor(counts = {}) {
    this._counts = Object.freeze({ ...counts })
  }

  get to_h() {
    return this._counts
  }

  count(piece) {
    return this._counts[piece.key] ?? 0
  }

  add(piece, amount = 1) {
    GX.assert_kind_of_integer(amount)

    const count = this.count(piece) + amount

    // 新しいオブジェクトを作って差し替える（Immutable なアプローチ）
    const new_counts = { ...this._counts }

    if (count >= 1) {
      new_counts[piece.key] = count
    } else {
      delete new_counts[piece.key]
    }

    return this.constructor.create(new_counts)
  }

  merge(other) {
    return this.merge_from_hash_counts(other.to_h)
  }

  merge_from_hash_counts(hash_counts) {
    GX.assert_kind_of_hash(hash_counts)

    const new_counts = { ...this._counts }

    _.each(hash_counts, (amount, key) => {
      const count = (new_counts[key] ?? 0) + amount
      if (count >= 1) {
        new_counts[key] = count
      } else {
        delete new_counts[key]
      }
    })

    return this.constructor.create(new_counts)
  }

  // piece を count 減らしたいとき本当に減らせる数を返す
  can_be_reduced_count(piece, count) {
    const max = this.count(piece)
    if (count > max) {
      count = max
    }
    return count
  }

  get realize() {
    return _(this._counts)
      .toPairs() // {k: v} -> [[k, v]]
      .map(([key, count]) => [Piece.fetch(key), count])
      .filter(([piece, count]) => count >= 1)
      .sortBy(([piece]) => piece.code)
      .value()
  }
}
