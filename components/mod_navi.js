import _ from "lodash"
import { Location } from "./models/location.js"

const FOCUS_FUNCTION = false

export const mod_navi = {
  props: {
    // 手数や結果の表示(再生モード時) (true false)
    sp_turn_show: {
      type: Boolean,
      default: false,
    },

    // スライダー表示
    sp_slider: {
      type: Boolean,
      default: false,
    },

    // コントローラー表示
    sp_controller: {
      type: Boolean,
      default: false,
    },

    // 全体の操作を無効化
    sp_operation_disabled: {
      type: Boolean,
      default: false,
    },

    // 駒がないときは駒台側を非表示
    sp_piece_stand_blank_then_hidden: {
      type: Boolean,
      default: false,
    },

    // スライダーにフォーカスしていなくても左右キーで手数を動かす
    sp_key_event_capture: {
      type: Boolean,
      default: false,
    },
  },

  mounted() {
    window.addEventListener("keydown", this.keydown_hook, false)
  },

  beforeDestroy() {
    window.removeEventListener('keydown', this.keydown_hook)
  },

  methods: {
    keydown_hook(e) {
      if (this.debug_or_development_p) {
        this.log(document.activeElement)
        this.log(e.shiftKey, e.ctrlKey, e.altKey, e.metaKey)
        this.log("e", e)
        this.log("key", e.key)
        this.log("code", e.code)
        this.log("repeat", e.repeat)
      }

      if (this.sp_operation_disabled) {
        return
      }

      if (this.focus_on_input_tag_p()) {
        return
      }

      if (this.shortcut_hook(e)) {
        return
      }

      if (this.sp_key_event_capture && (this.view_p || this.play_p)) {
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
          this.api_turn_add(-1, {interactive: e})
          e.preventDefault()
        }

        if (e.code === "Space" || e.code === "Enter" || e.code === "ArrowDown" || e.code === "ArrowRight" || e.key === "j" || e.key === "n" || e.key === "f") {
          this.api_turn_add(1, {interactive: e})
          e.preventDefault()
        }
      }
    },

    api_turn_add(v, options = {}) {
      this.current_turn_add(v, options)

      // SpSlider → (next || previous) の順でフォーカスを試みる
      if (!this.turn_slider_focus()) {
        // スライダーにはフォーカスできなかったのでボタンの方にフォーカスする
        if (v > 0) {
          this.nav_focus_to("next")
        } else {
          this.nav_focus_to("previous")
        }
      }
    },

    move_to_first(options = {}) {
      this.current_turn_set(this.turn_offset_min, options)
      this.turn_slider_focus() || this.nav_focus_to("first")
    },

    move_to_last(options = {}) {
      this.current_turn_set(this.turn_offset_max, options)
      this.turn_slider_focus() || this.nav_focus_to("last")
    },

    current_turn_add(v, options = {}) {
      this.current_turn_set(this.xcontainer.turn_offset + v, options)
    },

    current_turn_set(v, options = {}) {
      let new_val = null
      if (options.cycle) {
        new_val = this.xcontainer.turn_cycle(v)
      } else {
        new_val = this.xcontainer.turn_clamp(v)
      }

      const updated = this.turn_offset !== new_val

      if (updated) {
        this.state_reset() // 駒を持った状態でコントローラーを操作したとき駒を持ち上げた状態が残るのを防ぐ

        if (this.view_p) {
          this.view_mode_xcontainer_update(new_val)
        }
        if (this.play_p) {
          this.play_mode_xcontainer_seek_to(new_val)
        }
        this.event_call("update:sp_turn", this.turn_offset)

        if (options.interactive) {
          this.log("局面を人が故意に変更")
          this.event_call("ev_action_turn_change", this.turn_offset) // b-slider で変更
        }
      }
    },
  },
  computed: {

    //////////////////////////////////////////////////////////////////////////////// for NavigateBlock.vue, SpSlider.vue

    inside_controller_p() {
      // if (this.mut_dev_tools) {
      //   return true
      // }
      return this.sp_controller && (this.view_p || this.play_p)
    },

    inside_slider_p() {
      return this.sp_slider && (this.view_p || this.play_p)
    },

    inside_navigate_p() {
      return this.inside_controller_p || this.inside_slider_p
    },
  },
}
