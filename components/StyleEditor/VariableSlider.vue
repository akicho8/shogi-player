<template lang="pug">
b-slider.VariableSlider(
  v-model="AppContext[variable_key]"
  v-bind="attributes"
  v-on="$listeners"
  )
</template>

<script>
export default {
  name: "VariableSlider",
  inject: ["AppContext"],
  inheritAttrs: false,
  props: {
    variable_key: { type: String, required: true },
  },
  computed: {
    variable_info() { return this.AppContext.VariableInfo.fetch(this.variable_key) },
    attributes() {
      return {
        ...this.AppContext.slider_attrs,
        min: this.variable_info.min,
        max: this.variable_info.max,
        step: this.variable_info.step,
        disabled: !this.enabled,
        ...this.$attrs,
      }
    },
    enabled() {
      const key = this.variable_info.ui_enable_if
      if (key != null) {
        return this.AppContext[key]
      }
      return true
    },
  },
}
</script>

<style lang="sass">
@import "./support.scss"
.StyleEditor
  .VariableSlider
    __css_keep__: 0
</style>
