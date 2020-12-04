<template lang="pug">
.ColorPicker
  ChromePicker(:value="new_value" @input="c => new_value = c.hex8" :disableFields="true" :disableAlpha="disableAlpha")
</template>

<script>
import { support } from "./support.js"
import { Slider, Chrome } from "vue-color"

export default {
  name: "ColorPicker",
  mixins: [support],
  components: {
    "ChromePicker": Chrome,
  },
  props: {
    value: { required: true },
    disableAlpha: { type: Boolean, default: false },
  },
  data() {
    return {
      new_value: this.value,
    }
  },
  watch: {
    value(v) {
      this.new_value = v
    },
    new_value(v) {
      this.$emit("input", v)
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ColorPicker
  .vc-slider, .vc-chrome
    width: unset
    box-shadow: 0 0 12px change_color($black, $alpha: 0.2)
</style>
