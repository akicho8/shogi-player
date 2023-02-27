<template lang="pug">
.SpGroundInside
  PromoteSelectModal(v-if="TheSp.dialog_soldier")
  OpDisabledBlock
  EditToolBlock
  TurnShowOrEdit
  .SpTransformBlock
    SpBoardWithMembership(ref="SpBoardWithMembership")
  PieceBox
  NavigateBlock
  SfenShowBlock
  CommentBlock
</template>

<script>
import EditToolBlock      from "./EditToolBlock.vue"
import TurnShowOrEdit     from "./TurnShowOrEdit.vue"
import SpBoardWithMembership    from "./SpBoardWithMembership.vue"
import PieceBox           from "./PieceBox.vue"
import NavigateBlock      from "./NavigateBlock.vue"
import SfenShowBlock      from "./SfenShowBlock.vue"
import CommentBlock       from "./CommentBlock.vue"
import OpDisabledBlock    from "./OpDisabledBlock.vue"
import PromoteSelectModal from "./PromoteSelectModal.vue"

import { support } from "./support.js"

export default {
  name: "SpGroundInside",
  mixins: [support],
  components: {
    EditToolBlock,
    TurnShowOrEdit,
    SpBoardWithMembership,
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
.ShogiPlayer
  .SpGroundInside
    // これがないと OpDisabledBlock の 100% は画面幅になってしまう
    // また NavigateBlock や TurnShowOrEdit の border が画面全体に及んでしまう
    position: relative

  .SpGroundInside
    width: 100%

  &.is_layer_on
    .SpGroundInside
      +is_layer_border

.ShogiPlayer
  &.is_debug_on
    .SpGroundInside
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
