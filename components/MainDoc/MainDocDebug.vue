<template lang="pug">
.MainDocDebug
  MainDocMainNavbar
    template(slot="brand")
      MainDocNavbarItemHome
      b-navbar-item(tag="div").has-text-weight-bold sp_device 動作テスト
  .section
    .container
      .columns
        .column
          p sp_device="desktop"
          ShogiPlayer(sp_debug sp_mode="play" sp_device="desktop")
        .column
          p sp_device="touch"
          ShogiPlayer(sp_debug sp_mode="play" sp_device="touch")
</template>

<script>
export default {
  name: "MainDocDebug",
  data() {
    return {
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocDebug
</style>
