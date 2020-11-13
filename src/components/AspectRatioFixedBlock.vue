<template lang="pug">
.AspectRatioFixedBlock(:style="style")
  .AspectRatioFixedBlockContainer
    slot
</template>

<script>
export default {
  name: "AspectRatioFixedBlock",
  props: {
    rwidth:  { type: Number, required: false, default: 4, },
    rheight: { type: Number, required: false, default: 3, },
  },
  computed: {
    style() {
      return {
        "padding-top": `${this.aspect_ratio * 100}%`,
      }
    },
    aspect_ratio() {
      return this.rheight / this.rwidth
    },
  },
}
</script>

<style lang="sass">
@import "~bulma/sass/utilities/_all"

.AspectRatioFixedBlock
  position: relative
  width: 100%
  // &.is_ratio_4_3
  //   padding-top: 75%
  // &.is_ratio_16_9
  //   padding-top: 56.25%
  // &.is_ratio_3_2
  //   padding-top: 66.6666%
  // &.is_ratio_1_1
  //   padding-top: 100%
  .AspectRatioFixedBlockContainer
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    // border: 2px dashed change_color($danger, $alpha: 0.5)
</style>
