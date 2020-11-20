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
        "padding-top": `${this.aspect_ratio}%`,
      }
    },
    aspect_ratio() {
      return this.rheight * 100 / this.rwidth
    },
  },
}
</script>

<style lang="sass">
@import "~bulma/sass/utilities/_all"

.AspectRatioFixedBlock
  position: relative
  width: 100%
  .AspectRatioFixedBlockContainer
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
</style>
