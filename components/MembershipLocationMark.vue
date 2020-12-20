<template lang="pug">
.MembershipLocationMark(:class="component_class" @click="click_handle")
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
  methods: {
    click_handle() {
      if (this.flipable) {
        this.base.board_flip_toggle()
      }
      if (this.base.location_click_handle) {
        this.base.location_click_handle(this.location)
      }
    },
  },
  computed: {
    component_class() {
      return {
        "is-clickable": this.base.location_click_handle || this.flipable
      }
    },
    flipable() {
      return this.base.sp_location_behavior === "is_location_flip_on"
    },
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayerGround
  +defvar(sp_location_mark_inactive_rate, 0.5) // 手番ではないときの☗サイズの倍率

  .MembershipLocationMark
    display: flex
    justify-content: center
    align-items: center    // 下を揃えて配置したいときは flex-end にすること(オプションにする)

  .MembershipLocationMarkTexture
    background-position: center
    background-repeat: no-repeat
    background-size: contain

  .is_black
    .MembershipLocationMarkTexture
      background-image: url("../assets/location/location_black.svg")
      +filter_drop_shadow(1)

  .is_white
    .MembershipLocationMarkTexture
      background-image: url("../assets/location/location_white.svg")
      +filter_drop_shadow(-1)
      @extend %is_flip // 反転しない方がいいかもしれない

  //////////////////////////////////////////////////////////////////////////////// サイズ (基本)

  .MembershipLocationMark
    width:  var(--sp_stand_piece_w)
    height: var(--sp_stand_piece_h)
  .MembershipLocationMarkTexture
    width:  var(--sp_stand_piece_rate)
    height: var(--sp_stand_piece_rate)
  .is_turn_inactive
    .MembershipLocationMarkTexture
      width:  calc(var(--sp_stand_piece_rate) * var(--sp_location_mark_inactive_rate))
      height: calc(var(--sp_stand_piece_rate) * var(--sp_location_mark_inactive_rate))

  //////////////////////////////////////////////////////////////////////////////// サイズ (mobile)
  +mobile
    &.is_mobile_style_on
      .MembershipLocationMark
        width:  var(--sp_stand_piece_w_mobile)
        height: var(--sp_stand_piece_h_mobile)
      .MembershipLocationMarkTexture
        width:  var(--sp_stand_piece_rate_mobile)
        height: var(--sp_stand_piece_rate_mobile)
      .is_turn_inactive
        .MembershipLocationMarkTexture
          width:  calc(var(--sp_stand_piece_rate_mobile) * var(--sp_location_mark_inactive_rate))
          height: calc(var(--sp_stand_piece_rate_mobile) * var(--sp_location_mark_inactive_rate))
</style>
