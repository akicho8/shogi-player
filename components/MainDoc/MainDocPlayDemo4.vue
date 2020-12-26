<template lang="pug">
.MainDocPlayDemo4.column
  b-message(type="is-info")
    | 2手目の盤面から開始する場合も後手から始まる
  ShogiPlayer(
    :sp_body="`position sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/2P6/PP1PPPPPP/1B5R1/LNSGKGSNL w - 2`"
    :sp_turn="-1"
    sp_run_mode="play_mode"
    )
</template>

<script>
export default {
  name: "MainDocPlayDemo4",
  data() {
    return {
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocPlayDemo4
</style>
