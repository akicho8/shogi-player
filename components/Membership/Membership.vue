<template lang="pug">
.Membership(:class="component_class" v-if="component_show_p" @click.capture="click_handle")
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
    click_handle(e) {
      if (this.TheSp.membership_click_handle(this.location, e)) {
        e.preventDefault()
        e.stopPropagation()
      }
    },
  },

  computed: {
    component_class() {
      const list = []

      // 一番上で定義してあるので子には渡す必要なし
      if (this.TheSp.sp_stand_flip) {
        list.push(`is_position_${this.position}`)
      } else {
        list.push(`is_position_south`)
      }

      list.push(`is_${this.location.key}`)

      if (this.TheSp.xcontainer.current_location === this.location) {
        list.push("is_turn_active")
      } else {
        list.push("is_turn_inactive")
      }

      return list
    },

    // 表示するか？
    // ・sp_piece_stand_blank_then_hidden が有効なとき持駒が空なら駒台を表示しない
    component_show_p() {
      if (this.TheSp.sp_piece_stand_blank_then_hidden) {
        if (this.TheSp.xcontainer.hold_pieces_blank_p(this.location)) {
          return false
        }
      }
      return true
    },
  },
}
</script>

<style lang="sass">
@import "../support.sass"

.ShogiPlayer
  .Membership
    display: flex
    align-items: center // ▲を中央に配置

  &.is_layer_on
    .Membership
      +is_layer_border

  // .Membership
  //   border: 3px dashed blue ! important
  //
  // .MembershipLocation
  //   // border: 1px dashed change_color($primary, $alpha: 0.5)
  // .MembershipLocationPlayerInfo
  //   // border: 1px dashed change_color($primary, $alpha: 0.5)
  // .MembershipStand
  //   border: 3px dashed red ! important

  +IF_HORIZONTAL
    .Membership
      &.is_position_north
        flex-direction: column-reverse // 全体が横並び → 持駒は縦並び(△が下に来るため反転)
      &.is_position_south
        flex-direction: column         // 全体が横並び → 持駒は縦並び(▲が上に来るためそのまま)
    &.is_stand_gravity_top               // 左↓ 右↑
      .Membership
        &.is_position_north
          align-self: flex-end         // 全体が横並び → 持駒は縦並び → 後手は下寄せ
        &.is_position_south
          align-self: flex-start       // 全体が横並び → 持駒は縦並び → 先手は上寄せ
    &.is_stand_gravity_bottom              // 左↑ 右↓
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
        flex-direction: row              // 全体が縦並び → 持駒は横並び → 左寄せ 後手は「△ 後手 飛歩」のままでよい (左端→)
      &.is_position_south
        flex-direction: row-reverse      // 全体が縦並び → 持駒は横並び → 右寄せ 先手は「飛歩 先手 ▲」とする (←右端)
</style>
