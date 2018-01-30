<template>
<div class="flex_item piece_stand" :class="[`location_${location.key}`, $parent.env, {turn_active: $parent.mediator.location_next.key === location.key}]">
  <ul>
    <li class="location_mark">{{location.name}}</li>
    <li v-for="[piece, count] in $parent.mediator.realized_hold_pieces_of(location.key)">
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
  },

  computed: {
    location: function () {
      return Location.fetch(this.location_key)
    },
  },
}
</script>
