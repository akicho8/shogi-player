---
sidebar: auto
---

# Web Components

## 導入手順

1. <https://shogi-player.netlify.app/dist/shogi-player-wc.min.js> を読み込む
1. 表示したい場所で `<shogi-player-wc/>` タグを入れる

```html
<!DOCTYPE html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://shogi-player.netlify.app/dist/shogi-player-wc.min.js"></script>
</head>
<body>
  <shogi-player-wc/>
</body>
</html>
```
<a href="/examples/1.html" target="_blank">上のサンプルをHTML単体で開く</a>

::: tip
* UTF-8 を明示する: 棋譜を正しく読むために必要になる
* スマホを考慮する: 将棋盤をタップしたときの反応遅延や意図しない画面ズームを防ぐために適切な viewport の指定をする
:::

<!-- <shogi-player-wc/> -->

## 棋譜再生 ##

```html
<shogi-player-wc
  sp_run_mode="view_mode"
  sp_overlay_nav="is_overlay_nav_on"
  sp_body="position startpos moves 7g7f 3c3d 8h2b+ 3a2b"
/>
```

<ShogiPlayer2
  class="is-small"
  sp_run_mode="view_mode"
  sp_overlay_nav="is_overlay_nav_on"
  sp_body="position startpos moves 7g7f 3c3d 8h2b+ 3a2b"
/>

::: tip
* sp_run_mode: 再生モードにする
* sp_overlay_nav: 盤面タップで局面を動かす機能を有効にする
* sp_body: KIF・BOD・SFEN 形式のコンテンツを指定する
:::

## スタイル変更 ##

CSS変数は普通に定義しても Shadow DOM 内には届かない
用意してある `sp_css_variables` に対して適用する

```css
shogi-player-wc::part(sp_css_variables) {
  --sp_board_color: lightskyblue;
}
```

<ShogiPlayer2 class="b441958504b7c7af3ef62a47fafe8d21 is-small" />
<style lang="stylus">
.ShogiPlayer2.b441958504b7c7af3ef62a47fafe8d21
  shogi-player-wc::part(sp_css_variables)
    --sp_board_color: lightskyblue
</style>


## イベント受信 ##

<ShogiPlayer2
  class="d5f36983505e66de8dc8ece28a7da9cf is-small"
  sp_slider="is_slider_on"
  sp_body="position startpos moves 7g7f 3c3d 8h2b+ 3a2b"
/>

<style lang="stylus">
.ShogiPlayer2.d5f36983505e66de8dc8ece28a7da9cf
  shogi-player-wc::part(sp_css_variables)
    --sp_board_color: red
</style>

::: demo
<div @click="onClick">Click me!</div>

<script>
export default {
  methods: {
    onClick: () => { window.alert(1) },
  },
}
</script>
:::
