<template lang="pug">
//- .MembershipLocationMark(v-text="location.name")
.MembershipLocationMark
  .MembershipLocationMarkTexture
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
    display: flex
    justify-content: center
    align-items: center    // 下を揃えて配置したいときは flex-end にすること(オプションにする)

    width:  var(--sp_stand_piece_w)
    height: var(--sp_stand_piece_h)

  .MembershipLocationMarkTexture
    background-position: center
    background-repeat: no-repeat
    background-size: contain

    width:  var(--sp_stand_piece_rate)
    height: var(--sp_stand_piece_rate)

  .is_black
    .MembershipLocationMarkTexture
      background-image: url("../assets/location_black.svg")
      +filter_drop_shadow(1)

  .is_white
    .MembershipLocationMarkTexture
      background-image: url("../assets/location_white.svg")
      +filter_drop_shadow(-1)
      @extend %is_flip

  .is_turn_active
    .MembershipLocationMark
      position: relative
      // animation: jump_animation 0.1s ease-in-out infinite alternate

@keyframes jump_animation
  0%
    top: 0
  100%
    top: -2px
</style>
