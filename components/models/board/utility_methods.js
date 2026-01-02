import _ from "lodash"
import { Place } from "../place.js"
import { Beetleshine as GX } from "beetleshine"
import { PresetInfo } from "../preset_info.js"

export class UtilityMethods {
  // location 側の玉を探す
  king_find_by_location(location) {
    const key = location.key
    return this.soldiers.find(e => (e.piece.key === "K" && e.location.key === key))
  }

  // soldier を piece にしてその個数をハッシュにして返す
  get piece_counts_hash() {
    return GX.ary_tally(this.soldiers.map(e => e.piece.key))
  }

  // 敵玉頭への歩打ちか？
  // ・打限定のチェックはいらない
  pawn_drop_on_king_front_p(pawn) {
    if (pawn.piece.key === "P" && !pawn.promoted) {
      const x = pawn.place.x
      const y = pawn.place.y - pawn.location.value_sign // 進行方向 + 1
      if (Place.xy_valid_p(x, y)) {
        const new_place = Place.fetch([x, y])
        const king = this.lookup(new_place)
        if (king && king.piece.key === "K" && king.location.key !== pawn.location.key) {
          return true
        }
      }
    }
    return false
  }

  // 盤面だけを見て推測した手合割
  get guess_preset_info() {
    const padded_sfen = " " + this.to_sfen + " "
    return PresetInfo.values.find(e => e.sfen.includes(padded_sfen))
  }
}
