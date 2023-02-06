<template lang="pug">
.ShogiPlayerWidth
  PromoteSelectModal(v-if="TheSp.dialog_soldier")
  OpDisabledBlock
  EditToolBlock
  TurnShowOrEdit
  .ShogiPlayerTransformBlock
    ShogiPlayerBody(ref="ShogiPlayerBody")
  PieceBox
  NavigateBlock
  SfenShowBlock
  CommentBlock
</template>

<script>
import EditToolBlock      from "./EditToolBlock.vue"
import TurnShowOrEdit     from "./TurnShowOrEdit.vue"
import ShogiPlayerBody    from "./ShogiPlayerBody.vue"
import PieceBox           from "./PieceBox.vue"
import NavigateBlock      from "./NavigateBlock.vue"
import SfenShowBlock      from "./SfenShowBlock.vue"
import CommentBlock       from "./CommentBlock.vue"
import OpDisabledBlock    from "./OpDisabledBlock.vue"
import PromoteSelectModal from "./PromoteSelectModal.vue"

import { support } from "./support.js"

export default {
  name: "ShogiPlayerWidth",
  mixins: [support],
  components: {
    EditToolBlock,
    TurnShowOrEdit,
    ShogiPlayerBody,
    PieceBox,
    NavigateBlock,
    SfenShowBlock,
    CommentBlock,
    OpDisabledBlock,
    PromoteSelectModal,
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayerGround
  .ShogiPlayerWidth
    // これがないと OpDisabledBlock の 100% は画面幅になってしまう
    // また NavigateBlock や TurnShowOrEdit の border が画面全体に及んでしまう
    position: relative

  .ShogiPlayerWidth
    width: 100%

  &.is_layer_on
    .ShogiPlayerWidth
      +is_layer_border

.ShogiPlayer
  &.is_debug_mode_on
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
