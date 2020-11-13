<template lang="pug">
.MembershipStand.is-flex(
  :class="component_class"
  @click.stop.prevent="base.piece_stand_click(location, $event)"
  @click.right.stop.prevent="base.hold_cancel"
  )
  .one_piece.is-flex(
    v-for="[piece, count] in hold_pieces"
    @click.stop="base.piece_stand_piece_click(location, piece, false, $event)"
    @mouseover="base.piece_stand_mouseover_handle(location, piece, $event)"
    @mouseleave="base.mouseleave_handle"
    )
    PieceObject(
      :base="base"
      :class="piece_control_class(piece)"
      :tclass="piece_fore_class(piece)"
      :piece_text="piece.name"
      )
    .piece_count(v-if="count >= 2")
      | {{count}}
</template>

<script>
import _ from "lodash"
import PieceObject from "./PieceObject.vue"
import { support_child } from "./support_child.js"

export default {
  name: "MembershipStand",
  mixins: [support_child],

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
.shogi-player
  &.vertical
    .MembershipStand
      height: 4rem
      // margin-top: $sp_size_piece_stand_margin_top_bottom
      justify-content: center
      align-items: center
      .one_piece
        margin: 0 0.25rem
        font-size: 1.8rem
        justify-content: center
        align-items: center
        border: 1px dashed change_color($black, $alpha: 0.8)
        .PieceObject
          .piece_fore
            height: 2rem
            width: 2rem
</style>
