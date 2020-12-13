<template lang="pug">
.MembershipLocationPlayerInfo.has-text-weight-bold.is-size-7(v-if="show_p" :class="component_class" @click="click_handle")
  .PlayerName(v-html="player_name" v-if="player_name")
  .PlayerTime(v-html="player_time" v-if="player_time")
</template>

<script>
import { support } from "./support.js"

export default {
  name: "MembershipLocationPlayerInfo",
  mixins: [support],
  props: {
    location: { required: true },
  },
  methods: {
    player_attr(key) {
      if (this.player_info) {
        return this.player_info[key]
      }
    },
    click_handle() {
      if (this.base.player_info_click_handle) {
        this.base.player_info_click_handle(this.location, this.player_info)
        // this.$emit("player_info_click", location, this.player_info)
      }
    },
  },
  computed: {
    show_p() {
      // return this.player_info && this.base.sp_layout === "is_vertical"
      return this.player_name || this.player_time
    },
    component_class() {
      return {
        "is-clickable": this.base.player_info_click_handle,
      }
    },
    player_info() {
      if (this.base.player_info) {
        return this.base.player_info[this.location.key]
      }
    },
    player_name() { return this.player_attr("name") },
    player_time() { return this.player_attr("time") },
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayerGround
  .MembershipLocationPlayerInfo
    line-height: 140%
    word-break: break-all
    color: var(--sp_font_color)
    color: $black
    background-color: white
    padding: 0.5em
    border-radius: 3px

    font-size: var(--sp_piece_count_font_size)
    line-height: 100%
    background-color: var(--sp_piece_count_bg_color)
    padding: var(--sp_piece_count_padding)
    color: var(--sp_piece_count_font_color)
    font-weight: bold

  &.is_layer_on
    .MembershipLocationPlayerInfo
      border: 1px dashed change_color($primary, $alpha: 0.5)

  .MembershipLocationPlayerInfo
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center

  .is_black
    .MembershipLocationPlayerInfo

  .is_white
    .MembershipLocationPlayerInfo
      @extend %is_flip // ← 反転しない方がいいかもしれない

  // 横配置のときに限り、横幅を「駒台の駒の押せる領域」と同じ幅にする
  &.is_horizontal
    .MembershipLocationPlayerInfo
      max-width: var(--sp_stand_piece_w)
</style>
