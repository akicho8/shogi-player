<template lang="pug">
//- .MembershipLocationMark(v-text="location.name")
.MembershipLocationMark
</template>

<script>
import { support } from "./support.js"

export default {
  name: "MembershipLocationMark",
  mixins: [support],
  props: {
    location: { required: true },
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayerGround
  .MembershipLocationMark
    background-position: center
    background-repeat: no-repeat
    background-size: contain

  .is_black
    .MembershipLocationMark
      background-image: url("../assets/location_black.svg")
      +filter_drop_shadow(1)

  .is_white
    .MembershipLocationMark
      background-image: url("../assets/location_white.svg")
      +filter_drop_shadow(-1)
      @extend %is_flip

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
