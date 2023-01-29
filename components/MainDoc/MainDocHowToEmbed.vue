<template lang="pug">
.MainDocHowToEmbed
  MainDocMainNavbar
    template(slot="brand")
      MainDocNavbarItemHome
      b-navbar-item(tag="div").has-text-weight-bold 組み込み方法
  .section
    a(name="usage")
    .container
      MainDocMd(:body="usage_md")
</template>

<script>
import usage_md from "./MainDocHowToEmbed.md"

export default {
  name: "MainDocHowToEmbed",
  data() {
    return {
      usage_md,
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocHowToEmbed
</style>
