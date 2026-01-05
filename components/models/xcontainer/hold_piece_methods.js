import _ from "lodash"
import { Place } from "../place.js"
import { Beetleshine as GX } from "beetleshine"

export class HoldPieceMethods {
  hold_pieces_count(location, piece) {
    return this.hold_pieces[location.key][piece.key] ?? 0
  }
}
