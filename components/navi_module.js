import _ from "lodash"
import Location from "./models/location.js"

export default {
  props: {
    sp_summary:     { type: String,  default: "is_summary_on",     }, // 手数や結果の表示
    sp_slider:      { type: String,  default: "is_slider_off",     }, // スライダー表示
    sp_setting:     { type: String,  default: "is_setting_off",    }, // 設定ボタンの表示
    sp_controller:  { type: String,  default: "is_controller_off", }, // コントローラー表示
    sp_vpoint:      { type: String,  default: "black",             }, // 視点

    sp_op_disabled:                 { type: Boolean, default: false, }, // 全体の操作を無効化
    sp_hidden_if_piece_stand_blank: { type: Boolean, default: false, }, // 駒がないときは駒台側を非表示
    sp_flip_if_white:               { type: Boolean, default: false, }, // 最初に表示した局面が△なら反転

    sp_key_event_capture_enabled:   { type: Boolean, default: false, }, // スライダーにフォーカスしていなくても左右キーで手数を動かす
    sp_shift_key_mag:               { type: Number,  default: 10,    },
    sp_system_key_mag:              { type: Number,  default: 50,    },
  },

  data() {
    return {
      new_vpoint: null,
    }
  },

  mounted() {
    window.addEventListener("keydown", this.keydown_hook, false)
  },

  beforeDestroy() {
    window.removeEventListener('keydown', this.keydown_hook)
  },

  created() {
    this.new_vpoint = this.sp_vpoint
  },

  watch: {
    sp_vpoint(v)  { this.new_vpoint = v               }, // 外 -> 中
    new_vpoint(v) { this.$emit("update:sp_vpoint", v) }, // 中 -> 外
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

      if (this.sp_key_event_capture_enabled && (this.view_p || this.play_p)) {
        const dom = document.activeElement

        if (this.$NavigateBlock) {
          const controllers = [
            this.$NavigateBlock.$refs.first,
            this.$NavigateBlock.$refs.previous,
            this.$NavigateBlock.$refs.next,
            this.$NavigateBlock.$refs.last,
          ]
          if (!(dom === undefined || dom.tagName === "BODY" || _.includes(controllers, dom))) {
            return
          }
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
    },

    navi_relative_move(v, event) {
      this.relative_move(v, event)
    },

    relative_move(v, event = null) {
      if (event) {
        if (event.shiftKey) {
          if (this.sp_shift_key_mag) {
            v *= this.sp_shift_key_mag
          }
        }
        if (event.ctrlKey || event.altKey || event.metaKey) {
          if (this.sp_system_key_mag) {
            v *= this.sp_system_key_mag
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
      this.new_vpoint = Location.fetch(this.new_vpoint).flip.key
      this.sound_play("flip_sound")
      this.turn_slider_focus()
    },
  },
  computed: {
    fliped() { return this.new_vpoint === "white"  },

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
