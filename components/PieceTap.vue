<template lang="pug">
.PieceTap(v-if="count >= 1")
  // 駒を押せる部分
  .PieceTexture
    // PieceTexture の背景に画像を設定すると影が PieceCount にまで適用されるため個別にしている
    .PieceTextureSelf(:class="piece_texture_class")
    // 駒テクスチャの大きさに依存させたいので中に PieceTexture のなかに入れている
    PieceCount(:count="count")
</template>

<script>
import _ from "lodash"
import { support } from "./support.js"
import PieceCount from "./PieceCount.vue"

export default {
  name: "PieceTap",
  mixins: [support],
  components: {
    PieceCount,
  },
  props: {
    piece_texture_class: { required: true              },
    count:               { required: false, default: 1 },
  },
}
</script>

<style lang="sass">
@import "./support.sass"
//
// .CursorObject                         // マウスの (x, y) を反映
//   .PieceTap.CursorObjectFlip     // 反転するときはここ
//     .PieceTexture
//       .PieceTextureSelf(駒の種類を定義するクラスたち)
//

// 自分でもよくわからなくなっている
// 選択できる駒に指定する
=PieceTapSelectable
  // 選択が可能
  &.selectable_p
    &:hover
      // スマホでは手を離しても hover 状態を保持してしまう
      // そのため2手目に1手目の指し手の hover の色がつきっぱなしになってしまう
      // そうすると手目より1手目の方が目立って違和感がある
      // なのでマウスが使える環境だけを対象にする
      +desktop
        // 選択できる駒だけ反応する
        // background プロパティをつかうと他の設定をリセットしてしまうので注意
        background-color: $sp_selectable_bg_color

  // 持ち上げたとき
  &.holding_p
    +desktop
      opacity: 0.4  // 駒を持ち上げたので元の駒を薄くする
    +touch
      background-color: $sp_holding_bg_color_if_touch
      // さらに駒を持ったときは色を濃くする
      &:hover
        background-color: $sp_holding_bg_color_if_touch

  // なんだこれ？？？
  &.hoverable_p
    &:hover
      background-color: $sp_selectable_bg_color

.ShogiPlayerGround
  // 盤背景と同じ構成
  +defvar(sp_piece_blur, 0)                 // 駒ぼかし
  +defvar(sp_piece_grayscale, 0)            // 駒グレースケール
  +defvar(sp_piece_contrast, 1.0)           // 駒コントラスト
  +defvar(sp_piece_invert, 0)               // 駒色反転
  +defvar(sp_piece_opacity, 1.0)            // 駒不透明度
  +defvar(sp_piece_hue, 1.0)                // 駒色相
  +defvar(sp_piece_saturate, 1.0)           // 駒彩度
  +defvar(sp_piece_brightness, 1.0)         // 駒輝度
  +defvar(sp_piece_blend, normal)           // 駒の mix-blend-mode の値

  ////////////////////////////////////////////////////////////////////////////////

  +defvar(sp_board_piece_rate, 90%)            // 盤のセル内の駒占有率
  +defvar(sp_board_piece_position, center)     // 駒を選択できる範囲内の駒の縦位置

  //////////////////////////////////////////////////////////////////////////////// >= tablet
  +defvar(sp_stand_piece_w, 47px)              // 駒台のセル(W)
  +defvar(sp_stand_piece_h, 50px)              // 駒台のセル(H)
  +defvar(sp_stand_piece_rate, 80%)            // 駒台のセル内の駒占有率

  +defvar(sp_piece_box_piece_w, 38px)          // 駒箱のセル(W)
  +defvar(sp_piece_box_piece_h, 46px)          // 駒箱のセル(H)
  +defvar(sp_piece_box_piece_rate, 90%)        // 駒箱のセル内の駒占有率

  //////////////////////////////////////////////////////////////////////////////// mobile only
  +defvar(sp_stand_piece_w_mobile, 38px)       // 駒台のセル(W) ※モバイル時
  +defvar(sp_stand_piece_h_mobile, 56px)       // 駒台のセル(H) ※モバイル時
  +defvar(sp_stand_piece_rate_mobile, 90%)     // 駒台のセル内の駒占有率 ※モバイル時

  +defvar(sp_piece_box_piece_w_mobile, 38px)   // 駒箱のセル(W) ※モバイル時
  +defvar(sp_piece_box_piece_h_mobile, 46px)   // 駒箱のセル(H) ※モバイル時
  +defvar(sp_piece_box_piece_rate_mobile, 90%) // 駒箱のセル内の駒占有率 ※モバイル時

  // 共通
  .PieceTap
    // cursor: default // テキスト選択「I」ではなく矢印カーソルとする
    &.selectable_p
      &:hover
        cursor: pointer

  // 確認用
  &.is_layer_on
    .PieceTap
      +is_layer_border
    .PieceTexture
      +is_layer_border($danger)

  .PieceTap
    // セル内の PieceTexture の配置
    // ここで縦位置を調整しようとすると先後別に分けないといけない
    // 一方、PieceTexture は共通の処理でよい
    // なので PieceTexture の方で縦位置を(必要であれば)調整する
    // まぁあまり細かいことにはこだわらず常に中心配置でいいと思う
    display: flex
    justify-content: center
    align-items: center  // 先手の下を揃えて配置したいときは flex-end にする

  .PieceTap
    +PieceTapSelectable
    &.origin_place
      background-color: $sp_move_bg_color

  &.is_blink_off
    .PieceTap
      &.current
        background-color: $sp_move_bg_color
  &.is_blink_on
    .PieceTap
      &.current
        animation: blink_keyframes 0.5s ease-in-out infinite alternate
        @keyframes blink_keyframes
          0%
            background-color: $sp_current_bg_blink_color0
          100%
            background-color: $sp_current_bg_blink_color1

  ////////////////////////////////////////////////////////////////////////////////
  .PieceTexture
    +is_overlay_origin
    // 下に引く度合い
    // top: var(--piece_pull, 0%)
  .PieceTextureSelf // .PieceTexture:after の alias みたいなもの
    +is_overlay_block
    mix-blend-mode: var(--sp_piece_blend)

    background-position: var(--sp_board_piece_position)
    background-repeat: no-repeat
    background-size: contain      // 必ず駒の全体が表示されるようにする
    // filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5))
    // background-image: url("https://glyphwiki.org/glyph/u9f8d.svg") // 確認用(消すな)

  ////////////////////////////////////////////////////////////////////////////////
  .CursorObject
    position: fixed
    z-index: 256                  // bulma のボタンの z-index が 2 なのでそれより上ならなんでも良い。10だとsidebarに負ける
    pointer-events: none          // 一切のイベントに反応させない

    .PieceTap
      // この要素の半分を左上に移動する
      position: relative
      top: -50%
      left: -50%

    // スマホとタブレットでは表示しない
    +touch
      display: none

  // 盤を反転した状態で持ったカーソル上にある駒を反転させる用
  .CursorObjectFlip
    @extend %is_flip

  //////////////////////////////////////////////////////////////////////////////// サイズ (PC)

  // 盤面
  .BoardWood
    .PieceTap
      width:  100%              // 外側の TD に合わせる
      height: 100%
    .PieceTexture
      width:  var(--sp_board_piece_rate)
      height: var(--sp_board_piece_rate)

  // 駒台
  .Membership
    .PieceTap
      width:  var(--sp_stand_piece_w)
      height: var(--sp_stand_piece_h)
    .PieceTexture
      width:  var(--sp_stand_piece_rate)
      height: var(--sp_stand_piece_rate)

  // 駒箱
  .PieceBox
    .PieceTap
      width:  var(--sp_piece_box_piece_w)
      height: var(--sp_piece_box_piece_h)
    .PieceTexture
      width:  var(--sp_piece_box_piece_rate)
      height: var(--sp_piece_box_piece_rate)

  // 持ち上げ駒
  // カーソルは駒台の駒と同じ大きさにしておくが盤上の駒を持ち上げたときに小さくなるので PieceTexture は 100% 固定にする
  .CursorObject
    width:  var(--sp_stand_piece_w)
    height: var(--sp_stand_piece_h)
    .PieceTap
      width:  100%     // 外側の大きさに合わせる
      height: 100%
    .PieceTexture
      width:  100%     // 縮小させない
      height: 100%

  //////////////////////////////////////////////////////////////////////////////// サイズ (mobile)
  +mobile
    &.is_mobile_style_on
      .BoardWood
        .PieceTap
          // 100% なので外側の TD の大きさになる
      .Membership
        .PieceTap
          width:  var(--sp_stand_piece_w_mobile)
          height: var(--sp_stand_piece_h_mobile)
        .PieceTexture
          width:  var(--sp_stand_piece_rate_mobile)
          height: var(--sp_stand_piece_rate_mobile)
      .PieceBox
        .PieceTap
          width:  var(--sp_piece_box_piece_w_mobile)
          height: var(--sp_piece_box_piece_h_mobile)
        .PieceTexture
          width:  var(--sp_piece_box_piece_rate_mobile)
          height: var(--sp_piece_box_piece_rate_mobile)
      .CursorObject
        width:  var(--sp_stand_piece_w_mobile)
        height: var(--sp_stand_piece_h_mobile)
</style>
