<template lang="pug">
.piece_stand_outer(:class="piece_stand_outer_class")
  .location_mark(v-html="location_name")
  ul.piece_stand(@click.stop="$parent.piece_stand_click(location, $event)" @click.right.prevent="$parent.hold_cancel")
    li(v-for="[piece, count] in hold_pieces" @click.stop="$parent.piece_stand_piece_click(location, piece, $event)")
      .piece_outer(:class="piece_outer_class(piece)")
        .piece_inner_wrap
          span(class="piece_inner" :class="piece_class(piece)") {{piece.name}}
      span(v-if="count >= 2" class="piece_count") {{count}}
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
      if (this.hold_piece_holding_p(piece)) {
        list.push("holding_p")
      } else if (this.$parent.current_run_mode === "edit_mode" || (!this.$parent.cpu_location_p && this.$parent.mediator.current_location === this.location)) {
        list.push("selectable_p")
      }
      return list
    },

    piece_class(piece) {
      let list = []
      list = _.concat(list, piece.css_class_list)
      list.push(`location_${this.location.key}`)
      list.push("promoted_false")
      return list
    },
  },

  computed: {
    location() {
      return Location.fetch(this.location_key)
    },

    piece_stand_outer_class() {
      const list = []
      list.push(`location_${this.location.key}`)
      list.push(this.$parent.env)
      if (this.$parent.mediator.current_location === this.location) {
        list.push("turn_active")
      }
      return list
    },

    location_name() {
      // if (this.location.key === "white") {
      //   return '<span style="color:white">☗</span>'
      // } else {
      return this.location.name
      // }
    }
  },
}
</script>
