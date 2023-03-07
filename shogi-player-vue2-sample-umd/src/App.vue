<template lang="pug">
ShogiPlayer(
  sp_body="position sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1 moves 7g7f 3c3d 8h2b+"
  sp_controller
  sp_slider
  )
</template>

<script>
import ShogiPlayer from "shogi-player/dist/lib/development/shogi-player.umd.js"

export default {
  components: { ShogiPlayer },
}
</script>
