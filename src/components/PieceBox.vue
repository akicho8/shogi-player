<template lang="pug">
ul.piece_box(:class="piece_box_class" v-if="$parent.current_run_mode === 'edit_mode'" @click.stop.prevent="$parent.piece_box_other_click" @click.right.prevent="$parent.hold_cancel")
  li(v-for="[piece, count] in $parent.mediator.piece_box_realize()" @click.stop.prevent="$parent.piece_box_piece_click(piece, $event)" :class="{holding_p: $parent.piece_box_have_p(piece)}" @mouseover="$parent.piece_box_mouseover_handle(piece, $event)" @mouseleave="$parent.mouseleave_handle")
    .piece_back(:class="$parent.piece_box_piece_back_class(piece)")
      .piece_fore(:class="$parent.piece_box_piece_inner_class(piece)" v-text="piece.name")
    .piece_count(v-if="count >= 1" :class="`piece_count${count}`")
      | {{count}}
</template>

<script>
// import Location from "../location"
// import _ from "lodash"

export default {
  props: {
  },

  methods: {
  },

  computed: {
    piece_box_class() {
      const list = []

      if (this.$parent.holding_p) {
        list.push("hoverable_p")
      }

      return list
    },
  },
}
</script>
