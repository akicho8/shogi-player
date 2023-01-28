<template lang="pug">
.MainDocStyleEditor
  StyleEditor
  b-button.close_button(icon-left="chevron-left" @click="back_handle" type="is-text")
</template>

<script>
export default {
  name: "MainDocStyleEditor",
  methods: {
    back_handle() {
      this.$router.push({name: "index"})
    },
  },
}
</script>

<style lang="sass">
.MainDocStyleEditor
  .close_button
    position: absolute
    top: 0
    left: 0
</style>
