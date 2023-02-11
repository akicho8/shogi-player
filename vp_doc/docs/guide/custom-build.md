# 組み込み方法

## Vue.js 以外

React.js (Next.js) や WordPress は [Web Components 版](/guide/usage/) をどうぞ

## Vue.js 2

手順を半自動化したスクリプト [shogi-player-vue-cli-sample-create.sh](https://github.com/akicho8/shogi-player/blob/master/shogi-player-vue-cli-sample-create.sh) をそのまま実行して生成したものを [shogi-player-vue-cli-sample](https://github.com/akicho8/shogi-player/tree/master/shogi-player-vue-cli-sample) に置いています
もともと Vue.js 2 製なので Vue.js 2 とは親和性が高いです
ただし[Bulma](https://bulma.io/)が他のCSSフレームワークと干渉する恐れがあります

## Nuxt.js

手動で組み込んだ例を [shogi-player-nuxt-sample](https://github.com/akicho8/shogi-player/tree/master/shogi-player-nuxt-sample) に置いています

## 自力ビルドの要点

* `node_modules/shogi-player` 以下を babel のビルド対象に含めること
  * これをやらないとビルドできない
    * クラス定数や `??` 演算子が解釈されない
  * @vue/cli であれば vue.config.js の `transpileDependencies` に指定する
  * Nuxt.js であれば nuxt.config.js の `build.transpile` に含める
* process 定数がグローバルに存在させること
  * これをやらないと `process` を参照しているコードがビルドできない
* wav ファイルを使うときは file-loader で `esModule: false` オプションをつけること
  * これをやらないと wav ファイルへのパスが文字列にならず、ビルドできない
  * 内部では wav ファイルを使っていないがイベントに合わせて音を出したいときにはまる
