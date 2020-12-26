<template lang="pug">
.Membership(:class="component_class" v-if="component_show_p")
  MembershipLocation(           :base="base" :location="location")
  MembershipLocationPlayerInfo( :base="base" :location="location")
  MembershipStand(              :base="base" :location="location")
  slot
</template>

<script>
import _ from "lodash"
import { support } from "./support.js"
import MembershipLocation from "./MembershipLocation.vue"
import MembershipStand from "./MembershipStand.vue"
import MembershipLocationPlayerInfo from "./MembershipLocationPlayerInfo.vue"

export default {
  mixins: [support],

  props: {
    location: { required: true },
    position: { required: true },
  },

  components: {
    MembershipLocation,
    MembershipLocationPlayerInfo,
    MembershipStand,
  },

  computed: {
    component_class() {
      const list = []
      list.push(`is_position_${this.position}`) // 一番上で定義してあるので子には渡す必要なし
      list.push(`is_${this.location.key}`)
      if (this.base.mediator.current_location === this.location) {
        list.push("is_turn_active")
      } else {
        list.push("is_turn_inactive")
      }
      return list
    },

    // ビューモードのとき持駒が空なら駒台を表示しない
    component_show_p() {
      if (this.base.view_p && this.base.sp_hidden_if_piece_stand_blank && _.isEmpty(this.hold_pieces)) {
        return false
      }
      return true
    },

    hold_pieces() {
      return this.base.mediator.realized_hold_pieces_of(this.location.flip_if(this.base.new_flip).key)
    },
  },
}
</script>

<style lang="sass">
@import "./support.sass"

.ShogiPlayerGround
  .Membership
    display: flex
    align-items: center // ▲を中央に配置

  &.is_layer_on
    .Membership
      +is_layer_border

  +IS_HORIZONTAL
    .Membership
      &.is_position_north
        flex-direction: column-reverse   // 全体が横並び → 持駒は縦並び
        align-self: flex-start           // 全体が横並び → 持駒は縦並び → 後手は上寄せ
      &.is_position_south
        flex-direction: column           // 全体が横並び → 持駒は縦並び
        align-self: flex-end             // 全体が横並び → 持駒は縦並び → 先手は下寄せ
  +IS_VERTICAL
    .Membership
      width: 100%
      height: 100%
      &.is_position_north
        flex-direction: row              // 全体が縦並び → 持駒は横並び → 左寄せ 後手は「△ 後手 飛歩」のままでよい (左端→)
      &.is_position_south
        flex-direction: row-reverse      // 全体が縦並び → 持駒は横並び → 右寄せ 先手は「飛歩 先手 ▲」とする (←右端)
</style>
