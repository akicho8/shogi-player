<template lang="pug">
b-field.SmartColor(
  v-bind="$attrs"
  custom-class="is-small"
  )
  template(#message)
    slot(name="message")
  template(#label)
    slot(name="label")
  PureColorPicker(
    v-model="AppContext[variable_info.key]"
    :disabled="!enabled"
  )
</template>

<script>
import { GX } from "../models/gx.js"
import PureColorPicker from "./PureColorPicker.vue"

export default {
  name: "SmartColor",
  components: {
    PureColorPicker,
  },
  inject: ["AppContext"],
  inheritAttrs: false,
  props: {
    variable_key: { type: String, required: true },
  },
  computed: {
    variable_info() { return this.AppContext.VariableInfo.fetch(this.variable_key) },
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
  .SmartColor
    __css_keep__: 0
</style>
