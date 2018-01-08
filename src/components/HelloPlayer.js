import { Piece } from "../piece"
import { Mediator } from "../mediator"

/* eslint-disable no-new */
export default {
  name: 'HelloPlayer',

  data () {
    return {
      current_turn: 0,
      mediator: null,
      board_turn: false,
      env: process.env.NODE_ENV,
    }
  },

  created () {
    this.current_turn = 0
    this.mediator_create()
    document.addEventListener("keydown", this.keyboard_operation)
  },

  watch: {
    current_turn: function () {
      if (this.mediator) {
        this.current_turn = this.mediator.current_turn_clamp(this.current_turn)
      }
      this.mediator_create()
    }
  },

  methods: {
    keyboard_operation: function (e) {
      if (this.env !== "production") {
        console.log(e.shiftKey, e.ctrlKey, e.altKey, e.metaKey)
        console.log("e", e)
        console.log("key", e.key)
        console.log("code", e.code)
      }

      let gap = null
      let force_value = null

      if (e.code === "Space" || e.code === "Enter" || e.code === "ArrowDown" || e.code === "ArrowRight" || e.key === "j" || e.key === "n" || e.key === "f") {
        gap = 1
      }
      if (e.code === "Backspace" || e.code === "ArrowUp" || e.code === "ArrowLeft" || e.key == "k" || e.key == "p" || e.key == "b") {
        gap = -1
      }
      if (e.key === "PageUp") {
        gap = -10
      }
      if (e.key === "PageDown") {
        gap = 10
      }
      if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) {
        if (gap) {
          gap *= 10
        }
      }
      if (e.key === "[" || e.key === "Home" || e.code == "Escape") {
        force_value = this.mediator.sfen.turn_counter_base()
      }
      if (e.key === "]" || e.key === "End") {
        force_value = this.mediator.sfen.turn_counter_max()
      }

      if (gap !== null) {
        this.current_turn += gap
      }
      if (force_value !== null) {
        this.current_turn = force_value
      }

      if (gap !== null || force_value !== null) {
        e.preventDefault()
      }
    },

    mediator_create () {
      this.mediator = new Mediator()
      this.mediator.kifu_body = "position startpos moves 2g2f 3c3d 2f2e 2b3c 7g7f 3a4b 3i4h 5c5d 5i6h 5d5e 3g3f 8b5b 4h3g 4b5c 3g4f 5c4d 4i5h 5a6b 6h7h 6b7b 6g6f 7b8b 5h6g 7a7b 8h7g 9c9d 7h8h 9d9e 9i9h 8c8d 8h9i 7b8c 7i8h 6a7b 6f6e 7c7d 6g6f 8a7c 7g8f 5b5a 2h7h 8d8e 8f5i 3c4b 6i7i 2a3c 7f7e 7d7e 6f7e 4b7e 7h7e P*7d 7e7f G*7e 7f7h 5e5f 5g5f 7e6e 5f5e P*5f 5i2f 1c1d P*6b 4a5b 6b6a+ 5a6a 5e5d 6e6f 7h6h 6f7f P*7g 7f7e 6h5h 7e6f 5h6h 6f6e B*3b 8e8f 8g8f 3d3e 3b2c+ 6c6d 3f3e 6a2a 2c3d 9a9b 2f4h 2a9a 2e2d 6e7e 3d5f P*8d 4h7e 7d7e 6h6d 5b6c 6d6h B*6e 6h6e 7c6e 5f6e R*5i N*6f 7b7c B*5b 6c6d 6e6d 7c6d P*6e B*4h 6e6d 4h6f+ G*7c"
      this.mediator.current_turn = this.current_turn
      this.mediator.run()
    },
  },

  filters: {
    piece_name(piece_key) {
      return Piece.fetch(piece_key).name
    },
  },
}
