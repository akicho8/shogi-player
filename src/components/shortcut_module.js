import Location from "../location"

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
      if (e.code === "Escape" || e.key === "q") {
        if (this.hold_cancel(e)) {
          e.preventDefault()
          return true
        }
      }

      // 反転
      if (e.key === "v" || e.code === "Space") {
        if (this.mouseover_info) {
          if (this.mouseover_info.type === "board") {
            this.board_cell_click_right(this.mouseover_info.xy, e)
            e.preventDefault()
            return true
          }
        }
      }

      return false
    },

    mouseover_handle(xy, e) {
      this.mouseover_info = { type: "board", xy: xy }
    },

    mouseleave_handle(xy, e) {
      this.mouseover_info = null
    },

    mouseover_handle2(location, piece, e) {
      this.mouseover_info = { type: "piece_stand", location: location, piece: piece }
    },

    mouseleave_handle2(location, piece, e) {
      this.mouseover_info = null
    },

    mouseover_handle3(piece, e) {
      this.mouseover_info = { type: "piece_box", piece: piece }
    },

    mouseleave_handle3(piece, e) {
      this.mouseover_info = null
    },

    // 盤上にマウスがあって駒を持っていなかったら左クリック
    soldier_hold_unless_holding_p(e) {
      if (this.mouseover_info) {                             // 盤上にマウスがあって
        if (!this.holding_p) {                                // 駒を持っていなかったら
          if (this.mouseover_info.type === "board") {
            this.board_cell_click_left(this.mouseover_info.xy, e) // 左クリック
          }
          if (this.mouseover_info.type === "piece_stand") {
            this.piece_stand_piece_click(this.mouseover_info.location, this.mouseover_info.piece, e)
          }
          if (this.mouseover_info.type === "piece_box") {
            this.piece_box_piece_click(this.mouseover_info.piece, e)
          }
        }
      }
    },
  },
}
