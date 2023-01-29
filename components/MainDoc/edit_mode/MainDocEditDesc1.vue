<template lang="pug">
.MainDocEditDesc1.column
  b-message(:closable="false" type="is-success" title="編集モードの操作方法")
    .content
      ul
        li ダブルクリック or 右クリック or 修飾キーを押しながら左クリックで、盤上の駒の反転と向きを変更する(ショートカットキー: v, r, Space)
        li 修飾キーは shift, option, meta, control キーのいずれかを表わす
        li 駒を持った状態で右クリックすると駒を元に戻す (ショートカットキー: Escape, q)
        li 駒台または駒箱をクリックしたことにするショートカットキーがある(▲駒台:b △駒台:w 駒箱:Backspace または t)
        li その際に、修飾キーを押していると<b>まとめて移動</b>する
        li たとえば△の駒台の歩をクリックしてから shift + w すると△の駒台の歩がすべて▲の駒台に移動する
        li 駒を持っていない状態で、盤上の駒にカーソルを合わせて w, b, Backspace, t したときは<b>自動的に持ち上げて</b>からそのキーをタイプしたことになる
        li マウス操作とキーボード操作を組み合わせて、持ち上げる動作を省略することで高速に駒を移動できる
        li 駒を持っていない状態で盤上の駒にカーソルを合わせて q をタイプすると同じ陣営の駒台から同種の駒を取り出したことになる (factorioのピペットツールのように動作する)
        li これは歩を一気に並べるときに使える
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
@import "../support.sass"
.MainDocEditDesc1
</style>
