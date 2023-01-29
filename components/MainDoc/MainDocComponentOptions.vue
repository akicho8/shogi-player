<template lang="pug">
.MainDocComponentOptions
  MainDocMainNavbar
    template(slot="brand")
      MainDocNavbarItemHome
      b-navbar-item(tag="div").has-text-weight-bold コンポーネント引数一覧
  .section
    .container
      MainDocMd(:body="component_options")
</template>

<script>
import component_options from "./component_options.md"

export default {
  name: "MainDocComponentOptions",
  data() {
    return {
      component_options,
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocComponentOptions
</style>
