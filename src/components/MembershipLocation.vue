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
  &.is_layer_on
    .MembershipLocation
      border: 1px dashed change_color($primary, $alpha: 0.5)

  &.is_vertical
    .is_white
      .MembershipLocation
        margin-right: auto    // 「………△飛歩」→「△………飛歩」
    .is_black
      .MembershipLocation
        margin-left: auto     // 「………飛歩▲」→「飛歩………▲」

  // is_vertical と同じにする(共通化禁止)
  +mobile
    .is_white
      .MembershipLocation
        margin-right: auto    // 「………△飛歩」→「△………飛歩」
    .is_black
      .MembershipLocation
        margin-left: auto     // 「………飛歩▲」→「飛歩………▲」
</style>
