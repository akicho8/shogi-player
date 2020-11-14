<template lang="pug">
.MembershipLocationMark(v-text="location.name")
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
.shogi-player
  &.vertical
    .MembershipLocationMark
      color: $sp_simple_grid_color

    //////////////////////////////////////////////////////////////////////////////// 手番のとき
    .turn_active
      .MembershipLocationMark
        color: $sp_simple_turn_active_color
        -webkit-text-stroke: 1px $sp_simple_turn_active_color
        text-shadow: 0 0 0.5rem $sp_simple_turn_active_color
</style>
