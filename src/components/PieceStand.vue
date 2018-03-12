<template>
<div class="flex-item piece_stand" :class="[`location_${location.key}`, $parent.env, {turn_active: $parent.mediator.current_location.key === location.key}]">
  <ul>
    <li class="location_mark">{{location.name}}</li>
    <li v-for="[piece, count] in hold_pieces" @click="$parent.hold_piece_click(location.key, piece, $event)" :class="{active: hold_piece_have_p(piece)}">
      <span :class="piece.css_class_list">{{piece.name}}</span>
      <span v-if="count >= 2" class="piece_count">{{count}}</span>
    </li>
  </ul>
</div>
</template>

<script>
import { Location } from "../location"

export default {
  props: {
    location_key: { required: true },
    hold_pieces: { required: true },
  },

  methods: {
    hold_piece_have_p: function (piece) {
      return this.$parent.mediator.current_location === this.location && this.$parent.have_piece === piece
    },
  },

  computed: {
    location: function () {
      return Location.fetch(this.location_key)
    },
  },
}
</script>
