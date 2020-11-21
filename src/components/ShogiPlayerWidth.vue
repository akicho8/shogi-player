<template lang="pug">
.ShogiPlayerWidth
  ShogiPlayerCore(:base="base")
  PieceBox(:base="base")
</template>

<script>
import ShogiPlayerCore     from "./ShogiPlayerCore.vue"
import PieceBox            from "./PieceBox.vue"

import { support_child } from "./support_child.js"

export default {
  name: "ShogiPlayerWidth",
  mixins: [support_child],
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
