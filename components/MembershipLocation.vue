<template lang="pug">
.MembershipLocation
  MembershipLocationMark(:base="base" :location="location")
</template>

<script>
import { support } from "./support.js"
import MembershipLocationMark from "./MembershipLocationMark.vue"

export default {
  name: "MembershipLocation",
  mixins: [support],
  props: {
    location: { required: true },
    position: { required: true },
  },
  components: {
    MembershipLocationMark,
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayerGround
  &.is_layer_on
    .MembershipLocation
      +is_layer_border
</style>
