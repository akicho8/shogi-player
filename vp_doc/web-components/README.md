---
sidebar: auto
---

# Web Components

## 動作サンプル

<!-- <shogi-player-wc sp_controller="is_controller_on" /> -->

```html
<!DOCTYPE html>
<head>
  <meta charset="utf-8">
  <title>shogi-player-wc demo</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css">
  <script src="https://shogi-player.netlify.app/dist/shogi-player-wc.min.js"></script>
  <style type="text/css">
    .shogi-player-wc-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .shogi-player-wc-container shogi-player-wc {
      width: 50vmin;
      border: 1px dashed blue;
    }
    shogi-player-wc::part(sp_css_variables) {
      --sp_board_color: hsla(180, 30%, 30%, 0.5);
    }
  </style>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const spwc = document.querySelector("shogi-player-wc");
      spwc.addEventListener("update:sp_turn", e => console.log(e.detail[0]))
    })
  </script>
</head>
<body>
  <div class="shogi-player-wc-container">
    <shogi-player-wc
      sp_css_variables="{'--sp_controller_width':1.0}"
      sp_layout="is_horizontal"
      sp_controller="is_controller_on"
      sp_slider="is_slider_on"
      sp_body="position sfen lnsgkgsnl/1r7/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1 moves 7a6b 7g7f 5c5d 2g2f"
      />
  </div>
</body>
</html>
```

## 引数に v-bind は使えないがなんとかなる ##

```html
<ShogiPlayer :sp_turn="5" />
```

```html
<shogi-player-wc sp_turn="5" />
```

## スタイルを外部CSSで変更するには？ ##

<!-- <shogi-player-wc sp_controller="is_controller_on" /> -->

```css
shogi-player-wc::part(sp_css_variables) {
  --sp_board_color: hsl(38, 30%, 30%);
}
```

<SpContainer class="b441958504b7c7af3ef62a47fafe8d21 is-small" />
<style lang="stylus">
.SpContainer.b441958504b7c7af3ef62a47fafe8d21
  shogi-player-wc::part(sp_css_variables)
    --sp_board_color: hsl(180, 80%, 30%)
</style>