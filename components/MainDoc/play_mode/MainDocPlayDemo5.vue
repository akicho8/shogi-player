<template lang="pug">
.MainDocPlayDemo5.column
  b-message(type="is-info")
    | 同様に w - 4 も後手番
  ShogiPlayer(
    sp_body="position sfen lnsgkgsnl/1r5b1/pppppp1pp/6p2/9/2P4P1/PP1PPPP1P/1B5R1/LNSGKGSNL w - 4"
    sp_mode="play"
    sp_piece_variant="d"
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
@import "../support.sass"
.MainDocPlayDemo5
</style>
