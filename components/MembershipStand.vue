<template lang="pug">
.MembershipStand(
  :class="component_class"
  @click.stop.prevent="base.piece_stand_click(location, $event)"
  @click.right.stop.prevent="base.hold_cancel"
  )
  .MembershipStandTexture
  .PieceWithCount.is-flex(
    v-for="[piece, count] in hold_pieces"
    @click.stop="base.piece_stand_piece_click(location, piece, false, $event)"
    @mouseover="base.piece_stand_mouseover_handle(location, piece, $event)"
    @mouseleave="base.mouseleave_handle"
    )
    PieceTap(
      :base="base"
      :class="piece_control_class(piece)"
      :piece_texture_class="piece_fore_class(piece)"
      :count="count"
      )
</template>

<script>
import _ from "lodash"
import PieceTap from "./PieceTap.vue"
import { support } from "./support.js"

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
    hold_piece_holding_p(piece) {
      return this.base.have_piece_location === this.location && this.base.have_piece === piece
    },

    piece_control_class(piece) {
      let list = []

      // if (this.holding_p) {
      //   list.push("hoverable_p")
      // }

      if (this.hold_piece_holding_p(piece)) {
        list.push("holding_p")
      } else {
        let f = false
        if (this.base.edit_p) {
          f = true
        }
        if (this.base.play_p) {
          if (!this.base.cpu_location_p && this.base.mediator.current_location === this.location) {
            f = true
          }
        }
        if (f) {
          if (!this.holding_p) {
            list.push("selectable_p")
          }
        }
      }

      // list = _.concat(list, piece.css_class_list)
      // list.push(`location_${this.location.key}`)
      // list.push("promoted_false")

      return list
    },

    piece_fore_class(piece) {
      let list = []
      list = _.concat(list, piece.css_class_list)
      list.push(`location_${this.location.key}`)
      list.push("promoted_false")
      return list
    },
  },

  computed: {
    holding_p() {
      return this.base.holding_p
    },

    component_class() {
      const list = []
      if (this.base.edit_p) {
        if (this.holding_p) {
          list.push("hoverable_p")
        }
      }
      return list
    },

    hold_pieces() {
      return this.base.mediator.realized_hold_pieces_of(this.location.key)
    },
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayerGround
  +defvar(sp_stand_hover_border_color, rgba(0, 0, 0, 0.2)) // 駒を持って駒箱の上にいるときのボーダー色
  +defvar(sp_stand_hover_border_stroke, 2px)               // 駒を持って駒箱の上にいるときのボーダーの太さ
  +defvar(sp_stand_horizontal_hoverable_min_height, 3)     // edit_mode + 縦配置 + 駒台に置ける のときの駒台の最低限の高さ(駒N個分)

  .MembershipStand
    display: flex
    justify-content: center // 駒台が広がったときに中央に寄るのを防ぎたいときは flex-start にする
    align-items: center

    // 最低限の大きさを確保するには？
    //
    //   min-width:  var(--sp_stand_piece_w)
    //   min-height: var(--sp_stand_piece_h)
    //
    // もし駒台を最初から見せる場合は？
    //
    //   width: 100%
    //   justify-content: flex-start
    //

  .MembershipStand
    +is_overlay_origin
  .MembershipStandTexture
    // background-color などはここで指定
    +is_overlay_block
    border-radius: calc(var(--sp_board_radius) * 1px)

  //////////////////////////////////////////////////////////////////////////////// 駒を持って駒箱の上にいるとき
  .MembershipStand
    &.hoverable_p
      &:hover
        .MembershipStandTexture
          border: var(--sp_stand_hover_border_stroke) dashed var(--sp_stand_hover_border_color)

  // 駒がなくても駒が置けるようにする ← hoverable_p になったときだけにすると駒台が拡縮して使いにくい
  //
  // &.is_horizontal
  //   .MembershipStand
  //     &.hoverable_p
  //       min-height: calc(var(--sp_stand_piece_h) * var(--sp_stand_horizontal_hoverable_min_height)) // 最低限縦に駒3つ分を確保
  //       justify-content: flex-start                   // そうすると既存の駒が中央によってしまうので上寄せ
  //       min-width:  var(--sp_stand_piece_w)           // 横を最低限確保
  // &.is_vertical
  //   .MembershipStand
  //     &.hoverable_p
  //       width: 100%                         // 駒がなくても駒台に置けるようにするため横幅最大化
  //       justify-content: flex-start         // そうすると既存の駒が中央によってしまうので左寄せ
  //       min-height: var(--sp_stand_piece_h) // 縦を最低限確保

  ////////////////////////////////////////////////////////////////////////////////
  &.is_layer_on
    .MembershipStand
      +is_layer_border
      .PieceTap
        +is_layer_border

  ////////////////////////////////////////////////////////////////////////////////
  &.is_horizontal
    .is_white
      .MembershipStand
        flex-direction: column-reverse // 全体横並び → 後手 → 縦並び(昇順) △が下にあるので大駒順に並べるため
    .is_black
      .MembershipStand
        flex-direction: column         // 全体横並び → 先手 → 縦並び(降順)
  +is_vertical_and_mobile
    .is_white
      .MembershipStand
        flex-direction: row-reverse    // 「飛歩」→「歩飛」
        margin-left: auto              // 「△後手 飛歩…………」→「△後手…………飛歩」
    .is_black
      .MembershipStand
        flex-direction: row            // 「飛歩」→「飛歩」
        margin-right: auto             // 「…………飛歩 先手▲」→「飛歩…………先手▲」

//////////////////////////////////////////////////////////////////////////////// edit_mode なら最初から駒台を確保する
.ShogiPlayer
  &.run_mode-edit_mode
    // 駒がなくても駒が置けるようにする
    .is_horizontal
      .MembershipStand
        // &.hoverable_p
        min-height: calc(var(--sp_stand_piece_h) * var(--sp_stand_horizontal_hoverable_min_height)) // 最低限縦に駒3つ分を確保
        justify-content: flex-start                   // そうすると既存の駒が中央によってしまうので上寄せ
        min-width:  var(--sp_stand_piece_w)           // 横を最低限確保
    .is_vertical
      .MembershipStand
        // &.hoverable_p
        width: 100%                         // 駒がなくても駒台に置けるようにするため横幅最大化
        justify-content: flex-start         // そうすると既存の駒が中央によってしまうので左寄せ
        min-height: var(--sp_stand_piece_h) // 縦を最低限確保
</style>
