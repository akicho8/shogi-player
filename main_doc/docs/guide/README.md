[![npm version](https://badge.fury.io/js/shogi-player.svg)](https://badge.fury.io/js/shogi-player)

# Introduction

### 特徴

ブラウザ用の将棋盤コンポーネントで3つのモードがある

* **再生**: 与えた棋譜の指定の局面を表示する
* **操作**: 手番側の駒を操作して指し手を含む SFEN を生成する
* **編集**: 自由に局面を動かしてその局面の SFEN を生成する

### UI

* **レイアウト**: 駒台の配置を上下か左右か選択可
* **レスポンシブ対応**: 親要素の横幅に応じて盤の比率を維持したまま拡縮する
* **モバイル対応**: 駒台が左右配置であっても自動的に上下に配置して狭い画面を活用する
* **カスタマイズ**: 見た目の微調整は用意したCSS変数で変更可

### その他

* **フレームワーク**: [Vue.js 2](https://jp.vuejs.org/), [Buefy](https://buefy.org/), [Bulma](https://bulma.io/)
* **Web Components**: 対応
* **入力フォーマット**: KIF, BOD, SFEN
* **出力フォーマット**: SFEN
* **駒落ち棋譜再生**: 対応