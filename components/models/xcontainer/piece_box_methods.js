import _ from "lodash"
import Vue from "vue"
import { Place } from "../place.js"
import { Piece } from "../piece.js"
import { PieceBox } from "../piece_box.js"
import { PresetInfo } from "../preset_info.js"
import { GX } from "../gx"

export class PieceBoxMethods {
  piece_box_clear$() {
    this.piece_box = PieceBox.empty()
  }

  piece_box_add$(piece, amount = 1) {
    this.piece_box = this.piece_box.add(piece, amount)
  }

  piece_box_to_hold_pieces$(location) {
    // 1. 今の駒箱の中身を全部持駒に移す
    _.each(this.piece_box.to_h, (count, key) => {
      this.hold_pieces_add$(location, Piece.fetch(key), count)
    })
    // 2. 駒箱を空っぽに差し替える
    this.piece_box_clear$()
  }

  // プリセットに対応するように駒箱をセットする
  piece_box_set_by_preset_info$(preset_info) {
    this.piece_box = PieceBox.create_by_preset_info(preset_info)
  }

  // 駒箱に足りない駒だけにする
  piece_box_adjust$() {
    const on_hold  = this.hold_piece_all_counts_hash
    const on_board = this.board.piece_counts_hash

    // 1. 次の PieceBox の中身となるプレーンなハッシュを計算
    const next_counts = {}

    _.each(PresetInfo.fetch("全部駒箱").piece_box, (full_count, key) => {
      const exist_count = (on_hold[key] ?? 0) + (on_board[key] ?? 0)
      const need_count = full_count - exist_count

      if (need_count > 0) {
        next_counts[key] = need_count
      }
    })

    // 2. 最後に一回だけ代入（これが最も効率的で Vue にも優しい）
    this.piece_box = PieceBox.create(next_counts)
  }
}
