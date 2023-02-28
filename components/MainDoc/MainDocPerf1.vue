<template lang="pug">
.MainDocPerf1
  MainDocMainNavbar
    template(slot="brand")
      MainDocNavbarItemHome
      b-navbar-item(tag="div").has-text-weight-bold 高速化
  .section
    .container
      //- sp_body="position sfen lnsgkgsnl/7b1/pppp1pppp/9/9/9/PPPPrPPPP/1B5R1/LNSGKGSNL b Pp 1"
      //- sp_body="position sfen k8/9/9/9/9/9/8l/9/r6NK b r2b4g4s3n3l18p 1"
      //- sp_body="position sfen l+n1g1g1n+l/1ks2r1+r1/1pppp1bpp/p2+b+sp+p2/9/P1P1+SP1PP/1+P+BPP1P2/1BK1GR1+R1/+L+NSG3NL b R2B3G4S5N11L99Pr2b3g4s5n11l99p 1"
      //- sp_body="position sfen k8/9/9/9/9/9/8l/9/r6NK b 2Nr2b4g4s3n3l18p 1"
      ShogiPlayer(
        sp_body="position sfen l+n1g1g1n+l/1ks2r1+r1/1pppp1bpp/p2+b+sp+p2/9/P1P1+SP1PP/1+P+BPP1P2/1BK1GR1+R1/+L+NSG3NL b R2B3G4S5N11L99Pr2b3g4s5n11l99p 1"
        sp_mode="play"
        sp_debug
        sp_event_log
        sp_controller
        sp_dev_tools
        sp_slider
        sp_board_variant="bright"
        sp_piece_variant="portella"
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
    --sp_board_piece_size: 1.0
</style>
