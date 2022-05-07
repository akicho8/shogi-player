<template lang="pug">
.MainDocPlayDesc.column
  b-message.has-text-left(type="is-success" title="操作モードについて" :closable="false")
    .content
      ul
        li スライダー等で変更した任意局面から手番側の操作が行える
        li 一度指すとその手が最終手になる(分岐には対応していない)
        li sp_human_side オプションで片側の操作のみに絞れる
        li emitイベントに反応して、相手側の指し手を追加した棋譜で sp_body を更新すればCPUとの対戦のようなことができる
        li 再生モードの棋譜とは独立しています(再生モードの棋譜を上書きしない)
        li 指し手を決定したときスライダーがあればスライダーにフォーカスにするのですぐに「←」キーで手を戻せる
</template>

<script>
export default {
  name: "MainDocPlayDesc",
  data() {
    return {
    }
  },
}
</script>

<style lang="sass">
// @import "./support.sass"
// .MainDocPlayDesc
</style>
