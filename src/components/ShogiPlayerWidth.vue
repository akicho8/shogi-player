<template lang="pug">
.ShogiPlayerWidth
  EditToolBox(:base="base")
  TurnShowOrEdit(:base="base")
  ShogiPlayerCore(:base="base")
  PieceBox(:base="base")
  ControllerBlock(:base="base")
  SfenShowBlock(:base="base")
  CommentBlock(:base="base")
</template>

<script>
import EditToolBox     from "./EditToolBox.vue"
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
    EditToolBox,
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
.ShogiPlayerGround
  --sp_body_width: 100%

  .ShogiPlayerWidth
    width: var(--sp_body_width)

  +mobile
    &.is_mobile_style
      .ShogiPlayerWidth
        width: 100%

.ShogiPlayer
  &.debug_mode_p
    .ShogiPlayerWidth
      &:after
        +mobile
          content: "(mobile)"
        +tablet
          content: "(tablet)"
        +desktop
          content: "(desktop)"
        +widescreen
          content: "(widescreen)"
        +fullhd
          content: "(fullhd)"
</style>
