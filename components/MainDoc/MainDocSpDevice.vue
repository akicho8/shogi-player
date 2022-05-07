<template lang="pug">
.MainDocSpDevice
  MainDocMainNavbar
    template(slot="brand")
      MainDocNavbarItemHome
      b-navbar-item(tag="div").has-text-weight-bold sp_device 動作テスト
  .section
    .container
      .columns
        .column
          p sp_device="is_device_desktop"
          ShogiPlayer(sp_debug_mode="is_debug_mode_on" sp_run_mode="play_mode" sp_device="is_device_desktop")
        .column
          p sp_device="is_device_touch"
          ShogiPlayer(sp_debug_mode="is_debug_mode_on" sp_run_mode="play_mode" sp_device="is_device_touch")
</template>

<script>
export default {
  name: "MainDocSpDevice",
  data() {
    return {
    }
  },
}
</script>

<style lang="sass">
// @import "./support.sass"
// .MainDocSpDevice
</style>
