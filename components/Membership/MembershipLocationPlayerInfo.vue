<template lang="pug">
.MembershipLocationPlayerInfo(v-if="show_p" :class="component_class" @click="click_handle")
  .MembershipLocationPlayerInfoName(v-html="player_name" v-if="player_name")
  .MembershipLocationPlayerInfoTime.is-family-monospace(v-html="player_time" v-if="player_time")
</template>

<script>
import { support } from "../support.js"

export default {
  name: "MembershipLocationPlayerInfo",
  mixins: [support],
  props: {
    location: { required: true },
  },
  methods: {
    player_attr_of(key) {
      if (this.one_side_info) {
        return this.one_side_info[key]
      }
    },
    click_handle() {
      if (this.TheSp.sp_player_click_handle) {
        this.TheSp.sp_player_click_handle(this.location, this.one_side_info)
        if (false) {
          this.$emit("player_info_click", this.location, this.one_side_info)
        }
      }
    },
  },
  computed: {
    show_p() {
      return this.player_name || this.player_time
    },
    component_class() {
      return [
        { "is-clickable": this.TheSp.sp_player_click_handle },
        this.player_class,
      ]
    },
    one_side_info() {
      if (this.TheSp.sp_player_info) {
        return this.TheSp.sp_player_info[this.location.key]
      }
    },
    player_name()  { return this.player_attr_of("name")  },
    player_time()  { return this.player_attr_of("time")  },
    player_class() { return this.player_attr_of("class") },
  },
}
</script>

<style lang="sass">
@import "../support.sass"
.ShogiPlayerGround
  +defvar(sp_player_name_font_size, 0.75rem)       // 対局者の名前の表示サイズ
  +defvar(sp_player_time_font_size, 0.75rem)       // 対局者の時間の表示サイズ

  .MembershipLocationPlayerInfo
    font-size: var(--sp_player_name_font_size)
    word-break: break-all
    flex-shrink: 0 // 縮小しない(縦置き時に駒台の横幅を100%にするとここが縮小しようとして1文字ずつ折り返しになる、のを防ぐ)

    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    gap: 0.2em                   // 名前と時間の隙間

  .Membership
    &.is_turn_active
      .MembershipLocationPlayerInfo
        font-weight: bold

  +IS_HORIZONTAL                            // 横書きなら
    &.is_player_name_dir_vertical           // 縦書き
      .MembershipLocationPlayerInfoName
        writing-mode: vertical-rl
  +IS_VERTICAL                              // 縦の場合は(自動で縦にした場合も含めて)横にする
    &.is_player_name_dir_vertical           // 詳細度で負けないように必要
      .MembershipLocationPlayerInfoName
        writing-mode: horizontal-tb         // 明示的に横にする

  .MembershipLocationPlayerInfoTime
    white-space: nowrap         // 時間は絶対に折り返させない
    font-size: var(--sp_player_time_font_size)

  &.is_balloon_on
    .MembershipLocationPlayerInfo
      @extend %is_piece_count_color_set
      padding: 0.5em
      border-radius: 3px

  &.is_layer_on
    .MembershipLocationPlayerInfo
      +is_layer_border

  .MembershipLocationPlayerInfo
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center

  .is_position_north
    .MembershipLocationPlayerInfo
      @extend %is_flip

  .is_position_south
    .MembershipLocationPlayerInfo

  // 横配置のときに限り、横幅を「駒台の駒の押せる領域」と同じ幅にする
  +IS_HORIZONTAL
    .MembershipLocationPlayerInfo
      max-width: var(--sp_auto_cell_w)
      line-height: 110%         // 元々100%にしていたくっつきすぎな印象がある

  // 縦幅がわりと自由につかえるので隙間をあける
  +IS_VERTICAL
    .MembershipLocationPlayerInfo
      max-width: unset
      line-height: 140%
</style>
