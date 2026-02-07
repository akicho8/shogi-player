<template lang="pug">
.MembershipStand(:class="component_class" @pointerdown.right.stop.prevent="TheSp.hold_cancel" v-if="hold_pieces.length > 0")
  .MembershipStandTexture.is-overlay
  .MembershipStandPieces
    .PieceWithCount.is-flex(
      v-for="[piece, count] in hold_pieces"
      @pointerdown="TheSp.piece_stand_piece_click_with_mark_event(ms.location, piece, false, $event)"
      @mouseover="TheSp.piece_stand_mouseover_handle(ms.location, piece, $event)"
      @mouseleave="TheSp.mouseleave_handle"
      )
      //- @[TheSp.click_response_timing_info.method]="TheSp.piece_stand_piece_click_with_mark_event(ms.location, piece, false, $event)"
      PieceTap(
        :class="piece_tap_class(piece)"
        :piece_texture_class="piece_texture_class(piece)"
        :count="count"
        :mark_pos_key="ms.location.to_mark_pos_key(piece)"
        )
</template>

<script>
import _ from "lodash"
import PieceTap from "../PieceTap.vue"
import { support } from "../support.js"

export default {
  name: "MembershipStand",
  mixins: [support],
  inject: ["ms"],

  components: {
    PieceTap,
  },

  methods: {
    hold_piece_lifted_p(piece) {
      return this.TheSp.have_piece_location === this.ms.location && this.TheSp.have_piece === piece
    },

    piece_tap_class(piece) {
      if (this.break_if_view_mode) {
        return []
      }

      let list = []

      // if (this.lifted_p) {
      //   list.push("piece_lifted_hover_reaction")
      // }

      if (this.hold_piece_lifted_p(piece)) {
        list.push("lifted_from_p")
      } else {
        if (!this.lifted_p) {
          let f = false
          if (this.TheSp.edit_p) {
            f = true
          }
          if (this.TheSp.play_p) {
            if (!this.TheSp.cpu_location_p && this.TheSp.xcontainer.current_location === this.ms.location) {
              f = true
            }
          }
          if (this.TheSp.play_p && !this.TheSp.sp_my_piece_only_move) {
            f = true
          }

          // 再生モードの場合
          if (this.TheSp.view_p) {
            // 再生モードでもデフォルトの sp_view_mode_piece_movable=true なら駒は動かせるので手番の側であれば動かせるとする
            if (this.TheSp.xcontainer.current_location === this.ms.location) {
              f = true
            }
            // しかし sp_overlay_nav の場合は盤面で操作できないので駒台の方も無効にする
            if (this.TheSp.sp_overlay_nav) {
              f = false
            }
          }

          if (f) {
            list.push("selectable_p") // マウスホバーでセルに色をつける
          }
        }
      }

      // list = _.concat(list, piece.css_class_list)
      // list.push(`location_${this.ms.location.key}`)
      // list.push("promoted_false")

      return list
    },

    piece_texture_class(piece) {
      let list = []
      list = _.concat(list, piece.css_class_list)
      list.push(`location_${this.ms.location.key}`)
      list.push("promoted_false")
      return list
    },
  },

  computed: {
    lifted_p() {
      return this.TheSp.lifted_p
    },

    component_class() {
      const list = []
      if (this.TheSp.edit_p) {
        if (this.lifted_p) {
          list.push("is_droppable")
        }
      }
      return list
    },

    hold_pieces() {
      return this.TheSp.xcontainer.realized_hold_pieces_of(this.ms.location)
    },
  },
}
</script>

<style lang="sass">
@import "../support.sass"
.ShogiPlayer
  +defvar(sp_stand_hover_border_color, hsla(0, 0%, 0%, 0.2)) // 駒を持って駒箱の上にいるときのボーダー色
  +defvar(sp_stand_hover_border_stroke, 2)                   // 駒を持って駒箱の上にいるときのボーダーの太さ
  +defvar(sp_stand_bg_color, hsla(0, 0%, 0%, 0))             // 駒台の背景色

  .MembershipStand
    // width: 100%
    // height: 100%

  .MembershipStandPieces
    display: flex
    justify-content: center // 駒台が広がったときに中央に寄るのを防ぎたいときは flex-start にする
    align-items: center

    // 最低限の大きさを確保するには？
    //
    //   min-width:  var(--sp_cell_w)
    //   min-height: var(--sp_cell_h)
    //
    // もし駒台を最初から見せる場合は？
    //
    //   width: 100%
    //   justify-content: flex-start
    //

    // height: 100%       // 親である MembershipStand の高さに合わせる
    // // height: 200px       // 親である MembershipStand の高さに合わせる
    // overflow: hidden   // はみ出さないようにガード

    .PieceWithCount
      // //   // 縦並びの時の子要素（アイテム）としての設定
      // // flex-shrink: 1
      // // min-height: 0    // 高さを縮小可能にするために必須
      // //   // display: flex
      // //   // flex-direction: column
      // flex: 0 1 auto    // grow: 0, shrink: 1, basis: auto
      // min-height: 0     // 必須。これが「縮んでいいよ」の最終的な許可証
      // // display: flex
      // // flex-direction: column

      // grow: 0, shrink: 1, basis: auto
      // これを PieceTap ではなく、ループの最外殻であるここに入れるのが最重要です
      // flex: 0 1 auto
      // min-height: 0
      //
      // // 中の PieceTap を正しく表示させるための flex 設定
      // display: flex
      // flex-direction: column
      // align-items: center

  .MembershipStand
    +is_overlay_origin
  .MembershipStandTexture
    background-color: var(--sp_stand_bg_color)
    border-radius: calc(var(--sp_board_radius) * 1px)

  //////////////////////////////////////////////////////////////////////////////// 駒を持って駒箱の上にいるとき
  .MembershipStand
    &.is_droppable
      &:hover
        .MembershipStandTexture
          border: calc(var(--sp_stand_hover_border_stroke) * 1px) dashed var(--sp_stand_hover_border_color)

  // 駒がなくても駒が置けるようにする ← piece_lifted_hover_reaction になったときだけにすると駒台が拡縮して使いにくい
  //
  // +IF_HORIZONTAL
  //   .MembershipStandPieces
  //     &.piece_lifted_hover_reaction
  //       min-height: calc(var(--sp_cell_h) * var(--sp_stand_horizontal_hoverable_min_height)) // 最低限縦に駒3つ分を確保
  //       justify-content: flex-start                   // そうすると既存の駒が中央によってしまうので上寄せ
  //       min-width:  var(--sp_cell_w)           // 横を最低限確保
  // &.vertical
  //   .MembershipStandPieces
  //     &.piece_lifted_hover_reaction
  //       width: 100%                         // 駒がなくても駒台に置けるようにするため横幅最大化
  //       justify-content: flex-start         // そうすると既存の駒が中央によってしまうので左寄せ
  //       min-height: var(--sp_cell_h) // 縦を最低限確保

  ////////////////////////////////////////////////////////////////////////////////
  &.is_layer_on
    .MembershipStand
      +is_layer_border
      .PieceTap
        +is_layer_border

  ////////////////////////////////////////////////////////////////////////////////
  +IF_HORIZONTAL
    .is_position_north
      .MembershipStandPieces
        flex-direction: column-reverse // 全体横並び → 後手 → 縦並び(昇順) △が下にあるので大駒順に並べるため
    .is_position_south
      .MembershipStandPieces
        flex-direction: column         // 全体横並び → 先手 → 縦並び(降順)
  +IF_VERTICAL
    .is_position_north
      .MembershipStandPieces
        flex-direction: row-reverse    // 「飛歩」→「歩飛」
      .MembershipStand
        margin-left: auto              // 「△後手 飛歩…………」→「△後手…………飛歩」
    .is_position_south
      .MembershipStandPieces
        flex-direction: row            // 「飛歩」→「飛歩」
      .MembershipStand
        margin-right: auto             // 「…………飛歩 先手▲」→「飛歩…………先手▲」

// //////////////////////////////////////////////////////////////////////////////// edit なら最初から駒台を確保する
// .ShogiPlayer
//   &.is_mode_edit
//     // 駒がなくても駒が置けるようにする
//     +IF_HORIZONTAL
//       .MembershipStandPieces
//         // &.piece_lifted_hover_reaction
//         min-height: calc(var(--sp_cell_h) * var(--sp_stand_horizontal_hoverable_min_height)) // 最低限縦に駒3つ分を確保
//         justify-content: flex-start                   // そうすると既存の駒が中央によってしまうので上寄せ
//         min-width:  var(--sp_cell_w)           // 横を最低限確保
//     +IF_VERTICAL
//       .MembershipStandPieces
//         // &.piece_lifted_hover_reaction
//         min-height: var(--sp_cell_h) // 縦を最低限確保
//         width: 100%                         // 駒がなくても駒台に置けるようにするため横幅最大化
//         justify-content: flex-start         // そうすると既存の駒が中央によってしまうので左寄せ
</style>
