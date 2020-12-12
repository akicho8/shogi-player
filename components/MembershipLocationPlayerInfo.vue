<template lang="pug">
.MembershipLocationPlayerInfo.has-text-weight-bold.is-size-7(v-if="player_info")
  .PlayerName(v-html="player_name" v-if="player_name")
  .PlayerTime(v-html="player_time" v-if="player_time")
</template>

<script>
import { support } from "./support.js"

export default {
  name: "MembershipLocationPlayerInfo",
  mixins: [support],
  props: {
    location: { required: true },
  },
  methods: {
    player_attr(key) {
      if (this.player_info) {
        return this.player_info[key]
      }
    },
  },
  computed: {
    player_info() {
      if (this.base.player_info) {
        return this.base.player_info[this.location.key]
      }
    },
    player_name() { return this.player_attr("name") },
    player_time() { return this.player_attr("time") },
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayerGround
  .MembershipLocationPlayerInfo
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center

  .is_black
    .MembershipLocationPlayerInfo
      +filter_drop_shadow(1)

  .is_white
    .MembershipLocationPlayerInfo
      +filter_drop_shadow(-1)
      @extend %is_flip
</style>
