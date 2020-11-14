<template lang="pug">
.MembershipLocation.is-flex
  .location_mark(v-html="location.name")
  .player_name.has-text-weight-bold(v-if="player_name")
    | {{player_name}}
</template>

<script>
import { support_child } from "./support_child.js"

export default {
  name: "MembershipLocation",
  mixins: [support_child],

  props: {
    location: { required: true },
  },

  computed: {
    player_name() {
      if (this.player_info) {
        return this.player_info[this.location.key].name
      }
    },
    player_info() {
      return this.base.player_info
    },
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.shogi-player
  &.vertical
    .Membership
      &.location_white
        .MembershipLocation
          margin-right: auto  // ▲だけ左寄せ (左寄せにしたければ右側のマージンをautoにする)
      &.location_black
        .MembershipLocation
          margin-left: auto  // ▲だけ右寄せ (右寄せにしたければ左側のマージンをautoにする)

      .MembershipLocation
        font-size: 1rem
        .location_mark
          color: $sp_simple_grid_color

      &.turn_active
        .MembershipLocation
          .location_mark
            color: $sp_simple_turn_active_color
            -webkit-text-stroke: 1px $sp_simple_turn_active_color
            text-shadow: 0 0 0.5rem $sp_simple_turn_active_color
</style>
