<template>
<div class="flex_item piece_stand" :class="[`location_${location_key}`, $parent.env]">
  <ul>
    <li>{{location_key | location_name}}</li>
    <template v-for="[piece_key, count] in hold_pieces">
      <li>
        <span class="piece_name">{{piece_key | piece_name}}</span>
        <template v-if="count >= 2">
          <span class="piece_count">{{count}}</span>
        </template>
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
    hold_pieces: function () {
      let list = Array.from(this.$parent.mediator.hold_pieces.get(this.location_key))
      list = list.filter((key, count) => count >= 1)
      return _.sortBy(list, ([key, count]) => Piece.fetch(key).code)
    },
  },

  filters: {
    piece_name(key) {
      return Piece.fetch(key).name
    },
    location_name(key) {
      return Location.fetch(key).name
    },
  },
}
</script>

<style scoped lang="sass">
@import "variables"

.shogi-player
  .piece_stand
    min-width: 8vmin
    margin: 0 1vmin
    text-align: left

    // &.development
    //   border: 2px solid $line-color
    //   background: $board-bg-color
    //   border-radius: 0.5vmin

    ul
      list-style-type: none
      padding: 0 0.25vmin
      margin: 1vmin
      li
        // 歩(2) の並びを横軸中央で揃える
        display: flex
        align-items: center

        // 持駒
        color: $piece-color
        font-size: $font-size

        // 持駒数
        .piece_count
          vertical-align: middle
          margin-left: 0.3rem
          font-size: $font-size * 0.8

        // 駒台の上のマーク
        .location_mark
</style>
