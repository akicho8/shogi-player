<template lang="pug">
.MembershipLocation
  MembershipLocationMark
</template>

<script>
import { support } from "../support.js"
import MembershipLocationMark from "./MembershipLocationMark.vue"

export default {
  name: "MembershipLocation",
  mixins: [support],
  inject: ["location"],
  components: {
    MembershipLocationMark,
  },
}
</script>

<style lang="sass">
@import "../support.sass"
.ShogiPlayer
  &.is_layer_on
    .MembershipLocation
      +is_layer_border
</style>
