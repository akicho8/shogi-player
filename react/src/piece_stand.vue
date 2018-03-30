<template>
<div class="flex_item piece_stand" :class="[`location_${location.key}`, $parent.env, {turn_active: $parent.mediator.current_location === location}]">
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

    hold_pieces: function () {  // FIXME: この結果を親から渡せばいんじゃね？ いや mediator を渡す？
      const list = Object.entries(this.$parent.mediator.hold_pieces[this.location.key])
      return _(list)
        .filter(([key, count]) => count >= 1)
        .map(([key, count]) => [Piece.fetch(key), count])
        .sortBy(([key, count]) => key.code)
        .value()
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
    //   border: 2px solid $sp_simple_grid_color
    //   background: $sp_simple_board_bg
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
        color: $sp_simple_piece_color
        font-size: $sp-simple-font-size

        // 持駒数
        .piece_count
          vertical-align: middle
          margin-left: 0.3rem
          font-size: $sp-simple-font-size * 0.8

        // 駒台の上のマーク
        .location_mark

    &.turn_active
      // border: 2px solid $sp_simple_grid_color
      // background: $sp_simple_board_bg
      // border-radius: 0.5vmin

      ul
        li.location_mark
          text-shadow: 0 0 0.5rem hsl(0,50%,50%)
</style>
