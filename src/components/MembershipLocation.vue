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
          // margin-right: auto  // ▲だけ左寄せ (左寄せにしたければ右側のマージンをautoにする)
      &.location_black
        .MembershipLocation
          // margin-left: auto  // ▲だけ右寄せ (右寄せにしたければ左側のマージンをautoにする)

      .MembershipLocation
        margin-left: auto  // ▲だけ右寄せ (右寄せにしたければ左側のマージンをautoにする)
        font-size: 1rem
        .location_mark
          color: $sp_simple_grid_color

      //////////////////////////////////////////////////////////////////////////////// 手番のとき
      &.turn_active
        .MembershipLocation
          .location_mark
            color: $sp_simple_turn_active_color
            -webkit-text-stroke: 1px $sp_simple_turn_active_color
            text-shadow: 0 0 0.5rem $sp_simple_turn_active_color

  &.vertical
    // 反転してない状態で上の最初から反転している「△後手」を先手目線にするため反転する
    // つまり反転したのを一部反転して元に戻す
    .flip_off
      .Membership
        &.location_white
          .MembershipLocation
            @extend %is_flip
    // 同様に反転させたときは▲が上にくるので location_black の方を反転する
    .flip_on
      .Membership
        &.location_black
          .MembershipLocation
            @extend %is_flip
</style>
