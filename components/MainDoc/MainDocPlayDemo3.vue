<template lang="pug">
.MainDocPlayDemo3.column
  b-message(type="is-info")
    | 駒落ちの場合は後手から始まる
  ShogiPlayer(
    :kifu_body="`position sfen 4k4/9/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1`"
    :start_turn="-1"
    :run_mode="'play_mode'"
    )
</template>

<script>
export default {
  name: "MainDocPlayDemo3",
  data() {
    return {
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocPlayDemo3
</style>
