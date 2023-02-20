<template lang="pug">
.PieceBox(v-if="TheSp.edit_p")
  .PieceBoxInside(
    :class="component_class"
    @click.stop.prevent="TheSp.piece_box_other_click"
    @click.right.prevent="TheSp.hold_cancel"
    )
    // PieceBoxPieces を is-overlay にしないとPieceBoxPiecesの背景にPieceBoxTextureの色の非透明度が影響してしまう
    .PieceBoxTexture.is-overlay
    .PieceBoxPieces.is-overlay
      .PieceWithCount(
        v-for="[piece, count] in TheSp.xcontainer.piece_box_realize()"
        @click.stop.prevent="TheSp.piece_box_piece_click(piece, $event)"
        @mouseover="TheSp.piece_box_mouseover_handle(piece, $event)"
        @mouseleave="TheSp.mouseleave_handle"
        )
        PieceTap(
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

      if (this.TheSp.lifted_p) {
        list.push("piece_lifted_hover_reaction")
      }

      if (this.TheSp.piece_box_have_p(piece)) {
        list.push("lifted_from_p")
      } else if (this.TheSp.edit_p) {
        if (!this.TheSp.lifted_p) {
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
      if (this.TheSp.lifted_p) {
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
  +defvar(sp_piece_box_color, hsla(0, 0%, 0%, 0.2)) // 駒箱背景
  +defvar(sp_common_gap, 0.18)               // 共通の隙間(駒セルの縦幅に対する割合)

  // あまり重要ではないところでの縦のマージンが必要なときに使う
  // sp_common_gap を直接使ってはいけない
  --sp_common_gap_real_px: calc(var(--sp_cell_h) * var(--sp_common_gap))

  .PieceBox
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    @extend %is_unselectable

  .PieceBoxInside
    min-height: var(--sp_cell_h) // 駒がないときに駒台が消えるのを防ぐため(▲△もないので必ず必要)
    width: var(--sp_board_w)

  .PieceBoxPieces
    display: flex
    justify-content: center
    align-items: center

    .PieceWithCount
      display: flex
      justify-content: center
      align-items: center

  //////////////////////////////////////////////////////////////////////////////// horizontal or vertical
  +IF_HORIZONTAL
    .PieceBox
      margin-top: var(--sp_common_gap_real_px)
  +IF_VERTICAL
    .PieceBox
      margin-top: 0  // 縦の場合、上は持駒が並んでいて(見た目上の)隙間があるので隙間を作らないでよい

  //////////////////////////////////////////////////////////////////////////////// 駒持ってhoverしたとき全体にborder
  .PieceBoxInside
    &.frame_boder_if_hover
      &:hover
        .PieceBoxTexture
          border: calc(var(--sp_stand_hover_border_stroke) * 1px) dashed var(--sp_stand_hover_border_color)

  ////////////////////////////////////////////////////////////////////////////////
  .PieceBoxInside
    +is_overlay_origin
    .PieceBoxTexture
      background-color: var(--sp_piece_box_color)
      border-radius: calc(var(--sp_board_radius) * 1px)

  ////////////////////////////////////////////////////////////////////////////////

  &.is_layer_on
    .PieceBox
      +is_layer_border
    .PieceBoxInside
      +is_layer_border
</style>
