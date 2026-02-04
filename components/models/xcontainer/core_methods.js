import Vue from "vue"
import _ from "lodash"
import { GX } from "../gx"

import { Soldier } from "../soldier.js"

export class CoreMethods {
  initialize(attributes = {}) {
    GX.assert_not_null(attributes["data_source"])
    GX.assert_not_null(attributes["current_turn"])

    this.data_source  = attributes["data_source"]
    this.current_turn = attributes["current_turn"]

    // ここを外部から設定することはない
    this.board       = null
    this.hold_pieces = null
    this.last_hand   = null
    this.piece_box   = {}
  }

  run() {
    this.board = this.data_source.board
    this.hold_pieces = this.data_source.hold_pieces
    this.last_hand = null

    const move_infos = this.data_source.move_infos

    const num = this.turn_offset - this.turn_offset_min
    _(num).times((i) => { this.execute_one(move_infos[i]) })
  }

  execute_one(m) {
    this.last_hand = m
    if (m.drop_piece) {
      const drop_soldier = Soldier.create({piece: m.drop_piece, place: m.place, promoted: m.promoted, location: m.location})
      this.board.soldier_drop$(drop_soldier)
      this.hold_pieces_add$(m.location, drop_soldier.piece, -1)
    } else {
      {
        const killed_soldier = this.board.lookup(m.place)
        if (killed_soldier) {
          this.hold_pieces_add$(m.location, killed_soldier.piece, 1)
        }
      }
      {
        let new_attributes = { place: m.place }
        if (m.promoted_trigger) {
          new_attributes["promoted"] = true
        }
        const old_soldier = this.board.lookup(m.origin_place)
        const new_soldier = old_soldier.clone_with(new_attributes)
        this.board.soldier_move$(old_soldier, new_soldier)
      }
    }
  }
}
