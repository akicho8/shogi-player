---
sidebar: auto
---

# Web Components

## 使い方

1. <https://shogi-player.netlify.app/dist/shogi-player-wc.min.js> を読み込む
1. `<shogi-player-wc/>` で表示する

```html
<!DOCTYPE html>
<head>
  <meta charset="UTF-8">
  <script src="https://shogi-player.netlify.app/dist/shogi-player-wc.min.js"></script>
</head>
<body>
  <shogi-player-wc/>
</body>
</html>
```

<a href="/examples/1.html" target="_blank">単体HTMLで開く</a>

<shogi-player-wc/>

## 引数に v-bind は使えないがなんとかなる ##

```html
<ShogiPlayer :sp_turn="5" />
```

```html
<shogi-player-wc sp_turn="5" />
```

## スタイルを外部CSSで変更するには？ ##

Web Components 内の `sp_css_variables` に対してCSS変数をオーバーライドする

```css
shogi-player-wc::part(sp_css_variables) {
  --sp_board_color: lightskyblue;
}
```

<SpContainer class="b441958504b7c7af3ef62a47fafe8d21 is-small" />
<style lang="stylus">
.SpContainer.b441958504b7c7af3ef62a47fafe8d21
  shogi-player-wc::part(sp_css_variables)
    --sp_board_color: lightskyblue
</style>
