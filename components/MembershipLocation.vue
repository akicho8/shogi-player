<template lang="pug">
.MembershipLocation
  // 要素縦並びにする
  //
  // "▲名前"  ← MembershipLocationMark + .player_name
  // "12:34"   ← .time_format
  //
  //- .is-flex
  MembershipLocationMark(:base="base" :location="location")
  MembershipLocationPlayerInfo(:base="base" :location="location")
  //- .player_name.ml-1.has-text-weight-bold(v-if="player_name" v-text="player_name")
  //- .time_format(v-if="player_time" v-text="player_time")
</template>

<script>
import { support } from "./support.js"
import MembershipLocationMark       from "./MembershipLocationMark.vue"
import MembershipLocationPlayerInfo from "./MembershipLocationPlayerInfo.vue"

export default {
  name: "MembershipLocation",
  mixins: [support],
  props: {
    location: { required: true },
  },
  components: {
    MembershipLocationMark,
    MembershipLocationPlayerInfo,
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayerGround
  .MembershipLocation
    display: flex
    justify-content: center
    align-items: center

  &.is_layer_on
    .MembershipLocation
      border: 1px dashed change_color($primary, $alpha: 0.5)

  =is_vertical_style
    .is_white
      .MembershipLocation
        margin-right: auto    // 「………△飛歩」→「△………飛歩」
    .is_black
      .MembershipLocation
        margin-left: auto     // 「………飛歩▲」→「飛歩………▲」
  &.is_vertical
    +is_vertical_style
  +mobile
    &.is_mobile_style
      +is_vertical_style
</style>
