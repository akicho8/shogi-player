<template lang="pug">
.MainDocPlayDemo5.column
  b-message(type="is-info")
    | SFENで72となっていても71手目の局面を表示している(後手番)
  ShogiPlayer(
    :kifu_body="'position sfen lr4knl/3g2gs1/4ppP2/p4bNpp/2pSsN3/PPPP1P2P/2N1P1G2/2G6/L1K4RL w BPs3p 72'"
    :start_turn="-1"
    :run_mode="'play_mode'"
  )
</template>

<script>
export default {
  name: "MainDocPlayDemo5",
  data() {
    return {
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocPlayDemo5
</style>
