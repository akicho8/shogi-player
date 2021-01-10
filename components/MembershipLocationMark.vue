<template lang="pug">
.MembershipLocationMark(:class="component_class" :key="component_key" @click="click_handle")
  .MembershipLocationMarkTexture
</template>

<script>
import { support } from "./support.js"

export default {
  name: "MembershipLocationMark",
  mixins: [support],
  props: {
    location: { required: true },
  },
  methods: {
    click_handle() {
      if (this.flipable) {
        this.base.board_flip_toggle()
      }
      if (this.base.sp_location_click_handle) {
        this.base.sp_location_click_handle(this.location)
      }
    },
  },
  computed: {
    component_class() {
      return {
        "is-clickable": this.base.sp_location_click_handle || this.flipable
      }
    },
    // inactiveになったとき影が残ってしまう問題があった。
    // inactiveになったときもactiveなときのコンポーネントを共有しているから。
    // なので状態をユニークしたキーを設定する
    component_key() {
      return [
        this.$options.name,     // MembershipLocationMark
        this.location.key,      // black or white
        this.is_turn_key,       // active or inactive
      ].join(".")
    },
    is_turn_key() {
      return this.base.mediator.current_location === this.location ? "active" : "inactive"
    },
    flipable() {
      return this.base.sp_location_behavior === "is_location_flip_on"
    },
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayerGround
  +defvar(sp_location_mark_inactive_rate, 0.5) // 手番ではないときの☗サイズの倍率

  .MembershipLocationMark
    display: flex
    justify-content: center
    align-items: center    // 下を揃えて配置したいときは flex-end にすること(オプションにする)

  .MembershipLocationMarkTexture
    background-position: center
    background-repeat: no-repeat
    background-size: contain

  .is_white
    .MembershipLocationMarkTexture
      background-image: url("../assets/location/location_white.svg")

  .is_black
    .MembershipLocationMarkTexture
      background-image: url("../assets/location/location_black.svg")

  .is_position_north
    .MembershipLocationMarkTexture
      +filter_drop_shadow(-1)
      @extend %is_flip

  .is_position_south
    .MembershipLocationMarkTexture
      +filter_drop_shadow(1)

  //////////////////////////////////////////////////////////////////////////////// サイズ (基本)

  .MembershipLocationMark
    width:  var(--sp_stand_piece_w)
    height: var(--sp_stand_piece_h)
  .MembershipLocationMarkTexture
    width:  var(--sp_stand_piece_rate)
    height: var(--sp_stand_piece_rate)
  .is_turn_inactive
    .MembershipLocationMarkTexture
      width:  calc(var(--sp_stand_piece_rate) * var(--sp_location_mark_inactive_rate))
      height: calc(var(--sp_stand_piece_rate) * var(--sp_location_mark_inactive_rate))
</style>
