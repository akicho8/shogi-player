# 操作モード

## 特徴

* 対戦用のモード
* スライダー等で変更した任意局面から手番側の操作が行える
* 一度指すとその手が最終手になる(分岐には対応していない)
* [sp_human_side](/reference/props/#sp-human-side) オプションで片側の操作のみに絞れる
* emit イベントに反応して、相手側の指し手を追加した棋譜で sp_body を更新すればCPUとの対戦のようなことができる
* 再生モードの棋譜とは独立している(再生モードの棋譜を上書きしない)

## Playground

<template>
<div class="play_mode_playground">
  <ShogiPlayerWcWrapper
    sp_mode="play"
    @ev_play_mode_move="ev_play_mode_move"
    sp_controller
    />
  <ul>
    <li v-for="e in list">{{e}}</li>
  </ul>
</div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    }
  },
  methods: {
    ev_play_mode_move(e) {
      this.list.length = e.detail[0].turn - 1
      this.list.push(e.detail[0].last_move_info.to_kif)
    },
  },
}
</script>

<style lang="styl">
.play_mode_playground
  ul
    list-style-type: none
    font-size: 0.75rem
    display: flex
    flex-wrap: wrap
    gap: 0.5rem
</style>
