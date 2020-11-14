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
      // @extend %is_unselectable                        // 名前がコピーできないのは不便なので取る

      width: 100%
      align-items: center                             // Y軸中央

      &.location_white
        flex-direction: row                           // そのままま △ 駒 の並び
        justify-content: flex-end                     // 右寄せ→
        margin-bottom: $board_top_bottom_gap          // 上に配置しているので下に隙間を作る
      &.location_black
        flex-direction: row-reverse                   // 駒 ▲ の並びにするため反転
        justify-content: flex-start                   // ←左寄せ
        margin-top: $board_top_bottom_gap             // 下に配置しているので上に隙間を作る
</style>
