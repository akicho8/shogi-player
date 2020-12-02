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
      width:  calc(38px * 0.7)
      height: calc(46px * 0.7)

    .is_turn_active
      .MembershipLocationMark
        position: relative
        animation: jump_animation 0.1s ease-in-out infinite alternate

@keyframes jump_animation
  0%
    top: 0
  100%
    top: -2px
</style>
