<template lang="pug">
.ShogiPlayerWidth
  OverlayDisableBlock(:base="base")
  EditToolBlock(:base="base")
  TurnShowOrEdit(:base="base")
  .ShogiPlayerTransformBlock
    ShogiPlayerBody(:base="base" ref="ShogiPlayerBody")
  PieceBox(:base="base")
  NavigateBlock(:base="base")
  SfenShowBlock(:base="base")
  CommentBlock(:base="base")
</template>

<script>
import EditToolBlock     from "./EditToolBlock.vue"
import TurnShowOrEdit  from "./TurnShowOrEdit.vue"
import ShogiPlayerBody from "./ShogiPlayerBody.vue"
import PieceBox        from "./PieceBox.vue"
import NavigateBlock from "./NavigateBlock.vue"
import SfenShowBlock   from "./SfenShowBlock.vue"
import CommentBlock    from "./CommentBlock.vue"
import OverlayDisableBlock from "./OverlayDisableBlock.vue"

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
    OverlayDisableBlock,
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayerGround
  +defvar(sp_body_width, 100%)      // 盤(駒台を含む)の幅         FIXME: とる
  +defvar(sp_body_max_width, none)  // 盤(駒台を含む)の最大幅     FIXME: とる

  .ShogiPlayerWidth
    // これがないと OverlayDisableBlock の 100% は画面幅になってしまう
    // また NavigateBlock や TurnShowOrEdit の border が画面全体に及んでしまう
    position: relative

  .ShogiPlayerWidth
    width: var(--sp_body_width)
    max-width: var(--sp_body_max_width)

  +mobile
    &.is_mobile_fit_on
      .ShogiPlayerWidth
        width: 100%
        max-width: none

  &.is_layer_on
    .ShogiPlayerWidth
      +is_layer_border

.ShogiPlayer
  &.is_debug_on
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
