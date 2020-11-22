<template lang="pug">
.ShogiPlayerWidth
  TurnShowOrEdit(:base="base")
  ShogiPlayerCore(:base="base")
  PieceBox(:base="base")
  ControllerBlock(:base="base")
  SfenShowBlock(:base="base")
  CommentBlock(:base="base")
</template>

<script>
import TurnShowOrEdit  from "./TurnShowOrEdit.vue"
import ShogiPlayerCore from "./ShogiPlayerCore.vue"
import PieceBox        from "./PieceBox.vue"
import ControllerBlock from "./ControllerBlock.vue"
import SfenShowBlock   from "./SfenShowBlock.vue"
import CommentBlock    from "./CommentBlock.vue"

import { support } from "./support.js"

export default {
  name: "ShogiPlayerWidth",
  mixins: [support],
  components: {
    TurnShowOrEdit,
    ShogiPlayerCore,
    PieceBox,
    ControllerBlock,
    SfenShowBlock,
    CommentBlock,
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
