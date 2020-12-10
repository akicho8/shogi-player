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
    PieceObject(
      :base="base"
      :class="piece_control_class(piece)"
      :piece_texture_class="piece_fore_class(piece)"
      :count="count"
      )
</template>

<script>
import _ from "lodash"
import PieceObject from "./PieceObject.vue"
import { support } from "./support.js"

export default {
  name: "MembershipStand",
  mixins: [support],

  props: {
    location: { required: true },
  },

  components: {
    PieceObject,
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
      if (this.holding_p) {
        list.push("hoverable_p")
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
  +defvar(sp_stand_hover_border_stroke, 2px) // 駒を持って駒箱の上にいるときのボーダーの太さ

  .MembershipStand
    display: flex
    justify-content: center
    align-items: center

  .MembershipStand
    +is_overlay_origin
  .MembershipStandTexture
    // background-color などはここで指定
    +is_overlay_block
    border-radius: var(--sp_board_radius)

  // 駒を持って駒箱の上にいるとき
  .MembershipStand
    &.hoverable_p
      &:hover
        .MembershipStandTexture
          border: var(--sp_stand_hover_border_stroke) dashed var(--sp_stand_hover_border_color)

  &.is_layer_on
    .MembershipStand
      border: 1px dashed change_color($primary, $alpha: 0.5)
      .PieceObject
        border: 1px dashed change_color($primary, $alpha: 0.5)

  &.is_horizontal
    .is_white
      .MembershipStand
        flex-direction: column-reverse // 全体横並び → 後手 → 縦並び(昇順) △が下にあるので大駒順に並べるため
    .is_black
      .MembershipStand
        flex-direction: column         // 全体横並び → 先手 → 縦並び(降順)

  =is_vertical_style
    .is_white
      .MembershipStand
        flex-direction: row-reverse    // 全体縦並び → 後手 → 横並び(昇順)
    .is_black
      .MembershipStand
        flex-direction: row            // 全体縦並び → 先手 → 横並び(降順)
  &.is_vertical
    +is_vertical_style
  +mobile
    &.is_mobile_style
      +is_vertical_style
</style>
