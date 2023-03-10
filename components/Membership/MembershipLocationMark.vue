<template lang="pug">
.MembershipLocationMark(:class="component_class" :key="component_key" @click="click_handle")
  .MembershipLocationMarkTexture
</template>

<script>
import { support } from "../support.js"

export default {
  name: "MembershipLocationMark",
  mixins: [support],
  inject: ["location"],
  methods: {
    click_handle() {
      if (this.flipable) {
        this.TheSp.viewpoint_flip_handle()
      }
    },
  },
  computed: {
    component_class() {
      return {
        "is-clickable": this.flipable,
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
      return this.TheSp.xcontainer.current_location === this.location ? "active" : "inactive"
    },
    flipable() {
      return this.TheSp.sp_location_click_behavior === "flip"
    },
  },
}
</script>

<style lang="sass">
@import "../support.sass"
.ShogiPlayer
  +defvar(sp_location_mark_active_size, 1.0)   // 手番のときの☗サイズの倍率
  +defvar(sp_location_mark_inactive_size, 0.5) // 手番ではないときの☗サイズの倍率

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
      background-image: url("../../assets/location/white.svg")

  .is_black
    .MembershipLocationMarkTexture
      background-image: url("../../assets/location/black.svg")

  .is_position_north
    .MembershipLocationMarkTexture
      +is_flip

  .is_position_south
    .MembershipLocationMarkTexture

  //////////////////////////////////////////////////////////////////////////////// サイズ (基本)

  .MembershipLocationMark
    width:  var(--sp_cell_w)
    height: var(--sp_cell_h)
  .MembershipLocationMarkTexture
    width:  calc(var(--sp_stand_piece_size) * var(--sp_location_mark_active_size) * 100%)
    height: calc(var(--sp_stand_piece_size) * var(--sp_location_mark_active_size) * 100%)
  .is_turn_inactive
    .MembershipLocationMarkTexture
      width:  calc(var(--sp_stand_piece_size) * var(--sp_location_mark_inactive_size) * 100%)
      height: calc(var(--sp_stand_piece_size) * var(--sp_location_mark_inactive_size) * 100%)
</style>
