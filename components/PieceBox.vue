<template lang="pug">
.PieceBox(
  v-if="base.edit_p"
  :class="component_class"
  @click.stop.prevent="base.piece_box_other_click"
  @click.right.prevent="base.hold_cancel"
  )
  // PieceBoxPieces を is-overlay にしないとPieceBoxPiecesの背景にPieceBoxTextureの色の非透明度が影響してしまう
  .PieceBoxTexture.is-overlay
  .PieceBoxPieces.is-overlay
    .PieceWithCount(
      v-for="[piece, count] in base.mediator.piece_box_realize()"
      @click.stop.prevent="base.piece_box_piece_click(piece, $event)"
      @mouseover="base.piece_box_mouseover_handle(piece, $event)"
      @mouseleave="base.mouseleave_handle"
      )
      PieceTap(
        :base="base"
        :class="piece_box_piece_tap_class(piece)"
        :piece_texture_class="piece_box_piece_texture_class(piece)"
        :count="count"
        )
</template>

<script>
import { support } from "./support.js"
import PieceTap from "./PieceTap.vue"

export default {
  mixins: [support],
  components: {
    PieceTap,
  },
  methods: {
    // 駒箱の駒
    piece_box_piece_tap_class(piece) {
      let list = []

      if (this.base.lifted_p) {
        list.push("piece_lifted_hover_reaction")
      }

      if (this.base.piece_box_have_p(piece)) {
        list.push("lifted_from_p")
      } else if (this.base.edit_p) {
        if (!this.base.lifted_p) {
          list.push("selectable_p")
        }
      }

      // list = _.concat(list, piece.css_class_list)
      // list.push("location_black")
      // list.push("promoted_false")

      list.push("is_position_south") // 常に上向きにする

      return list
    },

    // 駒箱の駒のテクスチャ
    piece_box_piece_texture_class(piece) {
      let list = []
      list = _.concat(list, piece.css_class_list)
      list.push("location_black")
      list.push("promoted_false")
      return list
    },
  },

  computed: {
    component_class() {
      const list = []
      if (this.base.lifted_p) {
        list.push("frame_boder_if_hover")
      }
      return list
    },
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayerGround
  +defvar(sp_piece_box_color, rgba(0, 0, 0, 0.2)) // 駒箱背景
  +defvar(sp_common_gap, 12px)          // 共通の隙間

  .PieceBox
    @extend %is_unselectable
    min-height: var(--sp_piece_box_piece_h) // 駒がないときに駒台が消えるのを防ぐため(▲△もないので必ず必要)

  .PieceBoxPieces
    display: flex
    justify-content: center
    align-items: center

    .PieceWithCount
      display: flex
      justify-content: center
      align-items: center

  //////////////////////////////////////////////////////////////////////////////// is_horizontal or is_vertical
  +IS_HORIZONTAL
    .PieceBox
      margin-top: var(--sp_common_gap)
  +IS_VERTICAL
    .PieceBox
      margin-top: 0

  //////////////////////////////////////////////////////////////////////////////// 駒持ってhoverしたとき全体にborder
  .PieceBox
    &.frame_boder_if_hover
      &:hover
        .PieceBoxTexture
          border: var(--sp_stand_hover_border_stroke) dashed var(--sp_stand_hover_border_color)

  ////////////////////////////////////////////////////////////////////////////////
  .PieceBox
    +is_overlay_origin
  .PieceBoxTexture
    background-color: var(--sp_piece_box_color)
    border-radius: calc(var(--sp_board_radius) * 1px)
  &.is_board_shadow_box
    .PieceBoxTexture
      +filter_box_shadow(1)
  &.is_board_shadow_drop
    .PieceBoxTexture
      +filter_drop_shadow(1)
  &.is_board_shadow_none
    .PieceBoxTexture
</style>
