<template lang="pug">
b-switch.BinarySwitch(v-bind="$attrs" size="is-small" v-model="AppContext[variable_key]")
  slot
</template>

<script>
export default {
  name: "SmartSlider",
  inject: ["AppContext"],
  inheritAttrs: false,
  props: {
    variable_key: { type: String, required: true },
  },
}
</script>

<style lang="sass">
@import "./support.scss"
.StyleEditorSidebar
  .BinarySwitch
    __css_keep__: 0
</style>
