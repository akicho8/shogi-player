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
    // box2 のサイズ%を最大するため必要
    width: 100%
    height: 100%

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

  .PieceTexture
    width: 90%                  // こちらを100%にして
    height: 90%                 // こちらだけで調整してもいいかも

    // 下に引く度合い
    position: relative
    top: var(--piece_pull, 0%)

  .PieceTextureSelf // .PieceTexture:after の alias みたいなもの
    +overlay_block
    // z-index: -1

    // テクスチャ
    background-position: center
    background-repeat: no-repeat
    background-size: contain // 必ず駒の全体が表示されるようにする
    // filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5))
    // background-image: url("https://glyphwiki.org/glyph/u9f8d.svg") // 確認用(消すな)

  .Membership
    .PieceObject
      +mobile
        width: 38px
        height: 46px  // 縦長にすることでタップ範囲を広げつつ駒数との隙間を作れる
</style>
