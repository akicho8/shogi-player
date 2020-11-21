<template lang="pug">
//- .MembershipLocationMark(v-text="location.name")
.MembershipLocationMark
</template>

<script>
import { support_child } from "./support_child.js"

export default {
  name: "MembershipLocationMark",
  mixins: [support_child],
  props: {
    location: { required: true },
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayerPure
  .MembershipLocationMark
    background-position: center
    background-repeat: no-repeat
    background-size: 100%

  .is_black
    .MembershipLocationMark
      background-image: url("../assets/location_black.svg")
      filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5))

  .is_white
    .MembershipLocationMark
      background-image: url("../assets/location_white.svg")
      filter: drop-shadow(-2px -2px 2px rgba(0, 0, 0, 0.5))

  &.is_vertical
    .MembershipLocationMark
      // color: $sp_simple_grid_color

    //////////////////////////////////////////////////////////////////////////////// 手番のとき
    // .turn_active
    //   .MembershipLocationMark
    //     color: $sp_simple_turn_active_color
    //     -webkit-text-stroke: 1px $sp_simple_turn_active_color
    //     text-shadow: 0 0 0.5rem $sp_simple_turn_active_color

</style>
