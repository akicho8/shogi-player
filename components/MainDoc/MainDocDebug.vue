<template lang="pug">
.MainDocDebug
  MainDocMainNavbar
    template(slot="brand")
      MainDocNavbarItemHome
      b-navbar-item(tag="div").has-text-weight-bold デバッグ
  .section
    .container
      .columns
        .column
          p sp_device="is_device_desktop"
          ShogiPlayer(sp_debug="is_debug_on" sp_run_mode="play_mode" sp_device="is_device_desktop")
        .column
          p sp_device="is_device_touch"
          ShogiPlayer(sp_debug="is_debug_on" sp_run_mode="play_mode" sp_device="is_device_touch")
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
