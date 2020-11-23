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
      :count="count"
      )
</template>

<script>
import _ from "lodash"
import PieceObject from "./PieceObject.vue"
import PieceObjectCount from "./PieceObjectCount.vue"
import { support } from "./support.js"

export default {
  name: "MembershipStand",
  mixins: [support],

  props: {
    location: { required: true },
  },

  components: {
    PieceObject,
    PieceObjectCount,
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
.ShogiPlayerPosition
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
      .is_white
        .MembershipStand
          flex-direction: column-reverse // 全体横並び → 後手 → 縦並び(昇順) △が下にあるので大駒順に並べるため
      .is_black
        .MembershipStand
          flex-direction: column         // 全体横並び → 先手 → 縦並び(降順)
    &.is_vertical
      .is_white
        .MembershipStand
          flex-direction: row-reverse    // 全体縦並び → 後手 → 横並び(昇順)
      .is_black
        .MembershipStand
          flex-direction: row            // 全体縦並び → 先手 → 横並び(降順)

  // is_vertical と同じ(共通化禁止)
  +mobile
    .is_white
      .MembershipStand
        flex-direction: row-reverse    // 全体縦並び → 後手 → 横並び(昇順)
    .is_black
      .MembershipStand
        flex-direction: row            // 全体縦並び → 先手 → 横並び(降順)
</style>
