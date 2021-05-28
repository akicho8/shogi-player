<template lang="pug">
.PieceTap(v-if="count >= 1")
  // 駒を押せる部分
  .PieceTapBG.is-overlay
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
// .CursorObject // マウスの (x, y) を反映
//   .PieceTap.is_position_north
//     .PieceTexture
//       .PieceTextureSelf(駒の種類を定義するクラスたち)
//

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
  +defvar(sp_piece_sepia, 0)                // 駒色セピア度
  +defvar(sp_piece_blend, normal)           // 駒の mix-blend-mode の値

  ////////////////////////////////////////////////////////////////////////////////

  +defvar(sp_board_piece_rate, 90%)                         // 盤のセル内の駒占有率
  +defvar(sp_board_piece_position, center)                  // 駒を選択できる範囲内の駒の縦位置

  +defvar(sp_piece_blink_color0, hsla(0, 0%, 0%, 0.25))     // 最後に動かした駒の背景色1(点滅:0%)
  +defvar(sp_piece_blink_color1, hsla(0, 0%, 0%, 0.10))     // 最後に動かした駒の背景色2(点滅:100%)

  +defvar(sp_piece_origin_color, hsla(0, 0%, 0%, 0.10))     // 最後に動かした駒の元の位置の背景色
  +defvar(sp_piece_selectable_color, hsla(0, 0%, 0%, 0.1))  // 持ち上げれる駒の背景色

  +defvar(sp_lifted_origin_bg_color_desktop, hsla(0, 0%, 0%, 0.1))  // 持ち上げた駒の背景色(desktop)
  +defvar(sp_lifted_origin_opacity_desktop, 0.0)                    // 持ち上げた駒の元のセルの非透明度(desktop)
  // +defvar(sp_lifted_origin_bg_color_touch, #{$yellow})      // 持ち上げた駒の背景色(touch)
  // +defvar(sp_lifted_origin_opacity_touch, 0.5)              // 持ち上げた駒の元のセルの非透明度(touch)

  //////////////////////////////////////////////////////////////////////////////// >= tablet
  +defvar(sp_stand_piece_w, 47px)              // 駒台のセル(W)
  +defvar(sp_stand_piece_h, 50px)              // 駒台のセル(H)
  +defvar(sp_stand_piece_rate, 80%)            // 駒台のセル内の駒占有率

  +defvar(sp_piece_box_piece_w,    47px)       // 駒箱のセル(W)
  +defvar(sp_piece_box_piece_h,    50px)       // 駒箱のセル(H)
  +defvar(sp_piece_box_piece_rate, 80%)        // 駒箱のセル内の駒占有率

  // 共通
  .PieceTap
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
    +is_overlay_origin
    .PieceTapBG
      +is_overlay_block

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
    &.origin_place
      background-color: var(--sp_piece_origin_color)

  // &.is_device_touch
  //   .PieceTap
  //     // 持ち上げた元のセル
  //     &.lifted_from_p
  //       .PieceTapBG
  //         background-color: var(--sp_lifted_origin_bg_color_touch)
  //       .PieceTextureSelf
  //         opacity: var(--sp_lifted_origin_opacity_touch)  // 駒を持ち上げたので元の駒を含めて薄くする

  // is_device_desktop と is_device_touch で同じスタイルを使う
  .PieceTap
    // 持ち上げた元のセル
    &.lifted_from_p
      .PieceTapBG
        background-color: var(--sp_lifted_origin_bg_color_desktop)
      .PieceTextureSelf
        opacity: var(--sp_lifted_origin_opacity_desktop)  // 駒を持ち上げたので元の駒を含めて薄くする

  &.is_device_desktop
    .PieceTap
      // 選択が可能
      &.selectable_p
        &:hover
          // スマホでは手を離しても hover 状態を保持してしまう
          // そのため2手目に1手目の指し手の hover の色がつきっぱなしになってしまう
          // そうすると2手目より1手目の方が目立って違和感がある
          // なのでマウスが使える環境だけを対象にする
          // 選択できる駒だけ反応する
          // background プロパティをつかうと他の設定をリセットしてしまうので注意
          .PieceTapBG
            background-color: var(--sp_piece_selectable_color)
      // 持って上空を移動したときの下のセルの反応
      // touchではタップしたときにhoverが反応してfocusしたような状態になってしまう
      // なので desktop 以上のときだけにする
      &.piece_lifted_hover_reaction
        &:not(.lifted_from_p)
          &:hover
            .PieceTapBG
              background-color: var(--sp_piece_selectable_color)

  &.is_blink_off
    .PieceTap
      &.current
        background-color: var(--sp_piece_origin_color)
  &.is_blink_on
    .PieceTap
      &.current
        animation: blink_keyframes 0.5s ease-in-out infinite alternate
        @keyframes blink_keyframes
          0%
            background-color: var(--sp_piece_blink_color0)
          100%
            background-color: var(--sp_piece_blink_color1)

  ////////////////////////////////////////////////////////////////////////////////
  .PieceTexture
    +is_overlay_origin
    // 下に引く度合い
    // top: var(--piece_pull, 10%)
  .PieceTextureSelf // .PieceTexture:after の alias みたいなもの
    +is_overlay_block
    mix-blend-mode: var(--sp_piece_blend)

    background-position: var(--sp_board_piece_position)
    background-repeat: no-repeat
    background-size: contain      // 必ず駒の全体が表示されるようにする
    // filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5))
    // background-image: url("https://glyphwiki.org/glyph/u9f8d.svg") // 確認用(消すな)

  //////////////////////////////////////////////////////////////////////////////// カーソル
  .CursorObject
    position: fixed
    z-index: $cursor_object_z     // bulma のボタンの z-index が 2 なのでそれより上ならなんでも良い。10だとsidebarに負ける
    pointer-events: none          // 一切のイベントに反応させない
    .PieceTap
      // この要素の半分を左上に移動する
      position: relative
      top: -50%
      left: -50%

  // タッチデバイスでは消す場合
  // &.is_device_touch
  //   .CursorObject
  //     display: none // スマホとタブレットでは表示しない

  //////////////////////////////////////////////////////////////////////////////// 成り不成り選択中のセル背景色

  &.is_device_desktop
    .PromoteSelectModal
      .PieceTap
        &:hover
          cursor: pointer
          background-color: var(--sp_promote_select_modal_hover_color)

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

  // 持ち上げ駒
  // カーソルは駒台の駒と同じ大きさにしておくが盤上の駒を持ち上げたときに小さくなるので PieceTexture は 100% 固定にする
  .PromoteSelectModal
    .PieceTap
      width:  var(--sp_stand_piece_w)
      height: var(--sp_stand_piece_h)
    .PieceTexture
      width:  80%
      height: 80%
</style>
