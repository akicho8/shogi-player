<template lang="pug">
.MainDocPlayDemo3.column
  b-message(type="is-info")
    | 駒落ちの場合、最初が w - 1 なので後手から
  ShogiPlayer(
    :sp_body="`position sfen 4k4/9/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1`"
    :sp_turn="-1"
    sp_mode="play"
    sp_piece_variant="zuan"
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
@import "../support.sass"
.MainDocPlayDemo3
</style>
