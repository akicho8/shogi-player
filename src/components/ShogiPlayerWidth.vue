<template lang="pug">
.ShogiPlayerWidth
  TurnShowOrEdit(:base="base")
  ShogiPlayerCore(:base="base")
  PieceBox(:base="base")
</template>

<script>
import TurnShowOrEdit  from "./TurnShowOrEdit.vue"
import ShogiPlayerCore from "./ShogiPlayerCore.vue"
import PieceBox        from "./PieceBox.vue"

import { support } from "./support.js"

export default {
  name: "ShogiPlayerWidth",
  mixins: [support],
  components: {
    TurnShowOrEdit,
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
