# 組み込み方法

## 静的HTML or WordPress

[Web Components 版](/guide/usage/) をどうぞ

## React 18 + Web Components 版

<<< @/docs/.vuepress/public/examples/import_to_react18.html
<LinkToExample name="import_to_react18" />

## Vue.js 2 + Web Components 版

<<< @/docs/.vuepress/public/examples/build_with_vue2.html{9}
<LinkToExample name="build_with_vue2" />

Web Components のタグを除外するのがポイントです

## Vue 3 + Web Components 版

<<< @/docs/.vuepress/public/examples/build_with_vue3.html{11}
<LinkToExample name="build_with_vue3" />

Web Components のタグを除外するのがポイントですがなぜか動きません <Badge text="お手上げ" type="error" vertical="top" />

## Vue.js 2 + ShogiPlayer.vue

手順を半自動化したスクリプト [shogi-player-vue-cli-sample-create.sh](https://github.com/akicho8/shogi-player/blob/master/shogi-player-vue-cli-sample-create.sh) をそのまま実行して生成したものを [shogi-player-vue-cli-sample](https://github.com/akicho8/shogi-player/tree/master/shogi-player-vue-cli-sample) に置いています
もともと Vue.js 2 製なので Vue.js 2 とは親和性が高いです
ただし[Bulma](https://bulma.io/)が他のCSSフレームワークと干渉する恐れがあります

## Nuxt.js + ShogiPlayer.vue

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
