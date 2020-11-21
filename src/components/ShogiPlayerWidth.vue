<template lang="pug">
.ShogiPlayerWidth
  ShogiPlayerCore(:base="base")
  PieceBox(:base="base")
</template>

<script>
import ShogiPlayerCore     from "./ShogiPlayerCore.vue"
import PieceBox            from "./PieceBox.vue"

import { support } from "./support.js"

export default {
  name: "ShogiPlayerWidth",
  mixins: [support],
  components: {
    ShogiPlayerCore,
    PieceBox,
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayer
  .ShogiPlayerWidth
    +mobile
      width: 100vw
</style>
