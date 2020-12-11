<template lang="pug">
.MainDocEditDesc2.column
  b-message(:closable="false" type="is-success" title="view_mode からのモード切り替えと復帰について")
    .content
      ul
        //- li 右の<b-icon icon="dots-vertical" size="is-small"></b-icon>をクリックするとモードを切り替えることができます
        li view_mode の途中で play_mode に切り替えると手番側の駒を動かせるようになります。主に検討したいときに使います
        li play_mode に入るとき SFEN の場合はそのまま view_mode での棋譜を保持した状態で始まります。(スライダーで最初の局面に戻せます)
        li 一方 KIF の場合は都合上<b>現在の局面から</b>の開始になります。(つまりスライダーで最初の局面に戻せません)
        li (SFENと同様になるようにしようかと思いましたが、「操作」モードにに入ったところを基点(0手目)とするのでわかりやすいというメリットがあることに気づいた
        li 再び view_mode に戻ったときは他のモードに切り替える前の状態に復帰します (継盤機能)
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
