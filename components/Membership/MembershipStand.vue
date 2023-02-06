<template lang="pug">
.MembershipStand(:class="component_class" @click.right.stop.prevent="TheSp.hold_cancel")
  .MembershipStandTexture.is-overlay
  .MembershipStand2
    .PieceWithCount.is-flex(
      v-for="[piece, count] in hold_pieces"
      @click.stop="TheSp.piece_stand_piece_click(location, piece, false, $event)"
      @mouseover="TheSp.piece_stand_mouseover_handle(location, piece, $event)"
      @mouseleave="TheSp.mouseleave_handle"
      )
      PieceTap(
        :class="piece_tap_class(piece)"
        :piece_texture_class="piece_texture_class(piece)"
        :count="count"
        )
</template>

<script>
import _ from "lodash"
import PieceTap from "../PieceTap.vue"
import { support } from "../support.js"

export default {
  name: "MembershipStand",
  mixins: [support],

  props: {
    location: { required: true },
  },

  components: {
    PieceTap,
  },

  methods: {
    hold_piece_lifted_p(piece) {
      return this.TheSp.have_piece_location === this.location && this.TheSp.have_piece === piece
    },

    piece_tap_class(piece) {
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
            if (!this.TheSp.cpu_location_p && this.TheSp.xcontainer.current_location === this.location) {
              f = true
            }
          }
          if (this.TheSp.play_p && !this.TheSp.sp_play_mode_only_own_piece_to_move) {
            f = true
          }
          if (this.break_if_view_mode) {
            f = false
          }
          if (f) {
            list.push("selectable_p")
          }
        }
      }

      // list = _.concat(list, piece.css_class_list)
      // list.push(`location_${this.location.key}`)
      // list.push("promoted_false")

      return list
    },

    piece_texture_class(piece) {
      let list = []
      list = _.concat(list, piece.css_class_list)
      list.push(`location_${this.location.key}`)
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
          list.push("frame_boder_if_hover")
        }
      }
      return list
    },

    hold_pieces() {
      return this.TheSp.xcontainer.realized_hold_pieces_of(this.location.key)
    },
  },
}
</script>

<style lang="sass">
@import "../support.sass"
.ShogiPlayerGround
  +defvar(sp_stand_hover_border_color, hsla(0, 0%, 0%, 0.2)) // 駒を持って駒箱の上にいるときのボーダー色
  +defvar(sp_stand_hover_border_stroke, 2px)               // 駒を持って駒箱の上にいるときのボーダーの太さ
  +defvar(sp_stand_horizontal_hoverable_min_height, 3)     // edit_mode + 縦配置 + 駒台に置ける のときの駒台の最低限の高さ(駒N個分)
  +defvar(sp_stand_bg_color, hsla(0, 0%, 0%, 0))           // 駒台の背景色

  .MembershipStand
    // width: 100%
    // height: 100%

  .MembershipStand2
    display: flex
    justify-content: center // 駒台が広がったときに中央に寄るのを防ぎたいときは flex-start にする
    align-items: center

    // 最低限の大きさを確保するには？
    //
    //   min-width:  var(--sp_base_w)
    //   min-height: var(--sp_base_h)
    //
    // もし駒台を最初から見せる場合は？
    //
    //   width: 100%
    //   justify-content: flex-start
    //

  .MembershipStand
    +is_overlay_origin
  .MembershipStandTexture
    background-color: var(--sp_stand_bg_color)
    border-radius: calc(var(--sp_board_radius) * 1px)

  //////////////////////////////////////////////////////////////////////////////// 駒を持って駒箱の上にいるとき
  .MembershipStand
    &.frame_boder_if_hover
      &:hover
        .MembershipStandTexture
          border: var(--sp_stand_hover_border_stroke) dashed var(--sp_stand_hover_border_color)

  // 駒がなくても駒が置けるようにする ← piece_lifted_hover_reaction になったときだけにすると駒台が拡縮して使いにくい
  //
  // +IS_HORIZONTAL
  //   .MembershipStand2
  //     &.piece_lifted_hover_reaction
  //       min-height: calc(var(--sp_base_h) * var(--sp_stand_horizontal_hoverable_min_height)) // 最低限縦に駒3つ分を確保
  //       justify-content: flex-start                   // そうすると既存の駒が中央によってしまうので上寄せ
  //       min-width:  var(--sp_base_w)           // 横を最低限確保
  // &.is_layout_vertical
  //   .MembershipStand2
  //     &.piece_lifted_hover_reaction
  //       width: 100%                         // 駒がなくても駒台に置けるようにするため横幅最大化
  //       justify-content: flex-start         // そうすると既存の駒が中央によってしまうので左寄せ
  //       min-height: var(--sp_base_h) // 縦を最低限確保

  ////////////////////////////////////////////////////////////////////////////////
  &.is_layer_on
    .MembershipStand
      +is_layer_border
      .PieceTap
        +is_layer_border

  ////////////////////////////////////////////////////////////////////////////////
  +IS_HORIZONTAL
    .is_position_north
      .MembershipStand2
        flex-direction: column-reverse // 全体横並び → 後手 → 縦並び(昇順) △が下にあるので大駒順に並べるため
    .is_position_south
      .MembershipStand2
        flex-direction: column         // 全体横並び → 先手 → 縦並び(降順)
  +IS_VERTICAL
    .is_position_north
      .MembershipStand2
        flex-direction: row-reverse    // 「飛歩」→「歩飛」
      .MembershipStand
        margin-left: auto              // 「△後手 飛歩…………」→「△後手…………飛歩」
    .is_position_south
      .MembershipStand2
        flex-direction: row            // 「飛歩」→「飛歩」
      .MembershipStand
        margin-right: auto             // 「…………飛歩 先手▲」→「飛歩…………先手▲」

// //////////////////////////////////////////////////////////////////////////////// edit_mode なら最初から駒台を確保する
// .ShogiPlayer
//   &.is_run_mode_edit_mode
//     // 駒がなくても駒が置けるようにする
//     .ShogiPlayerGround
//       +IS_HORIZONTAL
//         .MembershipStand2
//           // &.piece_lifted_hover_reaction
//           min-height: calc(var(--sp_base_h) * var(--sp_stand_horizontal_hoverable_min_height)) // 最低限縦に駒3つ分を確保
//           justify-content: flex-start                   // そうすると既存の駒が中央によってしまうので上寄せ
//           min-width:  var(--sp_base_w)           // 横を最低限確保
//       +IS_VERTICAL
//         .MembershipStand2
//           // &.piece_lifted_hover_reaction
//           min-height: var(--sp_base_h) // 縦を最低限確保
//           width: 100%                         // 駒がなくても駒台に置けるようにするため横幅最大化
//           justify-content: flex-start         // そうすると既存の駒が中央によってしまうので左寄せ
</style>
