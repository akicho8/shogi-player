import Location from "../models/location"
import Place from "../models/place"
import shortcut_modal from "./shortcut_modal.vue"

export default {
  data() {
    return {
      mouseover_info: null,    // マウスが hover している物
      shuffle_mode_p: false,
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
      if (this.edit_p) {
        if (e.code === "Backspace" || e.code === "Delete" || e.key.toLowerCase() === "t") {
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

      if (this.edit_p) {
        if (e.key === "?") {
          this.shortcut_modal_toggle_handle()
          e.preventDefault()
          return true
        }
      }

      // 移動
      if (this.edit_p) {
        if (this.meta_p(e)) {
          const vector = this.arrow_vector_table[e.key]
          if (vector) {
            this.mediator.slide_xy(...vector)
            e.preventDefault()
            return true
          }
        }
      }

      if (this.edit_p) {
        if (e.key === "!") {
          this.shuffle_mode_p = !this.shuffle_mode_p
          if (this.shuffle_mode_p) {
            this.$buefy.toast.open({message: `盤面シャッフルモード: ON (TAP: 1-9)`, position: "is-bottom", queue: false, duration: 1000 * 2, type: "is-primary"})
          } else {
            this.$buefy.toast.open({message: "盤面シャッフルモード: OFF", position: "is-bottom", queue: false, duration: 1000 * 0.5})
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
        //     this.mediator.slide_xy(...vector)
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
    soldier_hold_unless_holding_p(e) {
      if (this.mouseover_info) {                             // 盤上にマウスがあって
        if (!this.holding_p) {                                // 駒を持っていなかったら
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

    //////////////////////////////////////////////////////////////////////////////// キーボードショートカット modal 表示

    shortcut_modal_toggle_handle() {
      if (this.shortcut_modal_active_p()) {
        this.shortcut_modal_close_handle()
      } else {
        this.shortcut_modal_show_handle()
      }
    },
    shortcut_modal_show_handle() {
      this.shortcut_modal_close_handle()
      if (this.$shortcut_modal) { alert("this.$shortcut_modal") }
      this.$shortcut_modal = this.$buefy.modal.open({
        parent: this,
        hasModalCard: true,
        props: { },
        animation: "",
        onCancel: () => { this.shortcut_modal_close_handle() },
        // fullScreen: true,
        canCancel: ["escape", "outside"],
        component: shortcut_modal,
        // events: {
        //   "close": () => { alert("x") },
        // },
      })
    },
    shortcut_modal_close_handle() {
      if (this.$shortcut_modal) {
        this.$shortcut_modal.close()
        this.$shortcut_modal = null
      }
    },
    shortcut_modal_active_p() {
      return !!this.$shortcut_modal
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
