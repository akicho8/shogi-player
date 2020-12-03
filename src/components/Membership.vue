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
        list.push("is_turn_active")
      } else {
        list.push("is_turn_inactive")
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

.ShogiPlayerGround
  --sp_side_min_w: 20vw // 横配置時の最小(W)
  --sp_side_min_h: 20vw // 縦配置時の最小(H)

  .Membership
    display: flex
    align-items: center // ▲を中央に配置

  &.is_layer_on
    .Membership
      border: 1px dashed change_color($primary, $alpha: 0.5)

  &.is_horizontal
    .Membership
      min-width: var(--sp_side_min_w)
      &.is_white
        flex-direction: column-reverse   // 全体が横並び → 持駒は縦並び
        align-self: flex-start           // 全体が横並び → 持駒は縦並び → 後手は上寄せ
        // transform: rotate(180deg)
      &.is_black
        flex-direction: column           // 全体が横並び → 持駒は縦並び
        align-self: flex-end             // 全体が横並び → 持駒は縦並び → 先手は下寄せ

  &.is_vertical
    .Membership
      height: 100%
      width: 100%
      min-height: var(--sp_side_min_h)

      &.is_white
        flex-direction: row              // 全体が縦並び → 持駒は横並び → 左寄せ 後手は「△飛歩」のままでよい (左端→)
      &.is_black
        flex-direction: row-reverse      // 全体が縦並び → 持駒は横並び → 右寄せ 後手は「飛歩▲」とする (←右端)

  // モバイル時の設定は is_vertical と同じにしておく(共通化は危険)
  +mobile
    &.is_mobile_style
      .Membership
        height: 100%
        width: 100%
        min-height: var(--sp_side_min_h)
        &.is_white
          flex-direction: row
        &.is_black
          flex-direction: row-reverse
</style>
