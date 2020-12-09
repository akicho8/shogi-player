<template lang="pug">
.MainDocumentSousa.column
  b-message(type="is-success" title="共通する操作方法" :closable="false")
    .content
      ul
        li 盤面の左右をクリックすると前後の手番に進みます
        li シフトを押しながらで10倍速になります
        li シフト以外のシステムキーだと50倍速になります(シフトキーも押していると500倍速)
        li 天王山(５五の地点)をクリックすると反転します
        li 「N手目」の部分をクリックで編集できます
        li スライダーがある場合は優先的にフォーカスします
        li スライダーにフォーカスがある状態だと左右キーが効きます(ブラウザの標準機能)
        li スライダーは fn + ←→ キーで最初と最後に移動します(ブラウザの標準機能)
</template>

<script>
export default {
  name: "MainDocumentSousa",
  data() {
    return {
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocumentSousa
</style>
