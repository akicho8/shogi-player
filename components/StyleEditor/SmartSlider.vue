<template lang="pug">
b-field.SmartSlider(
  v-bind="$attrs"
  custom-class="is-small"
  )
  template(#message)
    slot(name="message")
  template(#label)
    slot(name="label")
  b-slider(
    v-model="AppContext[variable_key]"
    v-bind="attributes"
    v-on="$listeners"
    )
</template>

<script>
export default {
  name: "SmartSlider",
  inject: ["AppContext"],
  inheritAttrs: false,
  props: {
    variable_key: { type: String, required: true },
  },
  computed: {
    variable_info() { return this.AppContext.VariableInfo.fetch(this.variable_key) },
    attributes() {
      // https://buefy.org/documentation/slider
      return {
        ...this.AppContext.slider_options,
        ...this.variable_info.slider_options,
        disabled: !this.enabled,
        ...this.$attrs,
      }
    },
    enabled() {
      if (this.variable_info.parent_info) {
        return this.AppContext[this.variable_info.parent_info.key]
      }
      return true
    },
  },
}
</script>

<style lang="sass">
@import "./support.scss"
.StyleEditorSidebar
  .b-slider
    margin: 0 // .help が下すぎるのを防ぐためいったん 0 にする

    .help
      margin-top: 0.5rem        // マージンは下の要素で決める

    .b-slider-thumb-wrapper.has-indicator
      .b-slider-thumb
        padding: 8px 4px
        font-size: 10px
</style>
