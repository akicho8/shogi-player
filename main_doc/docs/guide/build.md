# 各種組み込み例

## Vanilla + Web Components

<<< @/docs/.vuepress/public/examples/build/case_wc_html.html
<LinkToExample name="build/case_wc_html" />

Also see: [使い方](/guide/usage/)

## React + Web Components

<<< @/docs/.vuepress/public/examples/build/case_wc_react.html
<LinkToExample name="build/case_wc_react" />

## Solid.js + Web Components

<<< @/docs/.vuepress/public/examples/build/case_wc_solid.html
<LinkToExample name="build/case_wc_solid" />

## Web Components + Web Components

### Basic
<<< @/docs/.vuepress/public/examples/build/case_wc_wc_basic.html
<LinkToExample name="build/case_wc_wc_basic" />

### Full Component
<<< @/docs/.vuepress/public/examples/build/case_wc_wc_full.html
<LinkToExample name="build/case_wc_wc_full" />

## Lit + Web Components

### Basic
<<< @/docs/.vuepress/public/examples/build/case_wc_lit_basic.html
<LinkToExample name="build/case_wc_lit_basic" />

### Full Component
<<< @/docs/.vuepress/public/examples/build/case_wc_lit_full.html
<LinkToExample name="build/case_wc_lit_full" />

## Vue.js 2 + Web Components

<<< @/docs/.vuepress/public/examples/build/case_wc_vue2.html
<LinkToExample name="build/case_wc_vue2" />

## Vue.js 2 + UMD

<<< @/docs/.vuepress/public/examples/build/case_umd_vue2.html
<LinkToExample name="build/case_umd_vue2" />

## Vue 3 + Web Components

<<< @/docs/.vuepress/public/examples/build/case_wc_vue3.html
<LinkToExample name="build/case_wc_vue3" />

::: warning 引数が渡せない問題と回避方法
* Vue.js 2 で作成した Web Components を Vue 3 と組み合わせたときに限り snake_case なパラメータ名を持つ値が渡せない問題がある
  * 簡単に言えば `_` を含むパラメータが無視される
* そこでその嫌がらせのような制約を回避するために仕方なく `sp-pass-props` 引数を用意した
* これは `v-bind` に似ているが Vue にはただの文字列として認識されるため確実に内容を渡すことができる
* `sp-pass-props` の内容は JSON5 形式の文字列としてパースする
* 型変換は JSON5 のパーサーに任せているので Boolean 型の真は `"true"` ではなく `true` と書く
* `sp-pass-props` の内容は最終的に `$props` 相当として内部で扱う
:::

## Vue.js 2 + ShogiPlayer.vue

手順を半自動化したスクリプト [shogi-player-vue-cli-sample-create.sh](https://github.com/akicho8/shogi-player/blob/master/shogi-player-vue-cli-sample-create.sh) をそのまま実行して生成したものを [shogi-player-vue-cli-sample](https://github.com/akicho8/shogi-player/tree/master/shogi-player-vue-cli-sample) に置いてある
もともと Vue.js 2 製なので Vue.js 2 とは親和性が高い
ただし、[Bulma](https://bulma.io/)が他のCSSフレームワークと干渉する恐れがある

## Nuxt.js + ShogiPlayer.vue

手動で組み込んだ例を [shogi-player-nuxt-sample](https://github.com/akicho8/shogi-player/tree/master/shogi-player-nuxt-sample) に置いている

## 自力ビルドの要点

* `node_modules/shogi-player` 以下を babel のビルド対象に含める
  * これをやらないとビルドできない
    * クラス定数や `??` 演算子が解釈されない
  * @vue/cli であれば vue.config.js の `transpileDependencies` に指定する
  * Nuxt.js であれば nuxt.config.js の `build.transpile` に含める
* process 定数がグローバルに存在させること
  * これをやらないと `process` を参照しているコードがビルドできない
* wav ファイルを使うときは file-loader で `esModule: false` オプションをつける
  * これをやらないと wav ファイルへのパスが文字列にならず、ビルドできない
  * 内部では wav ファイルを使っていないがイベントに合わせて音を出したいときにはまる
