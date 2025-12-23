import _ from "lodash"
import { Place } from "../place.js"
import { Soldier } from "../soldier.js"

export class TransformMethods {
  // 上下反転(不成)→成り (4パターン) の繰り返し
  get transform_all() {
    if (this.piece.promotable_p) {
      if (this.promoted) {
        return this.clone_with({location: this.location.flip, promoted: !this.promoted})
      } else {
        return this.clone_with({promoted: !this.promoted})
      }
    } else {
      return this.transform_location
    }
  }

  // 成り→不成 (2パターン) の繰り返し
  get transform_promote() {
    if (this.piece.promotable_p) {
      return this.clone_with({promoted: !this.promoted})
    } else {
      return this.clone_with({})
    }
  }

  // 先後 (2パターン) の繰り返し
  get transform_location() {
    return this.clone_with({location: this.location.flip})
  }
}
