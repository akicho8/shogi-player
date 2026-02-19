<template lang="pug">
b-field.VariableRadio(
  v-bind="$attrs"
  custom-class="is-small"
  )
  template(#message)
    slot(name="message")
  template(#label)
    slot(name="label")
  template(v-for="e in variable_model.values")
    b-radio-button(size="is-small" v-model="AppContext[variable_info.key]" :native-value="e.key" :disabled="disabled")
      | {{name_of(e)}}
</template>

<script>
export default {
  name: "VariableSlider",
  inject: ["AppContext"],
  inheritAttrs: false,
  props: {
    variable_key: { type: String, required: true },
    disabled: { type: Boolean, default: false },
  },
  methods: {
    name_of(e) {
      return e.radio_button_name ?? e.name
    },
  },
  computed: {
    variable_info()  { return this.AppContext.VariableInfo.fetch(this.variable_key) },
    variable_model() { return this.AppContext[this.variable_info.relative_model] },
  },
}
</script>

<style lang="sass">
@import "./support.scss"
.StyleEditor
  .VariableRadio
    __css_keep__: 0
</style>
