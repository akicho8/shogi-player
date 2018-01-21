<template>
<div class="shogi-player">
  <p>{{mediator.current_real_turn}}手目</p>
  <div class="board_container board_turn" :class="{enable: board_turn}">
    <PieceStand :location_key="'white'"/>
    <div class="flex_item board_wrap">
      <div class="overlay_navi previous" @click.stop="move_to(-1)"></div>
      <div class="overlay_navi next" @click.stop="move_to(1)"></div>
      <table>
        <tr v-for="y in mediator.dimension">
          <template v-for="x in mediator.dimension">
            <td :class="mediator.cell_class(x -1, y - 1)">
              {{mediator.cell_view(x - 1, y - 1)}}
            </td>
          </template>
        </tr>
      </table>
    </div>
    <PieceStand :location_key="'black'"/>
  </div>
  <template v-if="controller_show">
    <div class="sp-controllers buttons has-addons is-centered">
      <button ref="first"    class="button first"      @click.stop="move_to_first">|◀</button>
      <button ref="previous" class="button previous"   @click.stop="move_to_previous">◀</button>
      <button ref="next"     class="button next"       @click.stop="move_to_next">▶</button>
      <button ref="last"     class="button last"       @click.stop="move_to_last">▶|</button>
      <button                class="button board_turn" @click.stop="board_turn = !board_turn">{{board_turn ? '&#x21BA;' : '&#x21BB;'}}</button>
    </div>
  </template>
  <template v-if="slider_show">
    <input type="range" v-model.number="current_turn" :min="mediator.any_parser.turn_min" :max="mediator.any_parser.turn_max" ref="slider" />
  </template>
  <div v-if="sfen_show">
    {{mediator.to_sfen}}
  </div>
  <template v-if="debug_mode">
    <p>{{mediator.hold_pieces}}</p>
    <p>次の手番:{{mediator.location_next.key}}</p>
    <p>Sfen:{{mediator.to_sfen}}</p>
  </template>
</div>
</template>

<script>
import { Mediator } from "../mediator"
import PieceStand from "./piece_stand"
import _ from "lodash"

// for vue template
// import Vue from 'vue'
// import lodash from "lodash"
// Object.defineProperty(Vue.prototype, '$lodash', {value: lodash})

/* eslint-disable no-new */
export default {
  name: 'ShogiPlayer',

  /* eslint-disable */
  props: {
    kifu_body:                { type: String,  default: "position startpos", },
    turn_start:               { type: Number,  default: 0,                   },
    global_keyboard_operation:  { type: Boolean, default: false                },
    location_hash_embed_turn: { type: Boolean, default: false,               },
    controller_show:          {                default: false,               },
    slider_show:              { type: Boolean, default: false,               },
    sfen_show:                { type: Boolean, default: false,               },
    debug_mode:               { type: Boolean, default: false,               }, // process.env.NODE_ENV !== 'production'
  },
  /* eslint-enable */

  components: {
    PieceStand,
  },

  data() {
    return {
      current_turn: 0,
      mediator: null,
      board_turn: false,
      env: process.env.NODE_ENV,
    }
  },

  created() {
    this.current_turn = this.turn_start || 0
    this.mediator_update()
    document.addEventListener("keydown", this.keyboard_operation)
  },

  watch: {
    current_turn: function () {
      this.mediator_update()
    },
    kifu_body: function () {
      this.mediator_update()
    },
  },

  methods: {
    keyboard_operation: function (e) {
      if (this.env !== "production") {
        console.log(document.activeElement)
        console.log(e.shiftKey, e.ctrlKey, e.altKey, e.metaKey)
        console.log("e", e)
        console.log("key", e.key)
        console.log("code", e.code)
      }

      if (!this.global_keyboard_operation) {
        return
      }

      const dom = document.activeElement
      const controllers = [this.$refs.first, this.$refs.previous, this.$refs.next, this.$refs.last] // FIXME: 指定DOMの下にあるか？の方法がわかればもっと簡潔になる
      if (!(dom === undefined || dom.tagName === "BODY" || _.includes(controllers, dom))) {
        return
      }

      if (e.code === "Backspace" || e.code === "ArrowUp" || e.code === "ArrowLeft" || e.key === "k" || e.key === "p" || e.key === "b") {
        this.move_to_previous()
        e.preventDefault()
      }

      if (e.code === "Space" || e.code === "Enter" || e.code === "ArrowDown" || e.code === "ArrowRight" || e.key === "j" || e.key === "n" || e.key === "f") {
        this.move_to_next()
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
      //   force_value = this.mediator.any_parser.turn_min
      // }
      // if (e.key === "]" || e.key === "End") {
      //   force_value = this.mediator.any_parser.turn_max
      // }
      //
      // let v = this.current_turn
      // if (gap !== null) {
      //   v += gap
      // }
      // if (force_value !== null) {
      //   v = force_value
      // }
      // if (v < this.mediator.any_parser.turn_min) {
      //   v = this.mediator.any_parser.turn_min
      // }
      // if (this.mediator.any_parser.turn_max < v) {
      //   v = this.mediator.any_parser.turn_max
      // }
      // this.current_turn = v
      //
      // if (gap !== null || force_value !== null) {
      //   e.preventDefault()
      // }
    },

    mediator_update() {
      this.mediator = new Mediator()
      this.mediator.kifu_body = this.kifu_body || "position startpos"
      this.mediator.current_turn = this.current_turn
      this.mediator.run()
      this.current_turn = this.mediator.current_real_turn
      if (this.location_hash_embed_turn) {
        document.location.hash = this.current_turn
      }
    },

    move_to(sign) {
      if (this.board_turn) {
        sign *= -1
      }
      if (sign >= 1) {
        this.move_to_next()
      } else {
        this.move_to_previous()
      }
    },

    move_to_previous() {
      if (this.current_turn > this.mediator.any_parser.turn_min) {
        this.current_turn--
      }
      this.focus_to("slider") || this.focus_to("previous")
    },

    move_to_next() {
      if (this.current_turn < this.mediator.any_parser.turn_max) {
        this.current_turn++
      }
      this.focus_to("slider") || this.focus_to("next")
    },

    move_to_first() {
      this.current_turn = this.mediator.any_parser.turn_min
      this.focus_to("slider") || this.focus_to("first")
    },

    move_to_last() {
      this.current_turn = this.mediator.any_parser.turn_max
      this.focus_to("slider") || this.focus_to("last")
    },

    focus_to(key) {
      const el = this.$refs[key]
      if (el) {
        el.focus()
        return true
      }
      return false
    },
  },
}
</script>

<style scoped lang="sass">
  @import "ShogiPlayer"
</style>
