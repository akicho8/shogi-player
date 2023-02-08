# 表示カスタマイズ

## 紙面風の例

<div class="d3685e5688df383de2d96a936c6dc2ba">
<iframe src="/examples/book.html" frameborder="0" width="100%" height="600" />
<!-- ../.vuepress/public/examples/book.html -->
</div>
<a href="/examples/book.html" target="_blank">上のサンプルを単体で開く</a>

<style lang="stylus">
.d3685e5688df383de2d96a936c6dc2ba
  display: flex
  justify-content: center
  align-items: center
  iframe
    // border: 1px solid blue
</style>

::: tip
* sp_digit_label_variant の値で右側の座標を「漢字」「数字」「アルファベット」に変更できる
* 線の太さに関する sp_grid_inner_stroke と sp_grid_outer_stroke は設定値によってかなり印象が変わるためお好みで調整しよう
* さらにカスタマイズしたい場合はスタイルエディタを使おう
:::
