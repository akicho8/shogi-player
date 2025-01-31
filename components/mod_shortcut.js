import { Location } from "./models/location.js"
import { Place } from "./models/place.js"

export const mod_shortcut = {
  data() {
    return {
      mouseover_info: null,    // マウスが hover している物
      shuffle_mode_p: false,
    }
  },

  methods: {
    shortcut_hook(e) {
      if (this.play_p || this.edit_p) {
      } else {
        return true
      }

      // w, b で駒台をクリックしたことにする
      for (const loc of Location.values) {
        const key = e.key.toLowerCase()
        if (key === loc.char_key) {
          this.soldier_hold_unless_lifted_p(e)
          if (this.membership_click_handle(loc, e)) { // 駒台クリック
            e.preventDefault()
            return true
          }
        }
      }

      // 駒箱クリック
      if (this.edit_p) {
        if (e.code === "Backspace" || e.code === "Delete" || (!this.meta_p(e) && e.key === "t")) {
          this.soldier_hold_unless_lifted_p(e)
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
        if (this.lifted_p) {
          if (this.hold_cancel(e)) {
            e.preventDefault()
            return true
          }
        }

        // 何も持っていない状態なので持駒に同じ駒があれば持つ
        if (this.mouseover_info) {
          if (this.mouseover_info.type === "board") {
            const place = Place.fetch(this.mouseover_info.xy)
            const soldier = this.xcontainer.board.lookup(place)
            if (soldier) {
              this.piece_stand_piece_click(soldier.location, soldier.piece, soldier.promoted, null) // キーボードのイベントなので null 指定
              e.preventDefault()
              return true
            }
          }
        }
      }

      // 反転
      // command + r でリロードを優先したいため command が押されていないときだけ反応させる
      if (!this.meta_p(e)) {
        if (this.mouseover_info) {
          if (this.mouseover_info.type === "board") {
            // r, v, h は factorio のキーバインドに倣っている
            if (e.key === "r" || e.code === "Space") {
              this.board_cell_right_click(this.mouseover_info.xy, e, "transform_all") // 4パターン切り替え
              e.preventDefault()
              return true
            }
            if (e.key === "v") {
              this.board_cell_right_click(this.mouseover_info.xy, e, "transform_head") // 上下反転
              e.preventDefault()
              return true
            }
            if (e.key === "h") {
              this.board_cell_right_click(this.mouseover_info.xy, e, "transform_promote") // 裏表反転
              e.preventDefault()
              return true
            }
          }
        }
      }

      if (this.edit_p) {
        if (e.key === "?") {
          this.shortcut_viewer_toggle_handle()
          e.preventDefault()
          return true
        }
      }

      // 移動
      if (this.edit_p) {
        if (this.meta_p(e)) {
          const vector = this.arrow_vector_table[e.key]
          if (vector) {
            this.xcontainer.slide_xy(...vector)
            e.preventDefault()
            return true
          }
        }
      }

      if (this.edit_p) {
        if (e.key === "!") {
          this.shuffle_mode_p = !this.shuffle_mode_p
          if (this.shuffle_mode_p) {
            this.toast_call("盤面シャッフルモード: ON (TAP: 1-9)", {duration: 2, type: "is-primary"})
          } else {
            this.toast_call("盤面シャッフルモード: OFF", {duration: 0.5})
          }
        }
        if (this.shuffle_mode_p) {
          if (e.key === "1" || e.key === "2" || e.key === "3" || e.key === "4" || e.key === "5" || e.key === "6" || e.key === "7" || e.key === "8" || e.key === "9") {
            this.shuffle_run(e.key)
            e.preventDefault()
            return true
          }
        }

        // if (this.meta_p(e)) {
        //   const vector = this.arrow_vector_table[e.key]
        //   if (vector) {
        //     this.xcontainer.slide_xy(...vector)
        //     e.preventDefault()
        //     return true
        //   }
        // }
      }

      return false
    },

    board_mouseover_handle(xy, e) {
      this.mouseover_info = { type: "board", xy: xy }
    },

    piece_stand_mouseover_handle(location, piece, e) {
      this.mouseover_info = { type: "MembershipStand", location: location, piece: piece }
    },

    piece_box_mouseover_handle(piece, e) {
      this.mouseover_info = { type: "PieceBox", piece: piece }
    },

    mouseleave_handle() {
      this.mouseover_info = null
    },

    // 盤上にマウスがあって駒を持っていなかったら左クリック
    soldier_hold_unless_lifted_p(e) {
      if (this.mouseover_info) {                             // 盤上にマウスがあって
        if (!this.lifted_p) {                                // 駒を持っていなかったら
          if (this.mouseover_info.type === "board") {
            this.board_cell_left_click(this.mouseover_info.xy, e) // 左クリック
          }
          if (this.mouseover_info.type === "MembershipStand") {
            this.piece_stand_piece_click(this.mouseover_info.location, this.mouseover_info.piece, false, e)
          }
          if (this.mouseover_info.type === "PieceBox") {
            this.piece_box_piece_click(this.mouseover_info.piece, e)
          }
        }
      }
    },

  },

  computed: {
    arrow_vector_table() {
      return {
        "ArrowRight": [ 1,  0],
        "ArrowLeft":  [-1,  0],
        "ArrowUp":    [ 0, -1],
        "ArrowDown":  [ 0,  1],
      }
    },
  },
}
