# 操作モード

## 特徴

* 対戦用のモード
* 手番側の操作を行う
* 一度指すとその手が最終手になる
* 再生モードの棋譜とは独立している (再生モードの棋譜を上書きしない)

## 関連オプション

* [sp_body](/reference/props/#sp-body): AIと対戦すると仮定したときAIの指し手を反映する
* [sp_human_side](/reference/props/#sp-human-side): 片側の操作に絞る

## 関連イベント

* [ev_play_mode_move](/reference/event/#ev-play-mode-move-hash-object): 人間の指し手を受けとる

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

## AIと対戦する

### デモ

<CustomizeExample name="human_vs_ai" :width="250" :height="370" />

* AI は角交換を望んでいる
* 先手(人間)は角道を開けて自分から角交換すること
* それ以外の手を指すと AI は投了する

### 手順

1. 操作モードにする
1. 人間が指す
1. と同時に [ev_play_mode_move](/reference/event/#ev-play-mode-move-hash-object) で指し手を含む棋譜を受け取る
1. その棋譜を AI に渡す
1. AI は受け取った棋譜を見て考え、応手を含む新しい棋譜を返す
1. その棋譜を [sp_body](/reference/props/#sp-body) に指定する
   このとき人間にはAIが駒を1つ動かしただけのように見える
1. 2 に戻る

* ここでいう「棋譜」は「moves 付きの SFEN」を意味する
* 指し手を反映させる方法として「A座標の駒をB座標に動かす」のような処理のイメージをしてしまうかもしれないがそういうAPIがあるわけではない
* 指し手の反映は棋譜を [sp_body](/reference/props/#sp-body) に指定するのみ

### コードの要点

```html
<shogi-player-wc
  sp_mode="play"
  sp_body="${this.ai_sfen}"
  @ev_play_mode_move="${this.ev_play_mode_move}"
></shogi-player-wc>
```

```javascript
ev_play_mode_move(e) {
  this.human_sfen = e.detail[0].sfen                // 人間の指し手を受け取って
  const sfen = this.ai_best_move(this.human_sfen)   // AIに渡すと応手が返ってくるので
  this.ai_sfen = sfen                               // 局面に反映する
}

// ☗76歩には☖34歩とし☗22角成に同銀とするだけのAI
ai_best_move(sfen) {
  if (sfen === "position sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1 moves 7g7f") {
    return "position sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1 moves 7g7f 3c3d"
  }
  if (sfen === "position sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1 moves 7g7f 3c3d 8h2b+") {
    return "position sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1 moves 7g7f 3c3d 8h2b+ 3a2b"
  }
}
```
