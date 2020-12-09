export const app_keyboard_shortcut = {
  mounted() {
    document.addEventListener("keydown", this.keydown_handle)
  },

  beforeDestroy() {
    document.removeEventListener("keydown", this.keydown_handle)
  },

  methods: {
    keydown_handle(e) {
      if (this.development_p) {
        console.log(e, e.shiftKey, e.ctrlKey, e.altKey, e.metaKey, e.key, e.code)
      }

      if (this.focus_on_input_tag_p()) {
        return
      }

      // 動作中かつポーズ中は操作禁止
      if (this.chess_clock.running_p && this.chess_clock.timer == null) {
        return
      }

      // 時間切れになったあとは操作禁止
      if (this.chess_clock.zero_arrival) {
        return
      }

      // 左
      if (["ShiftLeft", "ControlLeft", "Tab"].includes(e.code)) {
        this.switch_handle(this.chess_clock.single_clocks[0])
        e.preventDefault()
      }

      // 右
      if (["ShiftRight", "ControlRight", "Enter", "ArrowRight", "ArrowUp", "ArrowDown", "ArrowLeft"].includes(e.code)) {
        this.switch_handle(this.chess_clock.single_clocks[1])
        e.preventDefault()
      }
    },

    focus_on_input_tag_p() {
      const dom = document.activeElement
      if (dom.tagName === "TEXTAREA" || dom.tagName === "INPUT") {
        return true
      }
    },
  },
}
