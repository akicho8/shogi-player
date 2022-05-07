<template lang="pug">
b-field(custom-class="is-small" v-bind="$attrs")
  b-radio-button(size="is-small" v-model="new_value" :native-value="false") OFF
  b-radio-button(size="is-small" v-model="new_value" :native-value="true")  ON
</template>

<script>
export default {
  name: "MainDocSwitch",
  props: {
    value: {},
  },
  data() {
    return {
      new_value: this.value,
    }
  },
  watch: {
    new_value(v) { this.$emit("input", v) }
  },
}
</script>

<style lang="sass">
// @import "./support.sass"
// .MainDocSwitch
</style>
