<template lang="pug">
.MainDocProps
  MainDocMainNavbar
    template(slot="brand")
      MainDocNavbarItemHome
      b-navbar-item(tag="div").has-text-weight-bold コンポーネント引数一覧
  .section
    .container
      MainDocMd(:body="props")
</template>

<script>
import props from "./props.md"

export default {
  name: "MainDocProps",
  data() {
    return {
      props,
    }
  },
}
</script>

<style lang="sass">
// @import "./support.sass"
// .MainDocProps
</style>
