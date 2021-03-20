<template lang="pug">
.MainDocDebug
  MainDocMainNavbar
    template(slot="brand")
      MainDocNavbarItemHome
      b-navbar-item(tag="div").has-text-weight-bold デバッグ
  .section
    .container
      ShogiPlayer(sp_debug="is_debug_on" sp_run_mode="play_mode")
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
  .ShogiPlayer
    width: 25%
</style>
