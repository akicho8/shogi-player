<template lang="pug">
.test-test_sp_lift_cancel_action_reality
  MainDocMainNavbar
    template(slot="brand")
      MainDocNavbarItemHome
      b-navbar-item(tag="div").has-text-weight-bold 持駒を離す挙動
  .section
    .container.is-fluid
      .columns
        .column.is-8
          ShogiPlayer(
            sp_mode="play"
            sp_body="position sfen l+n1g1g1n+l/1ks2r1+r1/1pppp1bpp/p2+b+sp+p2/9/P1P1+SP1PP/1+P+BPP1P2/1BK1GR1+R1/+L+NSG3NL b R2B3G4S5N11L99Pr2b3g4s5n11l99p 1"
            sp_lift_cancel_action="reality"
            )
</template>

<script>
import assert from "minimalistic-assert"

export default {
}
</script>

<style lang="sass">
.test-test_sp_lift_cancel_action_reality
  __css_keep__: 0
</style>
