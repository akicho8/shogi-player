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
      border: 1px dashed change_color($primary, $alpha: 0.5)
</style>
