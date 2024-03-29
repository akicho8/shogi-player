# 各種組み込み例

## Vanilla JS

<<< @/docs/.vuepress/public/examples/build/case_wc_html.html
<LinkToExample name="build/case_wc_html" />

Also see: [使い方](/guide/usage/)

## Ruby

<<< @/docs/.vuepress/public/examples/build/case_wc_ruby.html
<LinkToExample name="build/case_wc_ruby" />

## React

<<< @/docs/.vuepress/public/examples/build/case_wc_react.html
<LinkToExample name="build/case_wc_react" />

## Solid.js

<<< @/docs/.vuepress/public/examples/build/case_wc_solid.html
<LinkToExample name="build/case_wc_solid" />

## Web Components

### Basic
<<< @/docs/.vuepress/public/examples/build/case_wc_wc_basic.html
<LinkToExample name="build/case_wc_wc_basic" />

### Full Component
<<< @/docs/.vuepress/public/examples/build/case_wc_wc_full.html
<LinkToExample name="build/case_wc_wc_full" />

## Lit

### Basic
<<< @/docs/.vuepress/public/examples/build/case_wc_lit_basic.html
<LinkToExample name="build/case_wc_lit_basic" />

### Full Component
<<< @/docs/.vuepress/public/examples/build/case_wc_lit_full.html
<LinkToExample name="build/case_wc_lit_full" />

## Vue.js 2

<<< @/docs/.vuepress/public/examples/build/case_wc_vue2.html
<LinkToExample name="build/case_wc_vue2" />

## Vue.js 2 + UMD

<<< @/docs/.vuepress/public/examples/build/case_umd_vue2.html
<LinkToExample name="build/case_umd_vue2" />

## Vue 3

<<< @/docs/.vuepress/public/examples/build/case_wc_vue3.html
<LinkToExample name="build/case_wc_vue3" />

::: warning 引数が渡せない問題と回避方法
* Vue.js 2 で作成した Web Components を Vue 3 と組み合わせたときに限り snake_case なパラメータ名を持つ値が渡せない問題がある
  * 簡単に言えば `_` を含むパラメータが無視される
* そこでその嫌がらせのような制約を回避するために仕方なく `sp-pass-props` を用意した
* これは `v-bind` に似ているが Vue はただの文字列として解釈するため確実に内容を渡すことができる
* `sp-pass-props` の内容は JSON5 形式の文字列としてパースする
* 型変換は JSON5 のパーサーに任せているので Boolean 型の真は `"true"` ではなく `true` と書く
* 最終的に `sp-pass-props` の内容は `$props` 相当として扱う
:::

## Vue.js 2 (vue/cli) + UMD

* 手動で組み込んだ例を [shogi-player-vue2-sample-umd](https://github.com/akicho8/shogi-player/tree/master/shogi-player-vue2-sample-umd) に置いている
* すでにビルドしているため `vue.config.js` に何も書かなくても動く
* CSSも js に含んでいるため読み込む必要がない

## Vue.js 2 (vue/cli) + ShogiPlayer.vue

* 手動で組み込んだ例を [shogi-player-vue2-sample](https://github.com/akicho8/shogi-player/tree/master/shogi-player-vue2-sample) に置いている
* もともと Vue.js 2 製なので Vue.js 2 とは親和性が高い
* ただし[Bulma](https://bulma.io/)が他のCSSフレームワークと干渉する恐れがある

## Nuxt.js + ShogiPlayer.vue

手動で組み込んだ例を [shogi-player-nuxt-sample](https://github.com/akicho8/shogi-player/tree/master/shogi-player-nuxt-sample) に置いている

## Svelte

手動で組み込んだ例を [shogi-player-svelte-sample](https://github.com/akicho8/shogi-player/tree/master/shogi-player-svelte-sample) に置いている

そこから該当箇所の抜粋:

```html
<script>
  function ev_play_mode_move(e) {
    alert(e.detail[0].last_move_info.to_kif)
  }
</script>

<main>
  <shogi-player-wc
    sp-pass-props={'{sp_mode: "play", sp_body: "position startpos moves 7g7f 3c3d 8h2b+ 3a2b", sp_controller: true, sp_pass_style: {\"--sp_controller_width\": 1.0}}'}
    on:ev_play_mode_move={ev_play_mode_move}
    ></shogi-player-wc>
</main>
```

* [Vue 3](/guide/build.md#vue-3) の場合と同じパラメータを渡す例が上になる
* パラメータの渡し方が Vue 3 よりも難しい
* `sp-pass-props` は途中で改行すると動かなくなる

## 自力ビルドの要点

* transpile 問題
  * `node_modules/shogi-player` 以下を babel のビルド対象に含める
  * これをやらないとビルドできない
    * クラス定数や `??` 演算子が解釈されない
  * @vue/cli であれば vue.config.js の `transpileDependencies` に指定する
  * Nuxt.js であれば nuxt.config.js の `build.transpile` に含める
* webpack-dev-server で `ResizeObserver loop limit exceeded` が出る場合
  * `devServer.client.overlay.runtimeErrors` を `false` にする
* jest
  * Babel の設定は `.babelrc` ではなく `babel.config.js` に書く
  * そうしないと node_modules/* に適用されず jest が動かない
