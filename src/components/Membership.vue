<template lang="pug">
.Membership.is-flex(:class="component_class" v-if="component_show_p")
  MembershipLocation(:base="base" :location="location")
  MembershipStand(:base="base" :location="location")
  slot
</template>

<script>
import _ from "lodash"
import { support_child } from "./support_child.js"
import MembershipLocation from "./MembershipLocation.vue"
import MembershipStand from "./MembershipStand.vue"

export default {
  mixins: [support_child],

  props: {
    location: { required: true },
  },

  components: {
    MembershipLocation,
    MembershipStand,
  },

  computed: {
    component_class() {
      const list = []
      list.push(`location_${this.location.key}`)
      list.push(this.base.env)
      if (this.base.mediator.current_location === this.location) {
        list.push("turn_active")
      }
      return list
    },

    // ビューモードのとき持駒が空なら駒台を表示しない
    component_show_p() {
      if (this.base.view_p && this.base.hidden_if_piece_stand_blank && _.isEmpty(this.hold_pieces)) {
        return false
      }
      return true
    },

    hold_pieces() {
      return this.base.mediator.realized_hold_pieces_of(this.location.key)
    },
  },
}
</script>

<style lang="sass">
@import "./support.sass"
$board_top_bottom_gap: 3px
.shogi-player
  &.vertical
    .Membership
      &.is_white
        margin-bottom: $board_top_bottom_gap
      &.is_black
        margin-top: $board_top_bottom_gap

      width: 100%
      flex-direction: row-reverse
      align-items: center
      justify-content: flex-end

      &.location_white
        @extend %is_flip

      @extend %is_unselectable

</style>
