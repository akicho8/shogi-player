<template lang="pug">
.MainDocEditDesc2.column
  b-message(:closable="false" type="is-success" title="再生モードからのモード切り替えについて")
    .content
      ul
        li 右の<b-icon icon="dots-vertical" size="is-small"></b-icon>をクリックするとモードを切り替えることができます
        li 棋譜再生モードの途中で「操作」に切り替えると手番側の駒を動かせるようになります。主に検討したいときに使います
        li 「操作」モードに入るとき SFEN (USI) の場合はそのまま再生モードでの棋譜を保持した状態で始まります。(スライダーで最初の局面に戻せます)
        li 一方 KIF の場合は都合上<b>現在の局面から</b>の開始になります。(つまりスライダーで最初の局面に戻せません)
        li (SFENと同様になるようにしようかと思いましたが、「操作」モードにに入ったところを基点(0手目)とするのでわかりやすいというメリットがあることに気づきました)
        li 手番に関わらず、ただ自由に駒を動かしたいときは「編集」モードになります
        li 棋譜再生モードの途中で「操作」に切り替えると手番側の駒を動かせるようになります
        li 再生モードから他のモードに切り替えてから再生モードに戻ったとき、他のモードに切り替える前の状態に復帰します (つまり継盤のような形になります)
</template>

<script>
export default {
  name: "MainDocEditDesc2",
  data() {
    return {
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocEditDesc2
</style>
