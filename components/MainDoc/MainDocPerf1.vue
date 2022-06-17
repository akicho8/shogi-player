<template lang="pug">
.MainDocPerf1
  MainDocMainNavbar
    template(slot="brand")
      MainDocNavbarItemHome
      b-navbar-item(tag="div").has-text-weight-bold 高速化
  .section
    .container
      //- position sfen lnsgkgsnl/7b1/pppp1pppp/9/9/9/PPPPrPPPP/1B5R1/LNSGKGSNL b Pp 1
      //- position sfen k8/9/9/9/9/9/8l/9/r6NK b r2b4g4s3n3l18p 1
      ShogiPlayer(
        sp_body="position sfen lnsgkgsnl/7b1/pppp1pppp/9/9/9/PPPPrPPPP/1B5R1/LNSGKGSNL b Pp 1"
        sp_run_mode="play_mode"
        sp_debug_mode="is_debug_mode_on"
        :sp_sound_enabled="true"
        :sp_sound_body_changed="true"
        sp_controller="is_controller_on"
        sp_slider="is_slider_on"
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
    width: 50%
</style>
