---
sidebar: auto
---

# Web Components

## 始める

```html
<script src="https://shogi-player.netlify.app/dist/shogi-player-wc.min.js"></script>
<shogi-player-wc />
```
<!-- ../.vuepress/public/examples/fragment.html -->
<a href="/examples/fragment.html" target="_blank">上のサンプルをHTML単体で開く</a>

上の2行だけのHTMLを作るか既存のサイトにコピペする

## 文字コードやスマホを考慮する

```html
<!DOCTYPE html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://shogi-player.netlify.app/dist/shogi-player-wc.min.js"></script>
</head>
<body>
  <shogi-player-wc />
</body>
</html>
```

<!-- ../.vuepress/public/examples/simple.html -->
<a href="/examples/simple.html" target="_blank">上のサンプルをHTML単体で開く</a>

  * **UTF-8 を明示する**: 棋譜を正しく読むために必要になる
  * **スマホを考慮する**: 将棋盤をタップしたときの反応遅延や意図しない画面ズームを防ぐために適切な viewport の指定をする

## 棋譜再生 ##

盤面タップで局面を進める例

```html
<shogi-player-wc
  sp_overlay_nav="is_overlay_nav_on"
  sp_body="position startpos moves 7g7f 3c3d 8h2b+ 3a2b"
  sp_turn="0"
  />
```

<ShogiPlayerWcWrapper
  class="is-small"
  sp_overlay_nav="is_overlay_nav_on"
  sp_body="position startpos moves 7g7f 3c3d 8h2b+ 3a2b"
  sp_turn="0"
/>

* **sp_overlay_nav**: 盤面タップで局面を動かす機能を有効にする
* **sp_body**: KIF・BOD・SFEN 形式のコンテンツを指定する
* **sp_turn**: 局面(手数)を指定する

## コントローラーを表示する ##

1. Material Design Icons の CSS を読み込む
1. `sp_controller="is_controller_on"` を指定する

```html{5,10}
<!DOCTYPE html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css">
  <script src="https://shogi-player.netlify.app/dist/shogi-player-wc.min.js"></script>
</head>
<body>
  <shogi-player-wc
    sp_controller="is_controller_on"
    sp_body="position startpos moves 7g7f 3c3d 8h2b+ 3a2b"
    />
</body>
</html>
```

<!-- ../.vuepress/public/examples/mdi.html -->
<a href="/examples/mdi.html" target="_blank">上のサンプルを単体で開く</a>

<ShogiPlayerWcWrapper
  class="is-small"
  sp_controller="is_controller_on"
  sp_body="position startpos moves 7g7f 3c3d 8h2b+ 3a2b"
/>

::: warning 謎
Material Design Icons の CSS は Web Components 内ですでに読み込んでいる。にもかかわらず外でも読み込まないとコントローラーの矢印アイコンが正しく表示されない。なぜかはわからない。
:::

## スタイル変更 ##

CSS変数は普通に定義しても Shadow DOM 内には届かない
用意した `spwc_style_scope` に対して適用する

```css
shogi-player-wc::part(spwc_style_scope) {
  --sp_board_color: lightskyblue;
}
```

<ShogiPlayerWcWrapper class="b441958504b7c7af3ef62a47fafe8d21 is-small" />
<style lang="stylus">
.ShogiPlayerWcWrapper.b441958504b7c7af3ef62a47fafe8d21
  shogi-player-wc::part(spwc_style_scope)
    --sp_board_color: lightskyblue
</style>

## スタイル変更 (実験的) ##

Web Components の引数の spwc_style_object にハッシュで書いても変更できる (ようにした)
これはタグの style を直接書くのに似ていて通常の方法より適用優先度が高い
本来機能とスタイルは分けるべきとされているが目的駆動と考えれば一箇所で一括で設定する方が合理的であるため実験的に入れてある

```html
<shogi-player-wc spwc_style_object="{'--sp_board_color': 'lightskyblue'}" />
```

<ShogiPlayerWcWrapper spwc_style_object="{'--sp_board_color': 'lightskyblue'}" class="is-small" />

## イベント受信 ##

指し手の情報を表示する例

```html
<!DOCTYPE html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://shogi-player.netlify.app/dist/shogi-player-wc.min.js"></script>
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const el = document.querySelector("shogi-player-wc");
      el.addEventListener("update:play_mode_advanced_full_moves_sfen", e => {
        alert(e.detail[0].last_move_info.to_kif)
      })
    })
  </script>
</head>
<body>
  <shogi-player-wc sp_run_mode="play_mode" />
</body>
</html>
```

<!-- ../.vuepress/public/examples/event.html -->
<a href="/examples/event.html" target="_blank">上のサンプルを単体で開く</a>

<ShogiPlayerWcWrapperEventTest />

Vue.js が使える環境であれば直接ひっかける

```html
<shogi-player-wc
  sp_run_mode="play_mode"
  @update:play_mode_advanced_full_moves_sfen="e => {}"
/>
```

::: warning データ欠損？
 `detail[0]` に含む情報が一部欠けている
インスタンスを Plain Object 化しないまま Vue.js のコンテキストから出たのが原因と思われる
:::

## レイアウト

スマホを考慮した中央配置レイアウトの例

``` html
<!DOCTYPE html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://shogi-player.netlify.app/dist/shogi-player-wc.min.js"></script>
  <style>
    .container {
      display: flex;
      justify-content: center;
    }
    .shogi-player-wc-container {
      width: min(640px, 100%);
    }
    shogi-player-wc {
      display: block;
      width: 100%;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="shogi-player-wc-container">
      <shogi-player-wc />
    </div>
  </div>
</body>
</html>
```

<!-- ../.vuepress/public/examples/layout.html -->
<a href="/examples/layout.html" target="_blank">上のサンプルを単体で開く</a>

何が正解なのかわからないがとりあえず `shogi-player-wc` は横100%とする。そしてもう触らない。で、外側で大きさを調整する。さらにその外側で中央に配置する。これが良さそう。

::: tip
shogi-player-wc の初期値は次のようになっていて `display` が **`inline`** のためサイズが効かない

  * `display: inline`
  * `width: auto`
  * `height: auto`

サイズを効かせるためには `inline` から `block` や `inline-block` に変更する必要がある
:::

## APIの呼び方

``` js
document.querySelector("shogi-player-wc")
  .shadowRoot
  .querySelector(".ShogiPlayer")
  .__vue__
  .api_random_puton()
```

<!-- ../.vuepress/public/examples/api.html -->
<a href="/examples/api.html" target="_blank">上のサンプルを単体で開く</a>

## トラブルシューティング

### 正常な棋譜が読み込めない

`<head>` 内に `<meta charset="UTF-8">` を追加する

### スマホでタップの反応が遅い

`<head>` 内に `<meta name="viewport" content="width=device-width, initial-scale=1.0">` を追加する

### スマホで操作中に画面がズームしてしまう

`<head>` 内に `<meta name="viewport" content="width=device-width, initial-scale=1.0">` を追加する

### アイコンが文字化けする

`<head>` 内に `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css">` を追加する
