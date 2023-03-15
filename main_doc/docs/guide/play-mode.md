# 操作モード

## 特徴

* 対戦用のモード
* 手番側の操作を行う
* 一度指すとその手が最終手になる
* 再生モードの棋譜とは独立している (再生モードの棋譜を上書きしない)

## 関連オプション

* [sp_human_side](/reference/props/#sp-human-side): 片側の操作に絞る

## 関連イベント

* [ev_play_mode_move](/reference/event/#ev-play-mode-move-hash-object): 指し手を受けとる

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
