<template lang="pug">
b-navbar.MainDocMainNavbar(v-bind="navbar_attrs" v-on="$listeners")
  template(slot="brand")
    slot(name="brand")
  template(slot="start")
    slot(name="start")
  template(slot="end")
    slot(name="end")
</template>

<script>
export default {
  name: "MainDocMainNavbar",
  computed: {
    navbar_attrs() {
      return {
        // https://buefy.org/documentation/navbar
        centered: true,
        type: "is-dark",
        "mobile-burger": true,
        // "wrapper-class": "container",
        // spaced: true,
        ...this.$attrs,
      }
    },
  },
}
</script>

<style lang="sass">
.navbar.MainDocMainNavbar
  +touch
    // touch以下で is-spaced の左右の padding が外れ navbar-item が画面端にくっついてしまうため少し隙間を入れる
    padding-left: 24px
    padding-right: 24px
  +mobile
    // さらにモバイル時はさらに上下の隙間がもったいないので is-spaced の上下を無効にする
    padding-top: 0
    padding-bottom: 0
    // モバイルだと左右隙間が開きすぎているように見えるのでもっと端に寄せる
    // 微調整ではなく0にしたい
    padding-left: 12px
    padding-right: 12px

.STAGE-development
  .navbar.MainDocMainNavbar
    border: 1px dashed $primary
    .navbar-item
      border: 1px dashed $danger
</style>
