# Introduction

[![npm version](https://badge.fury.io/js/shogi-player.svg)](https://badge.fury.io/js/shogi-player)

### 特徴

WEBブラウザ用の将棋盤コンポーネントで3つのモードがある

* [再生](/guide/view-mode.md): 与えた棋譜の指定の局面を表示する
* [操作](/guide/play-mode.md): 手番側の駒を操作して指し手を含む SFEN を生成する
* [編集](/guide/edit-mode.md): 自由に局面を動かしてその局面の SFEN を生成する

### UI

* [レイアウト](/reference/props/#sp-layout): 駒台の配置を上下か左右か選択可
* **レスポンシブ対応**: 親要素の横幅に応じて盤の比率を維持したまま拡縮する
* [モバイル対応](/reference/props/#sp-mobile-vertical): 駒台が左右配置であっても自動的に上下に配置して狭い画面を活用する
<!-- * **カスタマイズ**: 見た目の微調整は用意したCSS変数で変更可 -->

### その他

* **フレームワーク**: [Vue.js 2](https://jp.vuejs.org/), [Buefy](https://buefy.org/), [Bulma](https://bulma.io/)
* **入力フォーマット**: KIF, BOD, SFEN (出力: SFEN)
* **Web Components**: 対応
