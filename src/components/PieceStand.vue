<template>
<div class="flex_item piece_stand" :class="[`location_${location.key}`, $parent.env, {turn_active: $parent.mediator.location_next.key === location.key}]">
  <ul>
    <li class="location_mark">{{location.name}}</li>
    <template v-for="[piece, count] in hold_pieces">
      <li>
        <span :class="piece.css_class_list">{{piece.name}}</span>
        <span v-if="count >= 2" class="piece_count">{{count}}</span>
      </li>
    </template>
  </ul>
</div>
</template>

<script>
import _ from "lodash"
import { Piece } from "../piece"
import { Location } from "../location"

export default {
  props: {
    location_key: { required: true },
  },

  computed: {
    location: function () {
      return Location.fetch(this.location_key)
    },

    hold_pieces: function () {
      const list = Array.from(this.$parent.mediator.hold_pieces.get(this.location.key))
      return _(list)
        .filter(([key, count]) => count >= 1)
        .map(([key, count]) => [Piece.fetch(key), count])
        .sortBy(list, ([key, count]) => key.code)
        .value()
    },
  },
}
</script>
