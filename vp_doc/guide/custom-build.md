# 組み込み方法

## 静的サイト

  * [Web Components 版](/web-components/) をどうぞ
  * WordPress や React.js, Next.js もこちらをどうぞ

### a

### b


## Vue.js 2

  * 手順を半自動化したスクリプト <https://github.com/akicho8/shogi-player/blob/master/shogi-player-vue-cli-sample-create.sh> を参考にしてください
  * そのスクリプトをそのまま実行して生成したものを <https://github.com/akicho8/shogi-player/tree/master/shogi-player-vue-cli-sample> に置いています

## Nuxt.js

  * 手動で組み込んだ例を <https://github.com/akicho8/shogi-player/tree/master/shogi-player-nuxt-sample> に置いています

## 自力ビルド時の要点

* `node_modules/shogi-player` 以下を babel のビルド対象に含めること
  * これをやらないとビルドできない
    * JavaScript のクラス定数が解決できない
    * `??` 演算子が解釈されない
  * @vue/cli であれば vue.config.js の `transpileDependencies` に指定する
  * Nuxt であれば nuxt.config.js の `build.transpile` に含める
* process 定数がグローバルに存在させること
  * これをやらないと `process` を参照しているコードがビルドできない
* wav ファイルを使うときは file-loader で `esModule: false` オプションをつけること
  * これをやらないと wav ファイルへのパスが文字列にならず、ビルドできない
  * 内部では wav ファイルを使っていないがイベントに合わせて音を出したいときにはまる
