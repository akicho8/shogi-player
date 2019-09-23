import Location from "../location"
import Place from "../place"

export default {
  data() {
    return {
      mouseover_info: null,    // マウスが hover している物
    }
  },

  methods: {
    shortcut_hook(e) {
      // w, b で駒台をクリックしたことにする
      for (const loc of Location.values) {
        const key = e.key.toLowerCase()
        if (key === loc.char_key) {
          this.soldier_hold_unless_holding_p(e)
          if (this.piece_stand_click_shared(loc, e)) { // 駒台クリック
            e.preventDefault()
            return true
          }
        }
      }

      // 駒箱クリック
      if (this.current_run_mode === "edit_mode") {
        if (e.code === "Backspace" || e.key.toLowerCase() === "t") {
          this.soldier_hold_unless_holding_p(e)
          if (this.piece_box_other_click(e)) {
            e.preventDefault()
            return true
          }
        }
      }

      // 移動キャンセル
      if (e.code === "Escape") {
        if (this.hold_cancel(e)) {
          e.preventDefault()
          return true
        }
      }

      // 何も持っていない状態 → 持駒に同じ駒があれば持つ
      // 何か持っている状態   → キャンセル
      // https://wikiwiki.jp/factorio/%E6%93%8D%E4%BD%9C%E6%96%B9%E6%B3%95
      if (e.key === "q") {
        // 何か持っている状態ならキャンセルする
        if (this.holding_p) {
          if (this.hold_cancel(e)) {
            e.preventDefault()
            return true
          }
        }

        // 何も持っていない状態なので持駒に同じ駒があれば持つ
        if (this.mouseover_info) {
          if (this.mouseover_info.type === "board") {
            const place = Place.fetch(this.mouseover_info.xy)
            const soldier = this.mediator.board.lookup(place)
            if (soldier) {
              this.piece_stand_piece_click(soldier.location, soldier.piece, soldier.promoted, null) // キーボードのイベントなので null 指定
              e.preventDefault()
              return true
            }
          }
        }
      }

      // 反転
      if (e.key === "v" || e.key === "r" || e.code === "Space") {
        if (this.mouseover_info) {
          if (this.mouseover_info.type === "board") {
            this.board_cell_right_click(this.mouseover_info.xy, e)
            e.preventDefault()
            return true
          }
        }
      }

      return false
    },

    board_mouseover_handle(xy, e) {
      this.mouseover_info = { type: "board", xy: xy }
    },

    piece_stand_mouseover_handle(location, piece, e) {
      this.mouseover_info = { type: "piece_stand", location: location, piece: piece }
    },

    piece_box_mouseover_handle(piece, e) {
      this.mouseover_info = { type: "piece_box", piece: piece }
    },

    mouseleave_handle() {
      this.mouseover_info = null
    },

    // 盤上にマウスがあって駒を持っていなかったら左クリック
    soldier_hold_unless_holding_p(e) {
      if (this.mouseover_info) {                             // 盤上にマウスがあって
        if (!this.holding_p) {                                // 駒を持っていなかったら
          if (this.mouseover_info.type === "board") {
            this.board_cell_left_click(this.mouseover_info.xy, e) // 左クリック
          }
          if (this.mouseover_info.type === "piece_stand") {
            this.piece_stand_piece_click(this.mouseover_info.location, this.mouseover_info.piece, false, e)
          }
          if (this.mouseover_info.type === "piece_box") {
            this.piece_box_piece_click(this.mouseover_info.piece, e)
          }
        }
      }
    },
  },
}
