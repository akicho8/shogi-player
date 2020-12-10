<template lang="pug">
.MainDocEditDesc1.column
  b-message(:closable="false" type="is-success" title="操作方法")
    .content
      ul
        li ダブルタップまたは右クリックで盤上の駒の反転と向きを変更できます(ショートカットキー: v, r, Space)
        li 修飾キー(shift, option, meta, control キーのいずれか)を押しながら「左クリック」でも変更できます
        li 駒を持った状態で右クリックすると駒を元に戻せます (ショートカットキー: Escape, q)
        li 駒台と駒箱をクリックしたことにするショートカットキーがあります(b:先手の駒台 w:後手の駒台 Backspace または t で駒箱)
        li その際に、修飾キーを押しているとまとめて移動します
        li たとえば先手の駒箱の歩をクリックしてから shift + w で先手の駒台の歩がすべて後手の駒台に移動します
        li 駒を持っていない状態で、盤上の駒にカーソルを合わせて w, b, Backspace, t したときは自動的に持ち上げてからそのキーをタイプしたことになります(持ち上げる手間が省略できる)
        li 駒を持っていない状態で盤上の駒にカーソルを合わせて q をタイプすると駒台から同種の駒を取り出したことになります (factorioのピペットツールのように動作します)
</template>

<script>
export default {
  name: "MainDocEditDesc1",
  data() {
    return {
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocEditDesc1
</style>
