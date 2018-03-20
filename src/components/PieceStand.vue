<template>
<div class="piece_stand" :class="[`location_${location.key}`, $parent.env, {turn_active: $parent.mediator.current_location === location}]" @click.stop="$parent.piece_stand_click(location, $event)">
  <ul>
    <li class="location_mark">{{location.name}}</li>
    <li v-for="[piece, count] in hold_pieces" @click.stop="$parent.piece_stand_piece_click(location, piece, $event)" :class="{active: hold_piece_have_p(location, piece)}">
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
    hold_piece_have_p: function (location, piece) {
      return this.$parent.have_piece_location === location && this.$parent.have_piece === piece
    },
  },

  computed: {
    location: function () {
      return Location.fetch(this.location_key)
    },
  },
}
</script>
