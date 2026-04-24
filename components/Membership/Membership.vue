<template lang="pug">
.Membership(
  :class="component_class"
  v-if="component_show_p"
  @pointerdown.capture.right="right_click_handle"
  @pointerdown.capture.left="left_click_handle"
  v-sp-disable-interactions
  )
  MembershipLocation
  MembershipLocationPlayerInfo
  MembershipStand
  slot
</template>

<script>
import _ from "lodash"
import { support } from "../support.js"

import MembershipLocation           from "./MembershipLocation.vue"
import MembershipStand              from "./MembershipStand.vue"
import MembershipLocationPlayerInfo from "./MembershipLocationPlayerInfo.vue"

export default {
  mixins: [support],
  props: {
    location: { required: true }, // 論理的な位置
    position: { required: true }, // 物理的な位置
  },

  provide() {
    return {
      ms: this,
    }
  },

  components: {
    MembershipLocation,
    MembershipLocationPlayerInfo,
    MembershipStand,
  },

  methods: {
    // これが capture によって子供の駒より先に反応しているため駒を持っているときに元に戻される
    // capture にしなかったら駒台の駒を持ち替えることができる
    // しかし一見便利なように見えて駒を離せなくなるので持ち替えはやらない方がよい
    left_click_handle(e) {
      if (this.TheSP.membership_left_click_handle(this.location, e)) {
        e.preventDefault()
        e.stopPropagation()
      }
    },
    right_click_handle(e) {
      if (this.TheSP.membership_right_click_handle(this.location, e)) {
        e.preventDefault()
        e.stopPropagation()
      }
    },

    player_attr_of(key) {
      const hv = this.current_player_info
      if (hv) {
        return hv[key]
      }
    },
  },

  computed: {
    current_player_info() { return this.TheSP.player_info_at(this.location) },

    component_class() {
      const list = []

      // 一番上で定義してあるので子には渡す必要なし
      if (this.TheSP.sp_stand_flip) {
        list.push(`is_position_south`)
      } else {
        list.push(`is_position_${this.position}`)
      }

      list.push(`is_${this.location.key}`)

      if (this.TheSP.xcontainer.current_location === this.location) {
        list.push("is_turn_active")
      } else {
        list.push("is_turn_inactive")
      }

      // list.push("is-invisible")
      // list.push("is-hidden")

      return list
    },

    // 表示するか？
    // ・sp_piece_stand_blank_then_hidden が有効なとき持駒が空なら駒台を表示しない
    component_show_p() {
      if (this.TheSP.sp_piece_stand_blank_then_hidden) {
        if (this.TheSP.xcontainer.hold_pieces_blank_p(this.location)) {
          return false
        }
      }
      return true
    },
  },
}
</script>

<style lang="sass">
@import "../support"

.ShogiPlayer
  +defvar(sp_membership_vertical_gap, 0.0)    // 盤の左右の隙間(全体横レイアウト時)
  +defvar(sp_membership_horizontal_gap, 0.0)  // 盤の上下の隙間(全体縦レイアウト時)

  .Membership
    display: flex
    align-items: center // ▲を中央に配置

  ////////////////////////////////////////////////////////////////////////////////

  // 左右配置の場合は縦に並ぶため駒台の駒の高さ(H)を基準にする
  +IF_HORIZONTAL
    .Membership
      gap: calc(var(--sp_stand_cell_current_h) * var(--sp_membership_vertical_gap))

  // 上下配置の場合は横に並ぶため駒台の駒の幅(W)を基準にする
  +IF_VERTICAL
    .Membership
      gap: calc(var(--sp_stand_cell_current_w) * var(--sp_membership_horizontal_gap))

  ////////////////////////////////////////////////////////////////////////////////

  +IF_HORIZONTAL
    .Membership
      &.is_position_north
        flex-direction: column-reverse // 全体が横並び → 持駒は縦並び(△が下に来るため反転)
      &.is_position_south
        flex-direction: column         // 全体が横並び → 持駒は縦並び(▲が上に来るためそのまま)
    &.is_stand_gravity_top             // 左↓ 右↑
      .Membership
        &.is_position_north
          align-self: flex-end         // 全体が横並び → 持駒は縦並び → 後手は下寄せ
        &.is_position_south
          align-self: flex-start       // 全体が横並び → 持駒は縦並び → 先手は上寄せ
    &.is_stand_gravity_bottom          // 左↑ 右↓
      .Membership
        &.is_position_north
          align-self: flex-start       // 全体が横並び → 持駒は縦並び → 後手は上寄せ
        &.is_position_south
          align-self: flex-end         // 全体が横並び → 持駒は縦並び → 先手は下寄せ

  +IF_VERTICAL
    .Membership
      width: 100%
      height: 100%
      &.is_position_north
        flex-direction: row            // 全体が縦並び → 持駒は横並び → 左寄せ 後手は「△ 後手 飛歩」のままでよい (左端→)
        align-items: flex-end
      &.is_position_south
        flex-direction: row-reverse    // 全体が縦並び → 持駒は横並び → 右寄せ 先手は「飛歩 先手 ▲」とする (←右端)
        align-items: flex-start

  ////////////////////////////////////////////////////////////////////////////////

  &.is_layer_on
    .Membership
      +is_layer_border

  ////////////////////////////////////////////////////////////////////////////////
</style>
