<template lang="pug">
.MainDocCssVariables
  MainDocMainNavbar
    template(slot="brand")
      MainDocNavbarItemHome
      b-navbar-item(tag="div").has-text-weight-bold CSS変数一覧
  .section
    .container
      MainDocMd(:body="css_variable")
</template>

<script>
import css_variable from "./css_variable.md"

export default {
  name: "MainDocCssVariables",
  data() {
    return {
      css_variable,
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocCssVariables
</style>
