<template lang="pug">
.piece_stand_outer(:class="piece_stand_outer_class")
  .location_mark_wrap
    .location_mark(v-html="location_name")
    .piece_count.piece_count1
      //- 2桁にして幅を常に予約しておく
      | 99

  ul.piece_stand(@click.stop.prevent="$parent.piece_stand_click(location, $event)" @click.right.stop.prevent="$parent.hold_cancel")
    li(v-for="[piece, count] in hold_pieces" @click.stop="$parent.piece_stand_piece_click(location, piece, $event)")
      .piece_back(:class="piece_back_class(piece)")
        .piece_fore(:class="piece_fore_class(piece)")
          | {{piece.name}}
      .piece_count(v-if="count >= 1" :class="`piece_count${count}`")
        | {{count}}
</template>

<script>
import Location from "../location"
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

    piece_back_class(piece) {
      let list = []
      if (this.hold_piece_holding_p(piece)) {
        list.push("holding_p")
      } else if (this.$parent.current_run_mode === "edit_mode" || (!this.$parent.cpu_location_p && this.$parent.mediator.current_location === this.location)) {
        list.push("selectable_p")
      }

      // list = _.concat(list, piece.css_class_list)
      // list.push(`location_${this.location.key}`)
      // list.push("promoted_false")

      return list
    },

    piece_fore_class(piece) {
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
