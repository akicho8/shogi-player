# 組み込み方法

## 静的サイト, WordPress, Next.js 向け

  * 既存のサイトに追加するには Web Components 版をどうぞ → [導入手順](/web-components/#導入手順/)
  * Next.js と共生している例 → [将棋MAP](https://shogimap.com/ph13PcP0tga53rWhH7BD)
  * カスタマイズした Web Components を作る場合は <https://github.com/akicho8/shogi-player/tree/master/web_component/src/components/ShogiPlayerWcRoot.vue> を参考にしてください (玄人向け)

## Vue.js 2 向け

  * 手順を半自動化したスクリプト <https://github.com/akicho8/shogi-player/blob/master/shogi-player-vue-cli-sample-create.sh> を参考にしてください
  * そのスクリプトをそのまま実行して生成したものを <https://github.com/akicho8/shogi-player/tree/master/shogi-player-vue-cli-sample> に置いています

## Nuxt.js 向け

  * 手動で組み込んだ例を <https://github.com/akicho8/shogi-player/tree/master/shogi-player-nuxt-sample> に置いています

## 自力ビルド時のありがちなトラブル

* `node_modules/shogi-player` 以下を babel のビルド対象に含めること
  * これをやらないとビルドできない
    * JavaScript のクラス定数が解決できない
    * `??` 演算子が解釈されない
  * Vue 2 であれば vue.config.js の `transpileDependencies` に指定する
  * Nuxt であれば nuxt.config.js の `build.transpile` に含める
* process 定数がグローバルに存在させること
  * これをやらないと `process` を参照しているコードがビルドできない
* file-loader で wav をファイル化するときに `esModule: false` オプションをつけること
  * これをやらないと wav ファイルへのパスが文字列にならず、ビルドできない
  * 内部では wav を使っていないが shogi-player と合わせて wav ファイルを扱う場合問題になる
