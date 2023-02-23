# Test of demo-code

## 公式のサンプル

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

## HTML Only

::: demo
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.jsdelivr.net/npm/shogi-player@0.0.382/dist/shogi-player-wc.min.js"></script>
</head>
<body>
  <shogi-player-wc/>
</body>
</html>
:::

## HTML Only 2

::: demo
<head>
<script src="https://cdn.jsdelivr.net/npm/shogi-player@0.0.382/dist/shogi-player-wc.min.js"></script>
</head>
<shogi-player-wc/>
:::

