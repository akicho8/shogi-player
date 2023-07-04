# 使い方

## インストール

<<< @/docs/.vuepress/public/examples/fragment.html
<LinkToExample name="fragment" />

上の2行だけのHTMLを作るか、既存のサイトにコピペして動けば次へ

## 文字コードやスマホを考慮する (重要)

<<< @/docs/.vuepress/public/examples/simple.html{3-4}
<LinkToExample name="simple" />

* 棋譜を正しく読むため UTF-8 を明示する
* 反応遅延や意図しない画面ズームを防ぐため viewport を指定する

## 棋譜再生
  
### SFEN

<<< @/docs/.vuepress/public/examples/view.html{8-11}
<LinkToExample name="view" />

最後の局面から表示させたいなら [sp_turn](/reference/props/#sp-turn) を `-1` にする

### KIF

<<< @/docs/.vuepress/public/examples/view_kif.html{9-14}
<LinkToExample name="view_kif" />

SFEN と KIF (BOD) に対応している
どちらも [sp_body](/reference/props/#sp-body) に指定する (自動判別する)

## スタイル変更 ##

<!-- <IframeWrap name="style" /> -->
<<< @/docs/.vuepress/public/examples/style.html{7-9}
<LinkToExample name="style" />

CSS変数は普通に定義しても Shadow DOM 内には届かない
用意した `root` に対して適用する

<!-- <ShogiPlayerWcWrapper class="b441958504b7c7af3ef62a47fafe8d21 is-xsmall" /> -->
<!-- <style lang="stylus"> -->
<!-- .ShogiPlayerWcWrapper.b441958504b7c7af3ef62a47fafe8d21 -->
<!--   shogi-player-wc::part(root) -->
<!--     --sp_board_color: LightSkyBlue -->
<!-- </style> -->

## 直接スタイル変更 ##

<!-- <IframeWrap name="sp_pass_style" /> -->
<<< @/docs/.vuepress/public/examples/sp_pass_style.html{9}
<LinkToExample name="sp_pass_style" />

引数の [sp_pass_style](/reference/props/#sp-pass-style) に書いても変更できるようにしてある
これはタグの style を直接書くのに似ていて分けて書いたときより詳細度が高い
古の技術駆動では機能とスタイルは分けるべきとされているが目的駆動として見ればまとめて書く方が理に適っている

## イベント受信 ##

<!-- <IframeWrap name="event" /> -->
<<< @/docs/.vuepress/public/examples/event.html{7-10}
<LinkToExample name="event" />

このように `addEventListener` を使う形になってあまり綺麗には書けない
このあたりが負担になるなら [Lit](https://lit.dev/) などと組み合わせた方がいいかもしれない 

## レイアウト例

<!-- <IframeWrap name="layout" /> -->
<<< @/docs/.vuepress/public/examples/layout.html{7-13}
<LinkToExample name="layout" />

明確なサイズを持っていないためデスクトップでは大きくなりすぎてしまう。そこで中央配置した上で、最大横幅を指定し、それ以下であれば縮小するようにしたのが上の例になる。

## 命令型APIの呼び方

<<< @/docs/.vuepress/public/examples/api.html{7-11}
<LinkToExample name="api" />

基本的に使うことはないが特別なことをしたいときは上のようにして呼ぶ
隔離したはずの世界を自由に触れてしまうこの仕組みは数年後にはできなくなっているかもしれない

## CDN

* JSDelivr: https://cdn.jsdelivr.net/npm/shogi-player@1.1.15
* UNPKG:    https://unpkg.com/shogi-player@1.1.15

どちらも production 版へのショートカットになっている

### CDNの正確なURL

* JSDelivr
  * https://cdn.jsdelivr.net/npm/shogi-player@1.1.15/dist/wc/production/shogi-player-wc.min.js
  * https://cdn.jsdelivr.net/npm/shogi-player@1.1.15/dist/wc/development/shogi-player-wc.min.js
* UNPKG
  * https://unpkg.com/shogi-player@1.1.15/dist/wc/production/shogi-player-wc.min.js
  * https://unpkg.com/shogi-player@1.1.15/dist/wc/development/shogi-player-wc.min.js

production と development 版の2つがあり development 版を使うときはフルパスで書く

## バージョンを固定する

試すときには次のように書いてもいいが

* https://cdn.jsdelivr.net/npm/shogi-player
* https://cdn.jsdelivr.net/npm/shogi-player@latest

本番では `@x.x.x` をつけてバージョンを固定した方がよい

* https://unpkg.com/shogi-player@1.1.15

最新バージョン → [![npm version](https://badge.fury.io/js/shogi-player.svg)](https://badge.fury.io/js/shogi-player)

## トラブルシューティング

### Invalid regular expression

```
Uncaught SyntaxError: Invalid regular expression: /.../: Range out of order in character class
    at new RegExp (<anonymous>)
    at ae (xregexp.js:707:18)
```

`<head>` 内に `<meta charset="UTF-8">` を追加する

ローカルに置いた js を読み込んだときだけ上のエラーになる。CDN 経由の場合はたまたまエラーにならない。理由はレスポンスヘッダの `content-type` に `charset=utf-8` が含まれているからと思われる。

### スマホでタップの反応が遅い

`<head>` 内に `<meta name="viewport" content="width=device-width, initial-scale=1.0">` を追加する

### スマホで画面ズームしてしまう

同上
