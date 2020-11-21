<template lang="pug">
.Membership(:class="component_class" v-if="component_show_p")
  MembershipLocation(:base="base" :location="location")
  MembershipStand(:base="base" :location="location")
  slot
</template>

<script>
import _ from "lodash"
import { support } from "./support.js"
import MembershipLocation from "./MembershipLocation.vue"
import MembershipStand from "./MembershipStand.vue"

export default {
  mixins: [support],

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
      list.push(`is_${this.location.key}`)
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
// $board_top_bottom_gap: 3px

.ShogiPlayerPure
  .Membership
    display: flex
    align-items: center // ▲を中央に配置

  &.is_layer_on
    .Membership
      border: 1px dashed change_color($primary, $alpha: 0.5)

  +tablet
    &.is_horizontal
      .Membership
        flex-direction: column
        &.is_white
          align-self: flex-start
          transform: rotate(180deg)
        &.is_black
          align-self: flex-end
    &.is_vertical
      .Membership
        height: 100%
        width: 100%
        flex-direction: row-reverse
        &.is_white
          justify-content: flex-start
          transform: rotate(180deg)
        &.is_black
          justify-content: flex-end
  +mobile
    .Membership
      height: 100%
      width: 100%
      flex-direction: row-reverse
      &.is_white
        justify-content: flex-start
        transform: rotate(180deg)
      &.is_black
        justify-content: flex-end
</style>
