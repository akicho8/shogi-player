<template lang="pug">
MainDocMainNavbar
  template(slot="brand")
    b-navbar-item(tag="nuxt-link" :to="{name: 'index'}")
      b
        | ShogiPlayer
  template(slot="start")
    b-navbar-item(tag="a" href="#summary") 概要
    b-navbar-item(tag="a" href="#examples") デモ
    b-navbar-item(tag="a" href="#style") スタイル
    b-navbar-item(tag="nuxt-link" :to="{name: 'how-to-embed'}") 組み込み方法
    b-navbar-item(tag="nuxt-link" :to="{name: 'style-editor'}") スタイルエディタ
    b-navbar-dropdown(hoverable arrowless)
      b-icon(icon="dots-vertical" slot="label")
      b-navbar-item(tag="nuxt-link" :to="{name: 'component-options'}") コンポーネント引数一覧
      b-navbar-item(tag="nuxt-link" :to="{name: 'css-variables'}") CSS変数一覧
      b-navbar-item(tag="nuxt-link" :to="{name: 'event-observe'}") イベント
      b-navbar-item(tag="nuxt-link" :to="{name: 'api'}") API
      b-navbar-item(tag="nuxt-link" :to="{name: 'responsive-with-bulma'}") レスポンシブ
      b-navbar-item(tag="nuxt-link" :to="{name: 'credit'}") クレジット
  template(slot="end")
    b-navbar-dropdown(label="実験" hoverable v-if="development_p")
      b-navbar-item(tag="nuxt-link" :to="{name: 'test-sp_device'}") sp_device テスト
      b-navbar-item(tag="nuxt-link" :to="{name: 'test-perf1'}") 高速化
      b-navbar-item(tag="nuxt-link" :to="{name: 'test-test_bod_parse'}") BOD読み込み
      b-navbar-item(tag="nuxt-link" :to="{name: 'test-test_foul'}") 反則判定
      b-navbar-item(tag="nuxt-link" :to="{name: 'test-test_sound_timing'}") 音タイミング
      b-navbar-item(tag="nuxt-link" :to="{name: 'test-test_simple_paper_style'}") シンプルな紙スタイル
</template>

<script>
export default {
  name: "MainDocHero",
  data() {
    return {
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocHero
  .hero-foot
    li
      background-color: change_color($black, $alpha: 0.1)
    li:not(:first-child)
      margin-left: 0.25rem
</style>
