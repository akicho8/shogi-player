import _ from "lodash"

export default {
  props: {
    sp_summary:     { type: String,  default: "is_summary_on",     }, // 手数や結果の表示
    sp_slider:      { type: String,  default: "is_slider_off",     }, // スライダー表示
    sp_setting:     { type: String,  default: "is_setting_off",    }, // 設定ボタンの表示
    sp_controller:  { type: String,  default: "is_controller_off", }, // コントローラー表示

    sp_op_disabled:                 { type: Boolean, default: false, }, // 全体の操作を無効化
    sp_hidden_if_piece_stand_blank: { type: Boolean, default: false, }, // 駒がないときは駒台側を非表示

    key_event_capture:           { type: Boolean, default: false, },
    shift_key_mag:               { type: Number,  default: 10,    },
    system_key_mag:              { type: Number,  default: 50,    },
    flip:                        { type: Boolean, default: false, },
    sp_flip_if_white:               { type: Boolean, default: false, },
  },

  data() {
    return {
      new_flip: null,
    }
  },

  mounted() {
    window.addEventListener("keydown", this.keydown_hook, false)
  },

  beforeDestroy() {
    window.removeEventListener('keydown', this.keydown_hook)
  },

  created() {
    this.new_flip = this.flip
  },

  watch: {
    flip(v)     { this.new_flip = v             }, // 外 -> 中
    new_flip(v) { this.$emit("update:flip", v)  }, // 中 -> 外
  },

  methods: {
    keydown_hook(e) {
      if (this.debug_p && false) {
        this.log(document.activeElement)
        this.log(e.shiftKey, e.ctrlKey, e.altKey, e.metaKey)
        this.log("e", e)
        this.log("key", e.key)
        this.log("code", e.code)
        this.log("repeat", e.repeat)
      }

      if (this.sp_op_disabled) {
        return
      }

      if (this.shortcut_hook(e)) {
        return
      }

      if (!this.key_event_capture) {
        return
      }

      if (this.view_p || this.play_p) {
        const dom = document.activeElement
        const controllers = [this.$refs.first, this.$refs.previous, this.$refs.next, this.$refs.last] // FIXME: 指定DOMの下にあるか？の方法がわかればもっと簡潔になる
        if (!(dom === undefined || dom.tagName === "BODY" || _.includes(controllers, dom))) {
          return
        }

        if (e.code === "Backspace" || e.code === "ArrowUp" || e.code === "ArrowLeft" || e.key === "k" || e.key === "p" || e.key === "b") {
          this.relative_move(-1, e)
          e.preventDefault()
        }

        if (e.code === "Space" || e.code === "Enter" || e.code === "ArrowDown" || e.code === "ArrowRight" || e.key === "j" || e.key === "n" || e.key === "f") {
          this.relative_move(1, e)
          e.preventDefault()
        }
      }

      // let gap = null
      // let force_value = null
      //
      // if (e.code === "Space" || e.code === "Enter" || e.code === "ArrowDown" || e.code === "ArrowRight" || e.key === "j" || e.key === "n" || e.key === "f") {
      //   gap = 1
      // }
      // if (e.code === "Backspace" || e.code === "ArrowUp" || e.code === "ArrowLeft" || e.key === "k" || e.key === "p" || e.key === "b") {
      //   gap = -1
      // }
      // if (e.key === "PageUp") {
      //   gap = -10
      // }
      // if (e.key === "PageDown") {
      //   gap = 10
      // }
      // if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) {
      //   if (gap) {
      //     gap *= 10
      //   }
      // }
      // if (e.key === "[" || e.key === "Home" || e.code === "Escape") {
      //   force_value = this.turn_offset_min
      // }
      // if (e.key === "]" || e.key === "End") {
      //   force_value = this.turn_offset_max
      // }
      //
      // let v = this.current_turn
      // if (gap !== null) {
      //   v += gap
      // }
      // if (force_value !== null) {
      //   v = force_value
      // }
      // if (v < this.turn_offset_min) {
      //   v = this.turn_offset_min
      // }
      // if (this.turn_offset_max < v) {
      //   v = this.turn_offset_max
      // }
      // this.current_turn = v
      //
      // if (gap !== null || force_value !== null) {
      //   e.preventDefault()
      // }
    },

    navi_relative_move(v, event) {
      this.relative_move(v, event)
    },

    relative_move(v, event = null) {
      if (event) {
        if (event.shiftKey) {
          if (this.shift_key_mag) {
            v *= this.shift_key_mag
          }
        }
        if (event.ctrlKey || event.altKey || event.metaKey) {
          if (this.system_key_mag) {
            v *= this.system_key_mag
          }
        }
      }

      this.current_turn_add(v)

      // TurnSliderBlock → (next || previous) の順でフォーカスを試みる
      if (!this.turn_slider_focus()) {
        // this.toast_ok("focusしてないのでフォーカスする")
        if (v > 0) {
          this.nav_focus_to("next")
        } else {
          this.nav_focus_to("previous")
        }
      }
    },

    move_to_first() {
      this.current_turn_set(this.turn_offset_min)
      this.turn_slider_focus() || this.nav_focus_to("first")
    },

    move_to_last() {
      this.current_turn_set(this.turn_offset_max)
      this.turn_slider_focus() || this.nav_focus_to("last")
    },

    current_turn_add(v) {
      this.current_turn_set(this.mediator.turn_offset + v)
    },

    current_turn_set(v) {
      const new_val = this.mediator.turn_clamp(v)
      const updated = this.turn_offset !== new_val

      if (updated) {
        if (this.view_p) {
          this.view_mode_mediator_update(new_val)
        }
        if (this.play_p) {
          this.play_mode_mediator_seek_to(new_val)
        }
        this.sound_play("piece_put")
        this.$emit("update:start_turn", this.turn_offset)
      }
    },

    nav_focus_to(key) {
      const el = this.navigate_block_element_refs(key)
      if (el) {
        el.focus()
        return true
      }
      return false
    },

    turn_slider_focus() {
      const TurnSliderBlock = this.navigate_block_element_refs("TurnSliderBlock")
      if (TurnSliderBlock) {
        return TurnSliderBlock.focus_to_self()
      }
      return false
    },

    navigate_block_element_refs(key) {
      if (this.base.$NavigateBlock) {
        return this.base.$NavigateBlock.$refs[key]
      }
    },

    board_flip_toggle() {
      this.new_flip = !this.new_flip
      this.sound_play("flip_sound")
      this.turn_slider_focus()
    },
  },
  computed: {
    //////////////////////////////////////////////////////////////////////////////// for NavigateBlock.vue, TurnSliderBlock.vue

    inside_controller_p() {
      if (this.sp_setting === "is_setting_on") {
        return true
      }
      return this.sp_controller === "is_controller_on" && (this.view_p || this.play_p)
    },

    inside_slider_p() {
      return this.sp_slider === "is_slider_on" && (this.view_p || this.play_p)
    },

    inside_navigate_p() {
      return this.inside_controller_p || this.inside_slider_p
    },
  },
}
