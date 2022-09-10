<template lang="pug">
.MembershipLocation
  MembershipLocationMark(:location="location")
</template>

<script>
import { support } from "../support.js"
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
}
</script>

<style lang="sass">
@import "../support.sass"
.ShogiPlayerGround
  &.is_layer_on
    .MembershipLocation
      +is_layer_border
</style>
