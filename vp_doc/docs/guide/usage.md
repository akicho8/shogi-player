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

* **sp_body**: 棋譜を指定する
* **sp_turn**: 局面を指定する
* **sp_overlay_nav**: 盤面タップで局面を動かす

## コントローラーを表示する ##

<<< @/docs/.vuepress/public/examples/mdi.html{10}
<LinkToExample name="mdi" />

1. `sp_controller="true"` を指定する

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
用意した `spwc_style_scope` に対して適用する

<!-- <ShogiPlayerWcWrapper class="b441958504b7c7af3ef62a47fafe8d21 is-xsmall" /> -->
<!-- <style lang="stylus"> -->
<!-- .ShogiPlayerWcWrapper.b441958504b7c7af3ef62a47fafe8d21 -->
<!--   shogi-player-wc::part(spwc_style_scope) -->
<!--     --sp_board_color: lightskyblue -->
<!-- </style> -->

## スタイル変更 (実験的) ##

<!-- <CustomizeExample2 name="spwc_style_hash" /> -->
<<< @/docs/.vuepress/public/examples/spwc_style_hash.html{8}
<LinkToExample name="spwc_style_hash" />

引数の `spwc_style_hash` に書いても変更できるようにしてある
これはタグの style を直接書くのに似ていて分けて書いたときより詳細度が高い
本来機能とスタイルは分けるべきとされているが目的駆動と考えればまとめる方が合理的なので実験的に入れてある

## イベント受信 ##

<!-- <CustomizeExample2 name="event" /> -->
<<< @/docs/.vuepress/public/examples/event.html{8-12}
<LinkToExample name="event" />

指し手の情報を表示する例

<!-- ../.vuepress/public/examples/event.html -->
<!-- <a href="/examples/event.html" target="_blank">上のサンプルを単体で開く</a> -->

<!-- <ShogiPlayerWcWrapperEventTest /> -->

<!-- Vue.js が使える環境であれば直接ひっかける -->
<!--  -->
<!-- ```html -->
<!-- <shogi-player-wc -->
<!--   sp_mode="play" -->
<!--   @ev_play_mode_next="e => {}" -->
<!-- /> -->
<!-- ``` -->

## レイアウト

<!-- <CustomizeExample2 name="layout" /> -->
<<< @/docs/.vuepress/public/examples/layout.html{7-17,21-25}
<LinkToExample name="layout" />

`shogi-player-wc` は明確なサイズを持っていないためデスクトップでは大きくなりすぎてしまう。そこで中央配置した上で、最大横幅を指定し、それ以下であれば画面幅に張り付くようにしたのが上の例になる。

方法がたくさんありすぎて何が正解なのかわからないがとりあえず `shogi-player-wc` は横100%とする。そしてもう触らない。で、外側で大きさを調整する。さらにその外側で中央に配置する。これが良さそう。

::: tip
shogi-player-wc タグの `display` の初期値は **`inline`** のためサイズが効かない
サイズを効かせるためには `block` や `inline-block` に変更する
:::

## APIの呼び方

<<< @/docs/.vuepress/public/examples/api.html{8-12}
<LinkToExample name="api" />

## CDN

* production:
  * JSDelivr: https://cdn.jsdelivr.net/npm/shogi-player@0.0.378/dist/shogi-player-wc.min.js
  * UNPKG: https://unpkg.com/shogi-player@0.0.378/dist/shogi-player-wc.min.js
* development:
  * JSDelivr: https://cdn.jsdelivr.net/npm/shogi-player@0.0.378/dist/development/shogi-player-wc.min.js
  * UNPKG: https://unpkg.com/shogi-player@0.0.378/dist/development/shogi-player-wc.min.js

::: tip
本当は https://unpkg.com/shogi-player@0.0.378 でいいはずだけど、画像パスがずれて駒が表示されない問題があるため js までの正確なパスでアクセスしないといけない
:::

## バージョンを固定する

事故らないように本番ではバージョンを固定する

`@x.x.x` でバージョンを固定できる
https://unpkg.com/shogi-player@0.0.378/dist/shogi-player-wc.min.js

最新版バージョンは
https://unpkg.com/shogi-player/
から確認できる

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
