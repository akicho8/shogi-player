import _ from "lodash"
import { mapState } from 'vuex'

export default {
  /* eslint-disable */
  props: {
    slider_show:       { type: Boolean, default: false, },
    controller_show:   { type: Boolean, default: false, },
    key_event_capture: { type: Boolean, default: false  },
    shift_key_mag:     { type: Number,  default: 10,    },
    system_key_mag:    { type: Number,  default: 50,    },
    flip:              { type: Boolean, default: false  },
  },
  /* eslint-enable */

  data() {
    return {
    }
  },

  mounted() {
    window.addEventListener("keydown", this.keydown_hook, false)
  },

  created() {
    this.$store.state.current_flip = this.flip
  },

  watch: {
    /* eslint-disable */
    current_flip(v)     { this.$emit("update:flip", v)       }, // 中 -> 外
    flip(v)             { this.$store.state.current_flip = v }, // 外 -> 中
    /* eslint-enable */
  },

  methods: {
    keydown_hook(e) {
      if (this.current_debug_mode && false) {
        this.log(document.activeElement)
        this.log(e.shiftKey, e.ctrlKey, e.altKey, e.metaKey)
        this.log("e", e)
        this.log("key", e.key)
        this.log("code", e.code)
        this.log("repeat", e.repeat)
      }

      if (!this.key_event_capture) {
        return
      }

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
      //   force_value = this.turn_min
      // }
      // if (e.key === "]" || e.key === "End") {
      //   force_value = this.turn_max
      // }
      //
      // let v = this.current_turn
      // if (gap !== null) {
      //   v += gap
      // }
      // if (force_value !== null) {
      //   v = force_value
      // }
      // if (v < this.turn_min) {
      //   v = this.turn_min
      // }
      // if (this.turn_max < v) {
      //   v = this.turn_max
      // }
      // this.current_turn = v
      //
      // if (gap !== null || force_value !== null) {
      //   e.preventDefault()
      // }
    },

    navi_relative_move(v, event) {
      this.relative_move(v * this.flip_sign, event)
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

      if (!this.focus_to("turn_slider")) {
        if (v > 0) {
          this.focus_to("next")
        } else {
          this.focus_to("previous")
        }
      }
    },

    move_to_first() {
      this.current_turn_set(this.turn_min)
      this.focus_to("turn_slider") || this.focus_to("first")
    },

    move_to_last() {
      this.current_turn_set(this.turn_max)
      this.focus_to("turn_slider") || this.focus_to("last")
    },

    current_turn_add(v) {
      this.current_turn_set(this.mediator.real_turn + v)
    },

    current_turn_set(v) {
      const new_val = this.mediator.turn_clamp(v)

      if (this.real_turn !== new_val) {
        if (this.current_run_mode === "view_mode") {
          this.view_mode_mediator_update(new_val)
        }
        if (this.current_run_mode === "play_mode") {
          this.play_mode_mediator_seek_to(new_val)
          this.sound_call("piece_sound")
        }
      }
    },

    focus_to(key) {
      const el = this.$refs[key]
      if (el) {
        el.focus()
        return true
      }
      return false
    },

    board_flip_run() {
      this.$store.commit("flip_toggle")
      this.sound_call("flip_sound")
      this.focus_to("turn_slider")
    },
  },

  //
  // ...mapState([
  //   "current_flip",
  // ]),
  //
  // が、
  //
  // Failed to compile.
  //
  // ./node_modules/shogi-player/src/components/navi_module.js
  // Module parse failed: Unexpected token (191:4)
  // You may need an appropriate loader to handle this file type.
  // |       return this.current_flip ? -1 : 1
  // |     },
  // |     ...mapState([
  // |       "current_flip",
  // |     ]),
  //  @ ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./node_modules/shogi-player/src/components/ShogiPlayer.vue 49:19-46
  //  @ ./node_modules/shogi-player/src/components/ShogiPlayer.vue
  //  @ ./app/javascript/packs/application.js
  //  @ multi (webpack)-dev-server/client?http://localhost:3035 ./app/javascript/packs/application.js
  //
  // となるため仕方なく Object.assign を使う
  //
  computed: Object.assign({}, {
    flip_sign() {
      return this.current_flip ? -1 : 1
    },
  }, mapState([
    "current_flip",
  ])),
}
