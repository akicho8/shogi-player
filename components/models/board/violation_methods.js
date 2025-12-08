import _ from "lodash"
import { Place } from "../place.js"

export class ViolationMethods {
  //////////////////////////////////////////////////////////////////////////////// 二歩判定用

  // 歩を打ったと仮定したとき二歩になるか？
  // soldier が歩かどうかの判定はしないでよいとする
  double_pawn_violation_p(soldier) {
    let found = false
    for (let y = 0; y < this.dimension; y++) {
      if (soldier.place.y === y) {
        continue
      }
      const place = Place.fetch([soldier.place.x, y])
      const s = this.lookup(place)
      if (s) {
        if (s.piece.key === "P" && !s.promoted && s.location.key === soldier.location.key) {
          found = true
          break
        }
      }
    }
    return found
  }
}
