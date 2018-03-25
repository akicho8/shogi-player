<template>
<div :class="piece_stand_class" @click.stop="$parent.piece_stand_click(location, $event)">
  <ul>
    <li class="location_mark">{{location.name}}</li>
    <li v-for="[piece, count] in hold_pieces" @click.stop="$parent.piece_stand_piece_click(location, piece, $event)">
      <div class="piece_outer" :class="piece_outer_class(piece)">
        <span :class="piece_class(piece)">{{piece.name}}</span>
      </div>
      <span v-if="count >= 2" class="piece_count">{{count}}</span>
    </li>
  </ul>
</div>
</template>

<script>
import { Location } from "../location"
import _ from "lodash"

export default {
  props: {
    location_key: { required: true },
    hold_pieces: { required: true },
  },

  methods: {
    hold_piece_holding_p(piece) {
      return this.$parent.have_piece_location === this.location && this.$parent.have_piece === piece
    },

    piece_outer_class(piece) {
      let list = []
      // list = _.concat(list, piece.css_class_list)
      // list.push("piece_inner")
      // list.push(`location_black`) // 本当は this.location.key を埋めるべきだけど後手の駒台は180度反転するため先手の向きとする
      // list.push("promoted_false")

      if (this.hold_piece_holding_p(piece)) {
        list.push("holding_p")
      } else if (this.$parent.mediator.current_location === this.location || this.$parent.run_mode2 === "edit_mode") {
        list.push("selectable_p")
      }

      return list
    },

    piece_class(piece) {
      let list = []
      list = _.concat(list, piece.css_class_list)
      list.push("piece_inner")
      list.push(`location_black`) // 本当は this.location.key を埋めるべきだけど後手の駒台は180度反転するため先手の向きとする
      list.push("promoted_false")

      // if (this.hold_piece_holding_p(piece)) {
      //   list.push("holding_p")
      // } else if (this.$parent.mediator.current_location === this.location || this.$parent.run_mode2 === "edit_mode") {
      //   list.push("selectable_p")
      // }

      return list
    },
  },

  computed: {
    location() {
      return Location.fetch(this.location_key)
    },

    piece_stand_class() {
      const list = []
      list.push("piece_stand")
      list.push(`location_${this.location.key}`)
      list.push(this.$parent.env)
      if (this.$parent.mediator.current_location === this.location) {
        list.push("turn_active")
      }
      return list
    },
  },
}
</script>
