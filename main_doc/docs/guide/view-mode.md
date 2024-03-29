# 再生モード

## 特徴

  * 棋譜再生時に用いるモード

## 必須パラメータ

* [sp_body](/reference/props/#sp-body): 棋譜

## 推奨オプション

* [sp_turn](/reference/props/#sp-turn): 表示する局面(手数)を指定する
* [sp_controller](/reference/props/#sp-controller): 盤の下にボタン類を表示する
* [sp_slider](/reference/props/#sp-slider): 盤の下にスライダーを表示する

## おまけオプション

* [sp_viewpoint](/reference/props/#sp-viewpoint): 視点
* [sp_overlay_nav](/reference/props/#sp-overlay-nav): 盤面の左右で局面を動かす(ただし駒を移動できなくなる)
* [sp_turn_show](/reference/props/#sp-turn-show): 盤面の上に手数を表示する(邪魔)

## 補足

* スライダーにフォーカスがある状態だと左右キーが効く
* スライダーは fn + ←→ キーで最初と最後に移動する

※どちらもブラウザの標準機能

## Playground

<ShogiPlayerWcWrapper sp_mode="view" sp_controller sp_slider sp_turn_show sp_body="position sfen lnsgkgsnl/1r7/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1 moves 7a6b 7g7f 5c5d 2g2f 5a4b 2f2e 4b3b 2e2d 2c2d 2h2d 6b5c 2d2f P*2c 3i4h 8c8d 7i7h 8d8e 8h7g 4a4b 5g5f 6a5b 6g6f 7c7d 7g6h 5c6d 7h6g 5b5c 6i7h 9c9d 9g9f 5c4d 6f6e 6d7c 4h5g 8b6b 8i7g 6b8b 5g6f 1c1d 1g1f 9d9e 9f9e 8e8f 8g8f 9a9e P*9g 9e9g 9i9g P*9f 7g8e 9f9g+ 8e7c+ 8a7c P*9d 8b9b S*8c 9b9a 2f2h P*8g 6h4f 5d5e 6f5e 4d4e 4f5g 7c6e 5g8d N*3e L*2g 3e2g+ 2h2g 8g8h+ 7h6h 9g8g 5e6f 8h7h 6g7h 8g7h 6h7h L*6d P*6g 4e5f P*5h P*5g 2g2f L*5c 6f6e 6d6e 5i6h 5g5h+ 4i5h P*5g 5h4h S*8i N*7i P*8g 7h8g S*7h N*6f 9a8a 9d9c+ 7h8g+ 7i8g 8a8c 9c8c G*7h 6h5i S*5h" />

## 例1. 自動再生する

<<< @/docs/.vuepress/public/examples/simple_auto_play.html{8-13}
<CustomizeExample name="simple_auto_play" :width="250" :height="320" />

* 駒を動かすには棋譜はそのままで [sp_turn](/reference/props/#sp-turn) を進める
  * 指定の駒をどこに動かすかを一つずつ指定するのではない
* 局面(手数)を変更するには [api_turn_add](/reference/api/#api-turn-add) を使う方法もある

