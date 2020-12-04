<template lang="pug">
.PieceObject(v-if="count >= 1")
  // 駒を押せる部分
  .PieceTexture
    // PieceTexture の背景に画像を設定すると影が PieceObjectCount にまで適用されるため個別にしている
    .PieceTextureSelf(:class="piece_texture_class")
    // 駒テクスチャの大きさに依存させたいので中に PieceTexture のなかに入れている
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
  // +filter_drop_shadow($sp_real_piece_shadow_depth, $sp_real_piece_shadow_blur)
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

.ShogiPlayerGround
  --sp_board_piece_rate: 90%     // 盤のセル内の駒占有率

  --sp_stand_piece_w: 35px       // 駒台のセル(W)
  --sp_stand_piece_h: 44px       // 駒台のセル(H)
  --sp_stand_piece_rate: 90%     // 駒台のセル内の駒占有率

  --sp_piece_box_piece_w: 38px   // 駒箱のセル(W)
  --sp_piece_box_piece_h: 46px   // 駒箱のセル(H)
  --sp_piece_box_piece_rate: 90% // 駒箱のセル内の駒占有率

  // 共通
  .PieceObject
    // cursor: default // テキスト選択「I」ではなく矢印カーソルとする
    &.selectable_p
      &:hover
        cursor: pointer

  // 確認用
  &.is_layer_on
    .PieceObject
      border: 1px dashed change_color($primary, $alpha: 0.5)
    .PieceTexture
      border: 1px dashed change_color($danger, $alpha: 0.5)

  // .BoardOuter
  .PieceObject

    // 中央に配置
    display: flex
    justify-content: center
    align-items: center    // 下を揃えて配置したいときは flex-end にすること(オプションにする)
    // align-items: flex-end  // 下を揃えて配置したいときは flex-end にすること(オプションにする)

  .PieceObject
    @extend %dom_real_selectable
    &.origin_place
      background-color: $sp_real_origin_bg
    &.current
      animation: real_blink 0.5s ease-in-out infinite alternate

  ////////////////////////////////////////////////////////////////////////////////
  .PieceTexture
    position: relative // PieceTextureSelf の基点を PieceTexture にするため(重要)
    // 下に引く度合い
    // top: var(--piece_pull, 0%)
  .PieceTextureSelf // .PieceTexture:after の alias みたいなもの
    +overlay_block

    // テクスチャ
    background-position: center
    background-repeat: no-repeat
    background-size: contain // 必ず駒の全体が表示されるようにする
    // filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5))
    // background-image: url("https://glyphwiki.org/glyph/u9f8d.svg") // 確認用(消すな)

  //////////////////////////////////////////////////////////////////////////////// サイズ

  // テーブル
  .BoardOuter
    .PieceObject
      width:  100%
      height: 100%
    .PieceTexture
      width:  var(--sp_board_piece_rate)   // こちらを100%にして
      height: var(--sp_board_piece_rate)  // こちらだけで調整してもいいかも

  // 駒台
  .Membership
    .PieceObject
      width:  var(--sp_stand_piece_w)
      height: var(--sp_stand_piece_h)
    .PieceTexture
      width:  var(--sp_stand_piece_rate)   // こちらを100%にして
      height: var(--sp_stand_piece_rate)  // こちらだけで調整してもいいかも

  +mobile
    &.is_mobile_style
      .Membership
        .PieceObject
          width:  38px
          height: 46px
        .PieceTexture
          width:  90%
          height: 90%

  // 駒箱
  .PieceBox
    .PieceObject
      width:  var(--sp_piece_box_piece_w)
      height: var(--sp_piece_box_piece_h)
    .PieceTexture
      width:  var(--sp_piece_box_piece_rate)
      height: var(--sp_piece_box_piece_rate)
</style>
