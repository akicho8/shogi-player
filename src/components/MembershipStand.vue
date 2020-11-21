<template lang="pug">
.MembershipStand(
  :class="component_class"
  @click.stop.prevent="base.piece_stand_click(location, $event)"
  @click.right.stop.prevent="base.hold_cancel"
  )
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
      )
    PieceCount(:count="count")
</template>

<script>
import _ from "lodash"
import PieceObject from "./PieceObject.vue"
import PieceCount from "./PieceCount.vue"
import { support } from "./support.js"

export default {
  name: "MembershipStand",
  mixins: [support],

  props: {
    location: { required: true },
  },

  components: {
    PieceObject,
    PieceCount,
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
      } else if (this.base.edit_p || (!this.base.cpu_location_p && this.base.mediator.current_location === this.location)) {
        if (!this.holding_p) {
          list.push("selectable_p")
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
.ShogiPlayerPure
  .MembershipStand
    display: flex
    justify-content: center
    align-items: center

    // @extend %board_texture_bg
    @extend %real_hoverable_opacity

  &.is_layer_on
    .MembershipStand
      border: 1px dashed change_color($primary, $alpha: 0.5)
      .PieceObject
        border: 1px dashed change_color($primary, $alpha: 0.5)

  +tablet
    &.is_horizontal
      .MembershipStand
        flex-direction: column
    &.is_vertical
      .MembershipStand
        flex-direction: row
  +mobile
    .MembershipStand
      flex-direction: row

  // min-width: $sp_piece_stand_size_if_blank
  // padding: 0.25rem

  // .PieceWithCount                // FIXME: クリックをここにしたい
  //   padding: 0 0.25rem
  //   justify-content: center
  //   align-items: center
  //   .PieceObject
  //     // width:  2.4rem
  //     // height: 2.4rem     // 駒の大きさ

  // .Membership
  //   &.location_black
  //     .MembershipStand
  //       &:after
  //         +filter_drop_shadow($sp_real_board_shadow_depth, $sp_real_board_shadow_blur)
  //   &.location_white
  //     .MembershipStand
  //       &:after
  //         +filter_drop_shadow(-$sp_real_board_shadow_depth, $sp_real_board_shadow_blur) // 相手の駒台は逆になっているため影を逆にする
      //       .PieceObject
  //         @extend %is_flip   // 後手の下向きの駒が、駒台が逆になることで上に向いているため、下向きにする
</style>
