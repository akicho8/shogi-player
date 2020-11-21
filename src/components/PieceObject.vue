<template lang="pug">
.PieceObject(v-if="count >= 1")
  .PieceTexture(:class="piece_texture_class")
    PieceObjectCount(:count="count")
</template>

<script>
import _ from "lodash"
import { support } from "./support.js"
import PieceObjectCount from "./PieceObjectCount.vue"

export default {
  name: "PieceObject",
  mixins: [support],
  components: {
    PieceObjectCount,
  },
  props: {
    piece_texture_class: { required: true              },
    count:               { required: false, default: 1 },
  },
}
</script>

<style lang="sass">
@import "./support.sass"

// 選択できる駒に指定する
%dom_real_selectable
  +filter_drop_shadow($sp_real_piece_shadow_depth, $sp_real_piece_shadow_blur)
  &.holding_p
    +desktop
      opacity: 0.4  // 駒を持ち上げたので元の駒を薄くする
    +touch
      background-color: $sp_real_holding_color
      // さらに駒を持ったときは色を濃くする
      &:hover
        background-color: $sp_real_holding_color

  &.selectable_p
    &:hover
      // スマホでは手を離しても hover 状態を保持してしまう
      // そのため2手目に1手目の指し手の hover の色がつきっぱなしになってしまう
      // そうすると手目より1手目の方が目立って違和感がある
      // なのでマウスが使える環境だけを対象にする
      +desktop
        // 選択できる駒だけ反応する
        // background プロパティをつかうと他の設定をリセットしてしまうので注意
        background-color: $sp_real_selectable_color

  @extend %real_hoverable_bg

.ShogiPlayerPure
  // 共通
  .PieceObject
    // cursor: default // テキスト選択「I」ではなく矢印カーソルとする
    &.selectable_p
      &:hover
        cursor: pointer

  // .BoardOuter
  .PieceObject
    // box2 のサイズ%を最大するため必要
    width: 100%
    height: 100%

    // 中央に配置
    display: flex
    justify-content: center
    align-items: center    // 下を揃えて配置したいときは flex-end にすること(オプションにする)

  // 下揃えの場合
  // &.is_texture_image
  //   .BoardOuter
  //     .PieceObject
  //       align-items: flex-end

  &.is_texture_image
    .PieceObject
      @extend %dom_real_selectable
      &.origin_place
        background-color: $sp_real_origin_bg
      &.current
        animation: real_blink 0.5s ease-in-out infinite alternate

    .PieceTexture
      width: 90%
      height: 90%

      // テクスチャ
      background-position: center
      background-repeat: no-repeat
      background-size: contain // 必ず駒の全体が表示されるようにする
      filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.5))

      // 下に引く
      position: relative
      top: var(--piece_pull, 0%)

      // 確認用
      border: 1px dashed change_color($primary, $alpha: 0.5)

    .PieceStand
      .PieceTexture

  .Membership
    &.is_black
      .MembershipStand
        // +filter_drop_shadow($sp_real_board_shadow_depth, $sp_real_board_shadow_blur)
    &.is_white
      .MembershipStand
        // +filter_drop_shadow(-$sp_real_board_shadow_depth, $sp_real_board_shadow_blur) // 相手の駒台は逆になっているため影を逆にする
        .PieceObject
          @extend %is_flip   // 後手の下向きの駒が、駒台が逆になることで上に向いているため、下向きにする
</style>
