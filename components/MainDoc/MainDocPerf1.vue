<template lang="pug">
.MainDocPerf1
  MainDocMainNavbar
    template(slot="brand")
      MainDocNavbarItemHome
      b-navbar-item(tag="div").has-text-weight-bold 高速化
  .section
    .container
      ShogiPlayer(
        sp_run_mode="play_mode"
        sp_debug="is_debug_on"
        :sp_sound_enabled="true"
        :sp_sound_body_changed="true"
      )
</template>

<script>
export default {
  name: "MainDocPerf1",
  data() {
    return {
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocPerf1
  .ShogiPlayer
    width: 25%
</style>
