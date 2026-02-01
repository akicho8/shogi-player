import _ from "lodash"
import Vue from "vue"
import { Soldier } from "./soldier"
import { Place } from "./place.js"
import { GX } from "./gx"

export class Board {
  static get dimension()        { return 9 }
  static get danger_zone_size() { return 3 }

  get dimension()        { return this.constructor.dimension }
  get danger_zone_size() { return this.constructor.danger_zone_size }

  static create() {
    return new this()
  }

  static create_empty() {
    return this.create()
  }

  static create_from_soldiers(soldiers) {
    const board = this.create()
    soldiers.forEach(soldier => board.soldier_drop$(soldier))
    return board
  }

  constructor() {
    this._surface = {}
  }

  delete_at$(place) {
    Vue.delete(this._surface, place.key)
  }

  // 打つ (破壊的)
  soldier_drop$(soldier) {
    this.delete_at$(soldier.place) // リアクティブにするため「削除」→「追加」とする (ほんとにこれでリアクティブになるかはわからない)
    Vue.set(this._surface, soldier.place.key, soldier)
  }

  // 除外する (破壊的)
  soldier_remove$(soldier) {
    this.delete_at$(soldier.place)
  }

  // 指す (破壊的)
  // 移動の際に promoted も変わる可能性があるので soldier の place だけ変えればいいと考えて移動元の soldier を指定するのは間違い
  // soldier_move$(soldier, place) {
  //   this.soldier_remove$(soldier)
  //   this.soldier_drop$(soldier.clone_with({place: place}))
  // }
  soldier_move$(old_soldier, new_soldier) {
    if (process.env.NODE_ENV !== "production") {
      GX.assert(old_soldier)
      GX.assert(new_soldier)
      GX.assert_equal(old_soldier.piece.key, new_soldier.piece.key)
      GX.assert_equal(old_soldier.location.key, new_soldier.location.key)
    }

    this.soldier_remove$(old_soldier)
    this.soldier_drop$(new_soldier)
  }

  clear$() {
    this._surface = {}
  }

  //////////////////////////////////////////////////////////////////////////////// 非破壊的

  // 指定の場所にある駒を返す
  // board.lookup(place)
  lookup(place) {
    if (process.env.NODE_ENV !== "production") {
      GX.assert(place instanceof Place)
    }

    return this._surface[place.key]
  }

  // // board.safe_lookup([x, y])
  // safe_lookup(place) {
  //   if (!(place instanceof Place)) {
  //     place = Place.fetch(place)
  //   }
  //   return this.lookup(place)
  // }

  //////////////////////////////////////////////////////////////////////////////// Utilities

  get empty_p() {
    return GX.hash_empty_p(this._surface)
  }

  get soldiers() {
    return Object.values(this._surface)
  }

  get to_a() {
    return this.soldiers
  }

  get to_h() {
    return this._surface
  }

  get soldiers_count() {
    return this.soldiers.length
  }

  soldiers_by_location(location) {
    const key = location.key
    return this.soldiers.filter(e => e.location.key === key)
  }

  get shallow_clone() {
    const new_board = this.constructor.create()
    new_board._surface = {...this._surface}
    return new_board
  }

  //////////////////////////////////////////////////////////////////////////////// soldier_*

  // 場所を見ているだけで厳密なチェックはしていない
  soldier_exist_p(soldier) {
    return this.lookup(soldier.place)
  }

  // 指す
  soldier_move(old_soldier, new_soldier) {
    const cloned_board = this.shallow_clone
    cloned_board.soldier_move$(old_soldier, new_soldier)
    return cloned_board
  }

  // 打つ
  soldier_drop(soldier) {
    const cloned_board = this.shallow_clone
    cloned_board.soldier_drop$(soldier)
    return cloned_board
  }

  // 除外
  soldier_remove(soldier) {
    const cloned_board = this.shallow_clone
    cloned_board.soldier_remove$(soldier)
    return cloned_board
  }
}

import { ClassHelper           } from "./class_helper"
import { SerializeMethods      } from "./board/serialize_methods"
import { ViolationMethods      } from "./board/violation_methods"
import { UtilityMethods        } from "./board/utility_methods"
import { TransformMethods      } from "./board/transform_methods"
import { LeaveKingAloneMethods } from "./board/leave_king_alone_methods"
import { CheckmateMethods      } from "./board/checkmate_methods"

ClassHelper.class_include(Board, SerializeMethods)
ClassHelper.class_include(Board, ViolationMethods)
ClassHelper.class_include(Board, UtilityMethods)
ClassHelper.class_include(Board, TransformMethods)
ClassHelper.class_include(Board, LeaveKingAloneMethods)
ClassHelper.class_include(Board, CheckmateMethods)
