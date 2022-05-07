<template lang="pug">
.MainDocViewDesc.column
  b-message(:closable="false" type="is-success" title="共通する操作方法")
    .content
      ul
        li sp_overlay_nav オプションが "is_overlay_nav_on" のときは、盤面の左右クリックで前後の手番に進み、天王山(5五の地点)をクリックすると反転する
        li シフトを押しながらで10倍速になる
        li シフト以外のシステムキーだと50倍速になる(シフトキーも押していると500倍速)
        li 「N手目」の部分をクリックで編集できる
        li スライダーがある場合は優先的にフォーカスする
        li スライダーにフォーカスがある状態だと左右キーが効く(ブラウザの標準機能)
        li スライダーは fn + ←→ キーで最初と最後に移動する(ブラウザの標準機能)
</template>

<script>
export default {
  name: "MainDocViewDesc",
  data() {
    return {
    }
  },
}
</script>

<style lang="sass">
// @import "./support.sass"
// .MainDocViewDesc
</style>
