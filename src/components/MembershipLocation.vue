<template lang="pug">
.MembershipLocation
  // 要素縦並びにする
  //
  // "▲名前"  ← MembershipLocationMark + .player_name
  // "12:34"   ← .time_format
  //
  //- .is-flex
  MembershipLocationMark(:base="base" :location="location")
    //- .player_name.ml-1.has-text-weight-bold(v-if="player_name" v-text="player_name")
  //- .time_format(v-if="player_time" v-text="player_time")
</template>

<script>
import { support } from "./support.js"
import MembershipLocationMark from "./MembershipLocationMark.vue"

export default {
  name: "MembershipLocation",
  mixins: [support],
  props: {
    location: { required: true },
  },
  components: {
    MembershipLocationMark,
  },
  methods: {
    player_attr(key) {
      if (this.base.player_info) {
        return this.base.player_info[this.location.key][key]
      }
    },
  },
  computed: {
    player_name() { return this.player_attr("name") },
    player_time() { return this.player_attr("time") },
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayerPure
  .MembershipLocation

    // flex-direction: column  // 縦並びにする場合
    // align-items: center     // 縦並びなのでY座標を中央にするとXが中央になる
    // justify-content: center // 縦並びなのでX座標を中央にするとYが中央になる

  &.is_layer_on
    .MembershipLocation
      border: 1px dashed change_color($primary, $alpha: 0.5)

  // .is_black
  //   .MembershipLocation
  //     background-image: url("../assets/location_black.svg")
  //     filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5))
  //
  // .is_white
  //   .MembershipLocation
  //     background-image: url("../assets/location_white.svg")
  //     filter: drop-shadow(-2px -2px 2px rgba(0, 0, 0, 0.5))

  //- &.is_horizontal
  //-   .is_white
  //-     .MembershipLocation
  //-       @extend %is_flip      // 全体横並び → 後手側 → △反転

  &.is_vertical
    .MembershipLocation
      margin-left: auto
  +mobile
    .MembershipLocation
      margin-left: auto

  ////////////////////////////////////////////////////////////////////////////////
  // &.is_vertical
  //   // 反転してない状態で上の最初から反転している「△後手」を先手目線にするため反転する
  //   // つまり反転したのを一部反転して元に戻す
  //   .is_flip_off
  //     .Membership
  //       &.is__white
  //         .MembershipLocation
  //           @extend %is_flip
  //   // 同様に反転させたときは▲が上にくるので location_black の方を反転する
  //   .is_flip_on
  //     .Membership
  //       &.is__black
  //         .MembershipLocation
  //           @extend %is_flip
</style>
