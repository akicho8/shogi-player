# 使い方

## インストール

<<< @/docs/.vuepress/public/examples/fragment.html
<LinkToExample name="fragment" />

上の2行だけのHTMLを作るか既存のサイトにコピペして動けば次へ

<!-- ::: warning 注意 -->
<!-- `<shogi-player-wc/>` とすると複数配置できなくなる罠がある (なぜかはわからない) -->
<!-- 冗長だが `<shogi-player-wc></shogi-player-wc>` が正しい -->
<!-- ::: -->

## 文字コードやスマホを考慮する

<<< @/docs/.vuepress/public/examples/simple.html{3-4}
<LinkToExample name="simple" />

  * 棋譜を正しく読むため UTF-8 を明示する
  * 反応遅延や意図しない画面ズームを防ぐため viewport を指定する

## 棋譜再生 ##

<<< @/docs/.vuepress/public/examples/view.html{9-11}
<LinkToExample name="view" />

<!-- * **sp_body**: 棋譜を指定する -->
<!-- * **sp_turn**: 局面を指定する -->
<!-- * **sp_overlay_nav**: 盤面タップで局面を動かす -->

## コントローラー類を表示する ##

<<< @/docs/.vuepress/public/examples/view_with_controller.html{10-11}
<LinkToExample name="view_with_controller" />

<!-- <ShogiPlayerWcWrapper -->
<!--   class="is-small" -->
<!--   sp_controller="true" -->
<!--   sp_body="position startpos moves 7g7f 3c3d 8h2b+ 3a2b" -->
<!-- /> -->

## スタイル変更 ##

<!-- <CustomizeExample2 name="style" /> -->
<<< @/docs/.vuepress/public/examples/style.html{7-9}
<LinkToExample name="style" />

CSS変数は普通に定義しても Shadow DOM 内には届かない
用意した `root` に対して適用する

<!-- <ShogiPlayerWcWrapper class="b441958504b7c7af3ef62a47fafe8d21 is-xsmall" /> -->
<!-- <style lang="stylus"> -->
<!-- .ShogiPlayerWcWrapper.b441958504b7c7af3ef62a47fafe8d21 -->
<!--   shogi-player-wc::part(root) -->
<!--     --sp_board_color: lightskyblue -->
<!-- </style> -->

## 直接スタイル変更 ##

<!-- <CustomizeExample2 name="sp_pass_style" /> -->
<<< @/docs/.vuepress/public/examples/sp_pass_style.html{9}
<LinkToExample name="sp_pass_style" />

引数の `sp_pass_style` に書いても変更できるようにしてある
これはタグの style を直接書くのに似ていて分けて書いたときより詳細度が高い
本来機能とスタイルは分けるべきとされているが目的駆動と考えればまとめる方が合理的なので実験的に入れてある

## イベント受信 ##

<!-- <CustomizeExample2 name="event" /> -->
<<< @/docs/.vuepress/public/examples/event.html{8-11}
<LinkToExample name="event" />

このあたりを HTML でがんばるなら [Lit](https://lit.dev/) などと組み合わせた方がいいかもしれない 

<!-- ../.vuepress/public/examples/event.html -->
<!-- <a href="/examples/event.html" target="_blank">上のサンプルを単体で開く</a> -->

<!-- <ShogiPlayerWcWrapperEventTest /> -->

<!-- Vue.js が使える環境であれば直接ひっかける -->
<!--  -->
<!-- ```html -->
<!-- <shogi-player-wc -->
<!--   sp_mode="play" -->
<!--   @ev_play_mode_move="e => {}" -->
<!-- /> -->
<!-- ``` -->

## レイアウト

<!-- <CustomizeExample2 name="layout" /> -->
<<< @/docs/.vuepress/public/examples/layout.html{7-14,21-25}
<LinkToExample name="layout" />

明確なサイズを持っていないためデスクトップでは大きくなりすぎてしまう。そこで中央配置した上で、最大横幅を指定し、それ以下であれば画面幅に張り付くようにしたのが上の例になる。

## 命令型APIの呼び方

<<< @/docs/.vuepress/public/examples/api.html{7-11}
<LinkToExample name="api" />

## CDN

* JSDelivr:
  * https://cdn.jsdelivr.net/npm/shogi-player@0.0.391/dist/wc/production/shogi-player-wc.min.js
  * https://cdn.jsdelivr.net/npm/shogi-player@0.0.391/dist/wc/development/shogi-player-wc.min.js
* UNPKG:
  * https://unpkg.com/shogi-player@0.0.391/dist/wc/production/shogi-player-wc.min.js
  * https://unpkg.com/shogi-player@0.0.391/dist/wc/development/shogi-player-wc.min.js

::: tip
本当は https://unpkg.com/shogi-player@0.0.391 でいいはずだけど、画像パスがずれて駒が表示されない問題があるため js までの正確なパスでアクセスしないといけない
:::

## バージョンを固定する

事故らないように本番ではバージョンを固定する

`@x.x.x` でバージョンを固定できる
https://unpkg.com/shogi-player@0.0.391/dist/wc/production/shogi-player-wc.min.js

最新版バージョン→[![npm version](https://badge.fury.io/js/shogi-player.svg)](https://badge.fury.io/js/shogi-player)

## トラブルシューティング

### Invalid regular expression

```
Uncaught SyntaxError: Invalid regular expression: /.../: Range out of order in character class
    at new RegExp (<anonymous>)
    at ae (xregexp.js:707:18)
```

`<head>` 内に `<meta charset="UTF-8">` を追加する

ローカルに置いた js を読み込んだときだけ上のエラーになる。CDN 経由の場合はたまたまエラーにならない。理由はレスポンスヘッダの `content-type` に `charset=utf-8` が含まれているからと思われる

### スマホでタップの反応が遅い

`<head>` 内に `<meta name="viewport" content="width=device-width, initial-scale=1.0">` を追加する

### スマホで画面ズームしてしまう

同上
