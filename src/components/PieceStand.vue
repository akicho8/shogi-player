<template lang="pug">
.piece_stand_outer(:class="piece_stand_outer_class" v-if="piece_stand_show_flag")
  .location_mark_wrap
    .location_mark(v-html="location_name")

    //- 2桁にして幅を常に予約しておく
    template(v-if="!$parent.current_vlayout")
      .piece_count.piece_count1
        | 99

    template(v-if="$parent.current_vlayout && player_name")
      .player_name
        | {{player_name}}

  template(v-if="!$parent.current_vlayout && player_name")
    .player_name
      | {{player_name}}

  ul.piece_stand(:class="piece_stand_class" @click.stop.prevent="$parent.piece_stand_click(location, $event)" @click.right.stop.prevent="$parent.hold_cancel")
    li(v-for="[piece, count] in hold_pieces" @click.stop="$parent.piece_stand_piece_click(location, piece, false, $event)" @mouseover="$parent.piece_stand_mouseover_handle(location, piece, $event)" @mouseleave="$parent.mouseleave_handle")
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

      // if (this.holding_p) {
      //   list.push("hoverable_p")
      // }

      if (this.hold_piece_holding_p(piece)) {
        list.push("holding_p")
      } else if (this.$parent.current_run_mode === "edit_mode" || (!this.$parent.cpu_location_p && this.$parent.mediator.current_location === this.location)) {
        if (!this.holding_p) {
          list.push("selectable_p")
        }
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
    holding_p() {
      return this.$parent.holding_p
    },

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
    },

    piece_stand_class() {
      const list = []

      if (this.holding_p) {
        list.push("hoverable_p")
      }

      return list
    },

    // ビューモードのとき持駒が空なら駒台を表示しない
    piece_stand_show_flag() {
      if (this.$parent.current_run_mode === "view_mode" && this.$parent.hidden_if_piece_stand_blank && _.isEmpty(this.hold_pieces)) {
        return false
      }
      return true
    },

    player_name() {
      if (this.player_info) {
        return this.player_info[this.location.key].name
      }
    },

    player_info() {
      return this.$parent.player_info
    },
  },
}
</script>
