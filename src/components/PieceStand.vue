<template>
<div class="piece_stand" :class="[`location_${location.key}`, $parent.env, {turn_active: $parent.mediator.current_location === location}]" @click.stop="$parent.piece_stand_click(location, $event)">
  <ul>
    <li class="location_mark">{{location.name}}</li>
    <li v-for="[piece, count] in hold_pieces" @click.stop="$parent.piece_stand_piece_click(location, piece, $event)">
      <span :class="li_class(piece)">{{piece.name}}</span>
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
    hold_piece_have_p: function (location, piece) {
      return this.$parent.have_piece_location === location && this.$parent.have_piece === piece
    },

    li_class(piece) {
      let list = []
      list = _.concat(list, piece.css_class_list)
      if (this.hold_piece_have_p(this.location, piece)) {
        list.push("holding_p")
      } else if (this.$parent.mediator.current_location === this.location || this.$parent.run_mode2 === "edit_mode") {
        list.push("piece_selectable")
      }
      return list
    },
  },

  computed: {
    location() {
      return Location.fetch(this.location_key)
    },
  },
}
</script>
