<template lang="pug">
MainDocMainNavbar
  template(slot="brand")
    b-navbar-item(tag="nuxt-link" :to="{name: 'index'}")
      b
        | ShogiPlayer
  template(slot="start")
    b-navbar-item(tag="a" href="https://shogi-player.netlify.app/" target="_blank") Document
    b-navbar-item(tag="a" href="#examples" v-scroll-to="{element: '#examples'}") デモ
    b-navbar-item(tag="nuxt-link" :to="{name: 'style-editor'}") スタイルエディタ
    //- b-navbar-dropdown(hoverable arrowless v-if="development_p")
    //-   b-icon(icon="dots-vertical" slot="label")
    //-   b-navbar-item(tag="nuxt-link" :to="{name: 'responsive-with-bulma'}") レスポンシブ
  template(slot="end")
    b-navbar-item(tag="a" href="https://github.com/akicho8/shogi-player" target="_blank") GitHub
    b-navbar-dropdown(label="実験" hoverable v-if="development_p")
      b-navbar-item(tag="nuxt-link" :to="{name: 'test-sp_device'}") sp_device テスト
      b-navbar-item(tag="nuxt-link" :to="{name: 'test-perf1'}") 高速化
      b-navbar-item(tag="nuxt-link" :to="{name: 'test-test_bod_parse'}") BOD読み込み
      b-navbar-item(tag="nuxt-link" :to="{name: 'test-test_foul'}") 反則判定
      b-navbar-item(tag="nuxt-link" :to="{name: 'test-test_sound_timing'}") 音タイミング
</template>

<script>
export default {
  name: "MainDocHero",
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
