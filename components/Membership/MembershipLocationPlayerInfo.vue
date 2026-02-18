<template lang="pug">
.MembershipLocationPlayerInfo(v-if="component_show_p" :class="player_class" @pointerdown="click_handle")
  .MembershipLocationPlayerInfoName(v-html="player_name" v-if="player_name")
  .MembershipLocationPlayerInfoTime.is-family-monospace(v-html="player_time" v-if="player_time")
</template>

<script>
import { support } from "../support.js"

export default {
  name: "MembershipLocationPlayerInfo",
  mixins: [support],
  inject: ["ms"],
  methods: {
    click_handle() {
      this.TheSP.event_call("ev_action_player_info_click", this.ms.location, this.ms.current_player_info)
    },
  },
  computed: {
    player_class()     { return this.ms.player_attr_of("class")      },
    player_name()      { return this.ms.player_attr_of("name")       },
    player_time()      { return this.ms.player_attr_of("time")       },
    component_show_p() { return this.player_name || this.player_time },
  },
}
</script>

<style lang="sass">
@import "../support.sass"
.ShogiPlayer
  +defvar(sp_player_name_size, 0.25)       // 対局者の名前の表示サイズ
  +defvar(sp_player_time_size, 0.25)       // 対局者の時間の表示サイズ

  .MembershipLocationPlayerInfo
    font-size: calc(var(--sp_stand_cell_current_h) * var(--sp_player_name_size))
    word-break: break-all
    flex-shrink: 0 // 縮小しない(縦置き時に駒台の横幅を100%にするとここが縮小しようとして1文字ずつ折り返しになる、のを防ぐ)

    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    gap: 0.2em                   // 名前と時間の隙間

  //////////////////////////////////////////////////////////////////////////////// 手番のときだけ濃くする

  .Membership
    &.is_turn_inactive
      .MembershipLocationPlayerInfo
        font-weight: normal
    &.is_turn_active
      .MembershipLocationPlayerInfo
        font-weight: bold

  //////////////////////////////////////////////////////////////////////////////// 名前の方向

  +IF_HORIZONTAL                    // 横書きなら
    &.is_name_direction_vertical    // 縦書き
      .MembershipLocationPlayerInfoName
        writing-mode: vertical-rl
        text-orientation: upright   // 英字も正立させる https://x.com/Robby_WebDesign/status/1660638749611417603/photo/1
  +IF_VERTICAL                      // 縦の場合は(自動で縦にした場合も含めて)横にする
    &.is_name_direction_vertical    // 詳細度で負けないように必要
      .MembershipLocationPlayerInfoName
        writing-mode: horizontal-tb // 明示的に横にする

  //////////////////////////////////////////////////////////////////////////////// 時間

  .MembershipLocationPlayerInfoTime
    white-space: nowrap         // 時間は絶対に折り返させない
    font-size: calc(var(--sp_stand_cell_current_h) * var(--sp_player_time_size))

  //////////////////////////////////////////////////////////////////////////////// 背景 (横並び→丸める。縦並び→丸めない)

  &.is_balloon_on
    .MembershipLocationPlayerInfo
      @extend %is_piece_count_color_set
      padding: 0.5em

  +IF_HORIZONTAL
    &.is_balloon_on
      .MembershipLocationPlayerInfo
        border-radius: 3px
  +IF_VERTICAL
    &.is_balloon_on
      .MembershipLocationPlayerInfo
        border-radius: unset

  ////////////////////////////////////////////////////////////////////////////////

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
      +is_flip

  .is_position_south
    .MembershipLocationPlayerInfo
      __css_keep__: 0

  // 横配置のときに限り、横幅を「駒台の駒の押せる領域」と同じ幅にする
  +IF_HORIZONTAL
    .MembershipLocationPlayerInfo
      max-width: var(--sp_stand_cell_current_w)
      line-height: 110%         // 元々100%にしていたくっつきすぎな印象がある

  // 縦幅がわりと自由につかえるので隙間をあける
  +IF_VERTICAL
    .MembershipLocationPlayerInfo
      max-width: unset
      line-height: 140%
</style>
