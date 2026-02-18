<template lang="pug">
b-field.VariableRadio(custom-class="is-small")
  template(v-for="e in AppContext.ModeInfo.values")
    b-radio-button(size="is-small" v-model="AppContext.sp_mode" :native-value="e.key") {{e.name}}
</template>

<script>
export default {
  name: "VariableSlider",
  inject: ["AppContext"],
}
</script>

<style lang="sass">
@import "./support.scss"
.StyleEditor
  .VariableRadio
    __css_keep__: 0
</style>
