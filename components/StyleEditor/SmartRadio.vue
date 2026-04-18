<template lang="pug">
b-field.SmartRadio(
  v-bind="$attrs"
  custom-class="is-small"
  )
  template(#message)
    slot(name="message")
  template(#label)
    slot(name="label")
  template(v-for="e in variable_model.values")
    b-radio-button(
      size="is-small"
      v-model="AppContext[variable_info.key]"
      :native-value="e.native_value ?? e.key"
      :disabled="!enabled"
      )
      | {{name_of(e)}}
</template>

<script>
import { GX } from "../models/gx.js"

export default {
  name: "SmartSlider",
  inject: ["AppContext"],
  inheritAttrs: false,
  props: {
    variable_key: { type: String, required: true },
  },
  beforeMount() {
    GX.assert(this.variable_model, `${this.variable_info.relative_model} に対応するモデルが見つからない`)
  },
  mounted() {
    console.log(this.variable_key)
    console.log(this.variable_info.key)
    console.log(this.AppContext[this.variable_info.key])
  },

  methods: {
    name_of(e) {
      return e.radio_button_name ?? e.name
    },
    input_handle(value) {
      console.log(value)
    },
  },
  computed: {
    variable_info()  { return this.AppContext.VariableInfo.fetch(this.variable_key) },
    variable_model() { return this.AppContext[this.variable_info.relative_model] },
    enabled() {
      if (this.variable_info.parent_info) {
        return this.AppContext[this.variable_info.parent_info.key]
      }
      return true
    },
    foo: {
      get() { return this.AppContext[this.variable_info.key] },
      set(value) { this.AppContext[this.variable_info.key] = value },
    },
  },
}
</script>

<style lang="sass">
@import "./support.scss"
.StyleEditorSidebar
  .SmartRadio
    &.wrap_layout
      /* field内の要素を折り返し許可にする */
      .has-addons
        flex-wrap: wrap
        gap: 0.5rem
</style>
